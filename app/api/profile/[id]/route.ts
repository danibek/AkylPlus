import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
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
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const values = await req.json();

    const { data: profile, error } = await supabase
      .from("profiles")
      .update(values)
      .eq("id", params.id)
      .select()
      .single();

    if (error) {
      console.error("[PROFILE_ID]", error);
      return new NextResponse("Internal Error", { status: 500 });
    }

    return NextResponse.json(profile);
  } catch (error) {
    console.error("[PROFILE_ID]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
