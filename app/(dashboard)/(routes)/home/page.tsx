"use server";

import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

import { CheckCircle, Clock, InfoIcon } from "lucide-react";

import { getDashboardCourses } from "@/actions/get-dashboard-courses";
import { CoursesList } from "@/components/courses-list";
import { CourseWithProgressWithCategory } from "@/actions/get-dashboard-courses";

import { InfoCard } from "./_components/info-card";
import { BannerCard } from "./_components/banner-card";

type CourseWithReviews = CourseWithProgressWithCategory & {
  reviews?: Array<{ rating: number }>;
};

export default async function Dashboard() {
  const supabase = createServerComponentClient({ cookies });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  const userId = session?.user.id;

  if (!userId) {
    return redirect("/login"); // или "/" — зависит от логики твоего сайта
  }

  const { completedCourses, coursesInProgress } = await getDashboardCourses(
    userId
  );

  const coursesWithRating = [...coursesInProgress, ...completedCourses].map(
    (course: CourseWithReviews) => ({
      ...course,
      averageRating: course.reviews?.length
        ? course.reviews.reduce(
            (acc: number, review: { rating: number }) => acc + review.rating,
            0
          ) / course.reviews.length
        : 0,
    })
  );

  return (
    <div className="p-6 space-y-4">
      <div className="grid grid-cols-1 gap-4">
        <BannerCard
          icon={InfoIcon}
          label="Бақылау тақтасына қош келдіңіз"
          description={`Бұл жерде сіз өзіңіздің жетістіктеріңізді көре аласыз 
          және курстарыңызды жалғастырыңыз. Бұл LMS демонстрациясы, сондықтан барлық курстар тегін және Stripe сынақ 
          режимінде. Курсқа жазылу үшін жолақ пішініне жалған деректерді енгізіңіз. Әкімші рұқсатын алу үшін хабарласыңыз.`}
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <InfoCard
          icon={Clock}
          label="Орындалуда"
          numberOfItems={coursesInProgress.length}
        />
        <InfoCard
          icon={CheckCircle}
          label="Аяқталды"
          numberOfItems={completedCourses.length}
          variant="success"
        />
      </div>
      <CoursesList items={coursesWithRating} />
    </div>
  );
}
