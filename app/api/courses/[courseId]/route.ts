import Mux from "@mux/mux-node";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";

const mux = new Mux({
  tokenId: process.env.MUX_TOKEN_ID!,
  tokenSecret: process.env.MUX_TOKEN_SECRET!,
});

export async function PATCH(
  req: Request,
  { params }: { params: { courseId: string } }
) {
  try {
    const { userId } = await auth();
    const { courseId } = params;
    const values = await req.json();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const course = await db.course.update({
      where: {
        id: courseId,
        userId,
      },
      data: {
        ...values,
      },
    });

    return NextResponse.json(course);
  } catch (error) {
    console.log("[COURSE_PATCH]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { courseId: string } }
) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // Удаляем курс и связанные главы с видео
    const course = await db.course.delete({
      where: {
        id: params.courseId,
        userId,
      },
      include: {
        chapters: {
          include: {
            muxData: true,
          },
        },
      },
    });

    // Удаляем видео из Mux
    for (const chapter of course.chapters) {
      if (chapter.muxData?.assetId) {
        await mux.video.assets.delete(chapter.muxData.assetId).catch(() => {
          console.log("[MUX_DELETE_ERROR]");
        });
      }
    }

    return NextResponse.json(course);

  } catch (error) {
    console.error("[COURSE_DELETE]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}