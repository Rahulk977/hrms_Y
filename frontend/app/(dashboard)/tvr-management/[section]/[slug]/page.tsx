"use client";

import { AreaSlugPage } from "@/components/areas/AreaSlugPage";
import { TVR_AREA } from "@/lib/area-configs";

export default function TvrSlugPage() {
  return <AreaSlugPage config={TVR_AREA} emoji="◩" />;
}
