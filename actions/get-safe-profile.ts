import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { SafeProfile } from "@/types";

export default async function getSafeProfile() {
  try {
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

    if (!session?.user) {
      return null;
    }

    const { data: profile, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", session.user.id)
      .single();

    if (error) {
      console.error("Error fetching profile:", error);
      return null;
    }

    if (!profile) {
      const { data: newProfile, error: createError } = await supabase
        .from("profiles")
        .insert([
          {
            id: session.user.id,
            name: session.user.user_metadata.name || "Пайдаланушы",
            email: session.user.email,
            role: "USER",
          },
        ])
        .select()
        .single();

      if (createError) {
        console.error("Error creating profile:", createError);
        return null;
      }

      return newProfile as SafeProfile;
    }

    return profile as SafeProfile;
  } catch (error) {
    console.error("[GET_SAFE_PROFILE]", error);
    return null;
  }
}
