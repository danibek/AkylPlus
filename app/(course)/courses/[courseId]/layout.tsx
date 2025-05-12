import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { getProgress } from "@/actions/get-progress";
import { CourseSidebar } from "./_components/course-sidebar";
import { CourseNavbar } from "./_components/course-navbar";
import getSafeProfile from "@/actions/get-safe-profile";

interface CourseLayoutProps {
  children: React.ReactNode;
  params: {
    courseId: string;
  };
}

const CourseLayout = async ({ children, params }: CourseLayoutProps) => {
  const { userId } = await auth();

  if (!userId) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>Жүйеге кіріңіз</p>
      </div>
    );
  }

  const safeProfile = await getSafeProfile();

  if (!safeProfile) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>Профиль жүктелуде...</p>
      </div>
    );
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
        include: {
          userProgress: {
            where: {
              userId,
            },
          },
        },
        orderBy: {
          position: "asc",
        },
      },
    },
  });

  if (!course) return redirect("/");

  const progress = await getProgress(userId, course.id);
  const progressCount = progress || 0;

  return (
    <div className="h-full">
      <div className="h-[80px] md:pl-80 fixed inset-y-0 w-full z-50">
        <CourseNavbar
          course={course}
          progressCount={progressCount}
          currentProfile={safeProfile}
        />
      </div>
      <div className="hidden md:flex h-full w-80 flex-col fixed inset-y-0 z-50">
        <CourseSidebar course={course} progressCount={progressCount} />
      </div>
      <main className="md:pl-80 pt-[80px] h-full">{children}</main>
    </div>
  );
};

export default CourseLayout;
