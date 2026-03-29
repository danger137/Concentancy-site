"use client";

import { ReactNode, useEffect, useState } from "react";
import SmoothScroll from "@/components/SmoothScroll";

export default function SmoothScrollWrapper({ children }: { children: ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <>{children}</>;
  }

  return <SmoothScroll>{children}</SmoothScroll>;
}
