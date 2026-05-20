"use client";

import { AreaSectionPage } from "@/components/areas/AreaSectionPage";
import { LOAN_AREA } from "@/lib/area-configs";

export default function LoanSectionPage() {
  return <AreaSectionPage config={LOAN_AREA} />;
}
