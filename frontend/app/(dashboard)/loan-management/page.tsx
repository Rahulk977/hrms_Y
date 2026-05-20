"use client";

import { AreaConsolePage } from "@/components/areas/AreaConsolePage";
import { LOAN_AREA } from "@/lib/area-configs";

export default function LoanManagementPage() {
  return <AreaConsolePage config={LOAN_AREA} />;
}
