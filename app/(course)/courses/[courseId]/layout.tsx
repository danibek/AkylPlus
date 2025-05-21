import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { getProgress } from "@/actions/get-progress";
import { CourseSidebar } from "./_components/course-sidebar";
import { CourseNavbar } from "./_components/course-navbar";
import getSafeProfile from "@/actions/get-safe-profile";
import { CourseReviews } from "./_components/course-reviews";

interface CourseLayoutProps {
  children: React.ReactNode;
  params: {
    courseId: string;
  };
}

const CourseLayout = async ({ children, params }: CourseLayoutProps) => {
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
      reviews: {
        include: {
          user: {
            select: {
              name: true,
              imageUrl: true,
            },
          },
        },
        orderBy: {
          createdAt: "desc",
        },
      },
    },
  });

  if (!course) return redirect("/");

  const progress = await getProgress(userId, course.id);
  const progressCount = progress || 0;

  const purchase = await db.purchase.findUnique({
    where: {
      userId_courseId: {
        userId,
        courseId: course.id,
      },
    },
  });

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
      <main className="md:pl-80 pt-[80px] h-full">
        {children}
        <div className="max-w-5xl mx-auto px-4 pb-8">
          <CourseReviews
            courseId={course.id}
            reviews={course.reviews}
            hasPurchased={!!purchase}
            userId={safeProfile.id}
          />
        </div>
      </main>
    </div>
  );
};

export default CourseLayout;
