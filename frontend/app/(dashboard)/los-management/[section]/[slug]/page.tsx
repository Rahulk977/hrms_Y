"use client";

import { AreaSlugPage } from "@/components/areas/AreaSlugPage";
import { LOS_AREA } from "@/lib/area-configs";

export default function LosSlugPage() {
  return <AreaSlugPage config={LOS_AREA} emoji="▧" />;
}
