import { db } from "@/lib/db";
import { SafeProfile } from "@/types";
import { auth, currentUser } from "@clerk/nextjs/server";

export default async function getSafeProfile() {
  try {
    const { userId } = await auth();
    const user = await currentUser();

    if (!userId || !user) {
      return null;
    }

    let currentProfile = await db.profile.findFirst({
      where: {
        userId,
      },
      select: {
        id: true,
        userId: true,
        name: true,
        imageUrl: true,
        email: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!currentProfile) {
      currentProfile = await db.profile.create({
        data: {
          userId,
          name: user.firstName || user.username || "Пайдаланушы",
          email: user.emailAddresses[0]?.emailAddress || "",
          imageUrl: user.imageUrl,
          role: "USER",
        },
        select: {
          id: true,
          userId: true,
          name: true,
          imageUrl: true,
          email: true,
          role: true,
          createdAt: true,
          updatedAt: true,
        },
      });
    }

    const safeProfile: SafeProfile = {
      ...currentProfile,
      createdAt: currentProfile.createdAt.toISOString(),
      updatedAt: currentProfile.updatedAt.toISOString(),
    };

    return safeProfile;
  } catch (error) {
    console.error("[GET_SAFE_PROFILE]", error);
    return null;
  }
}
