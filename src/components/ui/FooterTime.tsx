"use client";

import { useEffect, useState } from "react";

export default function FooterTime() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const update = () => {
      setTime(
        new Date().toLocaleTimeString("en-GB", {
          timeZone: "Indian/Mauritius",
          hour: "2-digit",
          minute: "2-digit",
        })
      );
    };
    update();
    const id = setInterval(update, 60_000);
    return () => clearInterval(id);
  }, []);

  if (!time) return null;

  return (
    <span>
      {time} <span style={{ color: "var(--muted-dim)" }}>+04:00</span>
    </span>
  );
}
