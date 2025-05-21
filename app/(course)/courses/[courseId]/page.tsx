import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";

const CourseIdPage = async ({
  params,
  searchParams,
}: {
  params: { courseId: string };
  searchParams: { success?: string };
}) => {
  const cookieStore = cookies();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
      },
    }
  );

  const {
    data: { session },
  } = await supabase.auth.getSession();
  const userId = session?.user?.id;

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
