"use client";

import { useEffect, useMemo, useState } from "react";

type HeroLocalTimeProps = {
    timezoneId?: string | null;
    timezoneLabel?: string | null;
};

function formatTime(timezoneId: string) {
    return new Intl.DateTimeFormat("pt-BR", {
        timeZone: timezoneId,
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
    }).format(new Date());
}

export function HeroLocalTime({
    timezoneId,
    timezoneLabel,
}: HeroLocalTimeProps) {
    const safeTimezoneId = timezoneId?.trim();
    const safeTimezoneLabel = timezoneLabel?.trim();

    const [time, setTime] = useState("");

    useEffect(() => {
        if (!safeTimezoneId) return;

        const resolvedTimezoneId = safeTimezoneId;

        function updateTime() {
            try {
                setTime(formatTime(resolvedTimezoneId));
            } catch {
                setTime("");
            }
        }

        updateTime();

        const intervalId = window.setInterval(updateTime, 60_000);

        return () => window.clearInterval(intervalId);
    }, [safeTimezoneId]);

    if (!safeTimezoneLabel && !time) return null;

    return (
        <span>
            {safeTimezoneLabel}
            {time ? ` ${time}` : ""}
        </span>
    );
}