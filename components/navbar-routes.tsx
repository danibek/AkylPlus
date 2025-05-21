"use client";

import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import Link from "next/link";
import { SearchInput } from "./search-input";
import { SafeProfile } from "@/types";
import { supabase } from "@/lib/supabase";

interface NavbarRoutesProps {
  currentProfile?: SafeProfile | null;
}

export const NavbarRoutes: React.FC<NavbarRoutesProps> = ({
  currentProfile,
}) => {
  const pathname = usePathname();
  const router = useRouter();
  const isTeacherPage = pathname?.startsWith("/teacher");
  const isPlayerPage = pathname?.includes("/chapters");
  const isSearchPage = pathname === "/search";
  const isTeacher =
    currentProfile?.role === "ADMIN" || currentProfile?.role === "MODERATOR";

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push("/login");
    router.refresh();
  };

  return (
    <>
      {isSearchPage && (
        <div className="hidden md:block">
          <SearchInput />
        </div>
      )}
      <div className="flex gap-x-2 ml-auto">
        {isTeacherPage || isPlayerPage ? (
          <Button size="sm" variant="ghost" onClick={handleSignOut}>
            <LogOut className="h-4 w-4 mr-2" />
            Шығу
          </Button>
        ) : isTeacher ? (
          <Link href="/teacher/courses">
            <Button size="sm" variant="ghost">
              Мұғалім режимі
            </Button>
          </Link>
        ) : null}
      </div>
    </>
  );
};
