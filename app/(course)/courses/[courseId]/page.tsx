import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";

const CourseIdPage = async ({
  params,
  searchParams,
}: {
  params: { courseId: string };
  searchParams: { success?: string };
}) => {
  const { userId } = await auth();

  if (!userId) {
    return redirect("/");
  }

  // Обработка успешной оплаты через URL-параметр
  if (searchParams.success === "1") {
    const existingPurchase = await db.purchase.findUnique({
      where: {
        userId_courseId: {
          userId,
          courseId: params.courseId,
        },
      },
    });

    // Если записи о покупке нет, создаем ее
    if (!existingPurchase) {
      const courseDetails = await db.course.findUnique({
        where: {
          id: params.courseId,
        },
        select: {
          price: true,
        },
      });

      if (courseDetails) {
        const amount = courseDetails.price ? Number(courseDetails.price) : 0;
        await db.purchase.create({
          data: {
            userId,
            courseId: params.courseId,
            amount,
            currency: "KZT",
          },
        });
        console.log(
          "Purchase created on redirect for user:",
          userId,
          "course:",
          params.courseId
        );
      }
    }
  }

  const course = await db.course.findUnique({
    where: {
      id: params.courseId,
    },
    include: {
      chapters: {
        where: {
          isPublished: true,
        },
        orderBy: {
          position: "asc",
        },
      },
    },
  });

  if (!course) {
    return redirect("/"); // Если курс не найден, редиректим на главную
  }

  // Проверяем, есть ли хотя бы одна опубликованная глава
  const firstChapter = course.chapters[0];
  if (!firstChapter) {
    return redirect("/"); // Если нет глав, редиректим на главную
  }
  // Если курс и главы найдены, редиректим на первую главу
  return redirect(`/courses/${course.id}/chapters/${firstChapter.id}`);
};

export default CourseIdPage;
