"use server";

import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

import { getAnalytics } from "@/actions/get-analytics";
import { DataCard } from "./_components/data-card";
import { Chart } from "./_components/chart";

const AnalyticsPage = async () => {
  const supabase = createServerComponentClient({ cookies });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  const userId = session?.user.id;

  if (!userId) {
    return redirect("/login"); // или "/" — зависит от твоей логики
  }

  const {
    data,
    totalRevenue,
    totalSales,
  } = await getAnalytics(userId);

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 gap-4 mb-4 md:grid-cols-2">
        <DataCard
          label="Жалпы табыс"
          value={totalRevenue}
          shouldFormat
        />
        <DataCard
          label="Жалпы сатылымдар"
          value={totalSales}
          shouldFormat={false}
        />
      </div>
      <Chart data={data} />
    </div>
  );
};

export default AnalyticsPage;
