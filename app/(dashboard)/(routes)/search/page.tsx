"use server";

import { redirect } from "next/navigation";
import { cookies } from "next/headers";

import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

import { db } from "@/lib/db";
import { SearchInput } from "@/components/search-input";
import { CoursesList } from "@/components/courses-list";
import { getProgress } from "@/actions/get-progress";
import { Categories } from "./_components/categories";

interface SearchPageProps {
  searchParams: {
    title: string;
    categoryId: string;
  };
}

const SearchPage = async ({ searchParams }: SearchPageProps) => {
  const supabase = createServerComponentClient({ cookies });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  const userId = session?.user.id;

  if (!userId) {
    return redirect("/login"); // перенаправление на login, если не авторизован
  }

  const courses = await db.course.findMany({
    where: {
      isPublished: true,
      title: {
        contains: searchParams.title,
      },
      ...(searchParams.categoryId && {
        categoryId: searchParams.categoryId,
      }),
    },
    include: {
      category: true,
      chapters: {
        where: {
          isPublished: true,
        },
      },
      purchases: {
        where: {
          userId,
        },
      },
      reviews: {
        select: {
          rating: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const categories = await db.category.findMany({
    orderBy: {
      name: "asc",
    },
  });

  const coursesWithProgress = await Promise.all(
    courses.map(async (course) => {
      const averageRating =
        course.reviews.length > 0
          ? course.reviews.reduce((acc, review) => acc + review.rating, 0) /
            course.reviews.length
          : 0;

      if (course.purchases?.length === 0) {
        return {
          ...course,
          progress: null,
          averageRating,
        };
      }

      const progressPercentage = await getProgress(userId, course.id);

      return {
        ...course,
        progress: progressPercentage,
        averageRating,
      };
    })
  );

  return (
    <>
      <div className="px-6 pt-6 md:hidden md:mb-0 block">
        <SearchInput />
      </div>
      <div className="p-6 space-y-4">
        <Categories items={categories} />
        <CoursesList items={coursesWithProgress} />
      </div>
    </>
  );
};

export default SearchPage;
