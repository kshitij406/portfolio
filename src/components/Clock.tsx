"use client";

import { useEffect, useState } from "react";

// Local time in Canterbury. Rendered empty on the server so it can't mismatch.
export default function Clock() {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setNow(new Date());
    const id = setInterval(() => setNow(new Date()), 1000 * 15);
    return () => clearInterval(id);
  }, []);

  const fmt = (opts: Intl.DateTimeFormatOptions) =>
    now ? new Intl.DateTimeFormat("en-GB", { timeZone: "Europe/London", ...opts }) : null;
  const time = fmt({ hour: "2-digit", minute: "2-digit" })?.format(now!);
  // GMT in winter, BST in summer.
  const zone = fmt({ timeZoneName: "short" })
    ?.formatToParts(now!)
    .find((p) => p.type === "timeZoneName")?.value;

  return (
    <span className="clock">
      <span className="clock-dot" aria-hidden />
      Canterbury, {time || "--:--"} <span className="clock-zone">{zone || "UK"}</span>
    </span>
  );
}
