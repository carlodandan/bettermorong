import { useState, useEffect } from 'react';

export interface PhilippineTimeData {
  timeString: string;
  dateString: string;
  dayString: string;
  fullFormatted: string;
  compactFormatted: string;
  rawDate: Date;
}

export function usePhilippineTime(): PhilippineTimeData {
  const [now, setNow] = useState<Date>(() => new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setNow(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const timeFormatter = new Intl.DateTimeFormat('en-PH', {
    timeZone: 'Asia/Manila',
    hour: 'numeric',
    minute: '2-digit',
    second: '2-digit',
    hour12: true,
  });

  const compactTimeFormatter = new Intl.DateTimeFormat('en-PH', {
    timeZone: 'Asia/Manila',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });

  const dateFormatter = new Intl.DateTimeFormat('en-PH', {
    timeZone: 'Asia/Manila',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  const dayFormatter = new Intl.DateTimeFormat('en-PH', {
    timeZone: 'Asia/Manila',
    weekday: 'short',
  });

  const timeString = timeFormatter.format(now);
  const compactTime = compactTimeFormatter.format(now);
  const dateString = dateFormatter.format(now);
  const dayString = dayFormatter.format(now);

  return {
    timeString,
    dateString,
    dayString,
    fullFormatted: `${dayString}, ${dateString} • ${timeString} PHT`,
    compactFormatted: `${compactTime} PHT`,
    rawDate: now,
  };
}
