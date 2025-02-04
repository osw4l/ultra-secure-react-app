import React from "react";

export default function AnimatedPage({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="animate__animated animate__fadeIn">{children}</div>;
}
