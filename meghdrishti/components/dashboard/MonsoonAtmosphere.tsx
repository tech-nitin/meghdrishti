"use client";

import React from "react";

/**
 * Atmospheric overlay helper for dashboard.
 * The primary 3D rain simulation is rendered globally by RainBackground3D inside AppShell.
 */
export function MonsoonAtmosphere() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none" aria-hidden="true">
      {/* Subtle additional atmospheric lighting wash for deep analytics */}
      <div className="absolute top-0 right-0 w-[50vw] h-[60vh] bg-[radial-gradient(ellipse_at_top_right,rgba(52,211,153,0.08)_0%,transparent_70%)]" />
      <div className="absolute bottom-10 left-10 w-[45vw] h-[50vh] bg-[radial-gradient(ellipse_at_bottom_left,rgba(56,189,248,0.06)_0%,transparent_70%)]" />
    </div>
  );
}

export default MonsoonAtmosphere;
