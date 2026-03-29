"use client";

import dynamic from "next/dynamic";

const FlyingPlane = dynamic(() => import("@/components/FlyingPlane"), {
  ssr: false,
});

export default function FlyingPlaneWrapper() {
  return <FlyingPlane />;
}
