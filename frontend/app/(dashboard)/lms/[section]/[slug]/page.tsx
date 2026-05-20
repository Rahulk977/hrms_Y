"use client";

import { AreaSlugPage } from "@/components/areas/AreaSlugPage";
import { LMS_AREA } from "@/lib/area-configs";

export default function LmsSlugPage() {
  return <AreaSlugPage config={LMS_AREA} emoji="◫" />;
}
