"use client";

import { AreaConsolePage } from "@/components/areas/AreaConsolePage";
import { LOS_AREA } from "@/lib/area-configs";

export default function LosManagementPage() {
  return <AreaConsolePage config={LOS_AREA} />;
}
