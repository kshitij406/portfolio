"use client";

import { useEffect, useState } from "react";
import { useAnomalies } from "@/lib/anomalies";

// Labelled Canterbury, but it starts out reading East Africa Time: the clock
// still thinks I'm on the internship in Dar es Salaam. Clicking it fixes it.
export default function Clock() {
  const { found, flag } = useAnomalies();
  const fixed = found.has("clock");
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setNow(new Date());
    const id = setInterval(() => setNow(new Date()), 1000 * 15);
    return () => clearInterval(id);
  }, []);

  const zone = fixed ? "Europe/London" : "Africa/Dar_es_Salaam";
  const fmt = (opts: Intl.DateTimeFormatOptions) =>
    now ? new Intl.DateTimeFormat("en-GB", { timeZone: zone, ...opts }).format(now) : "";
  const time = fmt({ hour: "2-digit", minute: "2-digit" });
  const abbr = now
    ? new Intl.DateTimeFormat("en-GB", { timeZone: zone, timeZoneName: "short" })
        .formatToParts(now)
        .find((p) => p.type === "timeZoneName")?.value
    : "";

  return (
    <button
      type="button"
      className={`clock${fixed ? " clock-fixed" : ""}`}
      onClick={() => flag("clock")}
      title={fixed ? "Canterbury time, correctly this time" : undefined}
    >
      <span className="clock-dot" aria-hidden />
      Canterbury, {time || "--:--"} <span className="clock-zone">{fixed ? abbr : "EAT"}</span>
    </button>
  );
}
