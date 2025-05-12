import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { CheckCircle, Clock, InfoIcon } from "lucide-react";

import { getDashboardCourses } from "@/actions/get-dashboard-courses";
import { CoursesList } from "@/components/courses-list";

import { InfoCard } from "./_components/info-card";
import { BannerCard } from "./_components/banner-card";

export default async function Dashboard() {
  const { userId } = await auth();

  if (!userId) {
    return redirect("/");
  }

  const {
    completedCourses,
    coursesInProgress
  } = await getDashboardCourses(userId);

  return (
    <div className="p-6 space-y-4">
      <div className="grid grid-cols-1 gap-4">
        <BannerCard
          icon={InfoIcon}
          label="Бақылау тақтасына қош келдіңіз"
          description={`Бұл жерде сіз өзіңіздің жетістіктеріңізді көре аласыз 
          және курстарыңызды жалғастырыңыз. Бұл LMS демонстрациясы, сондықтан барлық курстар тегін және Stripe сынақта 
          режимі. Курсқа жазылу үшін жолақ пішініне жалған деректерді енгізіңіз. Маған хабарласыңыз 
          әкімші рұқсатын алу үшін folio.kendev.co`}
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
      <CoursesList
        items={[...coursesInProgress, ...completedCourses]}
      />
    </div>
  )
}
