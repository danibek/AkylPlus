import React from "react";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

import { db } from "@/lib/db";
import { MemberRoleForm } from "./_components/member-role-form";

interface ProfileIdPageProps {
  params: {
    id: string;
  };
}

// серверный компонент
const ProfileIdPage = async ({ params }: ProfileIdPageProps) => {
  const session = await auth();
  const currentUserId = session?.userId;

  if (!currentUserId) {
    redirect("/teacher/users/");
  }

  const profile = await db.profile.findUnique({
    where: {
      id: params.id,
    },
  });

  if (!profile) {
    redirect("/teacher/users/");
  }

  return (
    <div className="flex-1 p-6">
      <MemberRoleForm initialData={profile} id={profile.id} />
    </div>
  );
};

export default ProfileIdPage;
