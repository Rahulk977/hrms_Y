"use client";

import { AreaConsolePage } from "@/components/areas/AreaConsolePage";
import { LMS_AREA } from "@/lib/area-configs";

export default function LmsPage() {
  return <AreaConsolePage config={LMS_AREA} />;
}
