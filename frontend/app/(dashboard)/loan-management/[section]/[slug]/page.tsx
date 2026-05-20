"use client";

import { AreaSlugPage } from "@/components/areas/AreaSlugPage";
import { LOAN_AREA } from "@/lib/area-configs";

export default function LoanSlugPage() {
  return <AreaSlugPage config={LOAN_AREA} emoji="💰" />;
}
