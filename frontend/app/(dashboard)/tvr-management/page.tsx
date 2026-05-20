"use client";

import { AreaConsolePage } from "@/components/areas/AreaConsolePage";
import { TVR_AREA } from "@/lib/area-configs";

export default function TvrManagementPage() {
  return <AreaConsolePage config={TVR_AREA} />;
}
