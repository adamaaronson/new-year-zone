import "../css/App.scss";
import { CountdownList } from "./CountdownList";
import timezones from "../data/timezones.json";
import { Header } from "./Header";
import { CountdownMain } from "./CountdownMain";
import { useEffect, useState } from "react";
import { getNewYearInTimeZone } from "./Countdown";
import { TimeZone } from "./TimeZone";
import { HappyNewYearModal } from "./HappyNewYearModal";
import { Footer } from "./Footer";

const INTERVAL_MILLISECONDS = 100;
const COPIED_MILLISECONDS = 2 * 1000; // 2 seconds
const timeZonesInOrder = timezones.sort((a, b) => b.utc - a.utc);
const firstTimeZone = timeZonesInOrder[0];
const lastTimeZone = timeZonesInOrder[timeZonesInOrder.length - 1];

const nextYearInBakerIsland = () => {
  const currentTime = Date.now();
  const currentYear = new Date().getFullYear();
  const nextYear = currentYear + 1;
  const nextNextYear = nextYear + 1;

  if (currentTime < getNewYearInTimeZone(currentYear, lastTimeZone)) {
    // it's the new year here, but not in Baker Island
    return currentYear;
  } else if (currentTime < getNewYearInTimeZone(nextYear, lastTimeZone)) {
    // it's neither the new year here or in Baker Island
    return nextYear;
  } else {
    // it's past the new year both here and Baker Island, and we're testing
    return nextNextYear;
  }
};

const defaultBackgroundColor = firstTimeZone.backgroundColor;
const defaultTextColor = firstTimeZone.textColor;

interface TimeZoneData {
  soonestTimeZone: TimeZone | null;
  remainingTimeZones: TimeZone[];
}

export default function App() {
  const [newYear, setNewYear] = useState(() => nextYearInBakerIsland());
  const [timeZoneData, setTimeZoneData] = useState(getTimeZoneData(newYear));
  const [globalTime, setGlobalTime] = useState(Date.now());
  const [celebrating, setCelebrating] = useState(false);
  const [timeZoneCelebrating, setTimeZoneCelebrating] = useState(
    timeZonesInOrder[0]
  );
  const [backgroundColor, setBackgroundColor] = useState(
    defaultBackgroundColor
  );
  const [copied, setCopied] = useState(false);
  const [textColor, setTextColor] = useState(defaultTextColor);

  function getTimeZoneData(newNewYear: number): TimeZoneData {
    const now = Date.now();
    const soonestTimeZoneIndex = timeZonesInOrder.findIndex(
      (zone) => getNewYearInTimeZone(newNewYear, zone) > now
    );

    if (soonestTimeZoneIndex === -1) {
      return {
        soonestTimeZone: null,
        remainingTimeZones: [],
      };
    }
    return {
      soonestTimeZone: timeZonesInOrder[soonestTimeZoneIndex],
      remainingTimeZones: timeZonesInOrder.slice(soonestTimeZoneIndex + 1),
    };
  }

  useEffect(() => {
    const newBackgroundColor = timeZoneData.soonestTimeZone
      ? timeZoneData.soonestTimeZone.backgroundColor
      : defaultBackgroundColor;

    const newTextColor = timeZoneData.soonestTimeZone
      ? timeZoneData.soonestTimeZone.textColor
      : defaultTextColor;

    setBackgroundColor(newBackgroundColor);
    setTextColor(newTextColor);

    const root = document.documentElement;
    root?.style.setProperty("--background-color", newBackgroundColor);
    root?.style.setProperty("--text-color", newTextColor);
  }, [timeZoneData]);

  useEffect(() => {
    const updateCountdowns = () => {
      setGlobalTime((prevTime) => {
        if (prevTime <= 0) {
          return 0;
        }

        const now = Date.now();
        return now;
      });
    };

    setTimeout(updateCountdowns, INTERVAL_MILLISECONDS);
  }, [globalTime]);

  const celebrate = (timeZone: TimeZone) => {
    setTimeZoneCelebrating(timeZone);
    setCelebrating(true);
  };

  useEffect(() => {
    if (!celebrating) {
      setNewYear(nextYearInBakerIsland());
      setTimeZoneData(getTimeZoneData(nextYearInBakerIsland()));
    }
  }, [celebrating]);

  useEffect(() => {
    if (copied) {
      setTimeout(() => {
        setCopied(false);
      }, COPIED_MILLISECONDS);
    }
  }, [copied]);

  function share() {
    const text = `Celebrate the New Year in every time zone! https://newyear.zone`;

    if ("share" in navigator && navigator.canShare({ text: text })) {
      // can use Web Share API
      navigator.share({
        text: text,
      });
    } else {
      // fallback
      window.navigator.clipboard.writeText(text);
      setCopied(true);
    }
  }

  return (
    <div className="app">
      <div className="app-border">
        <div className="app-not-border"></div>
        <svg width="100%" height="100%" className="app-border-svg">
          <pattern
            width="100"
            height="100"
            viewBox="0 0 100 100"
            patternUnits="userSpaceOnUse"
            id="stripe-pattern"
          >
            <path d="M 0 0 50 0 0 50 Z" fill={textColor} />
            <path d="M 100 0 100 50 50 100 0 100 Z" fill={textColor} />
          </pattern>

          <rect
            x="0"
            y="0"
            width="100%"
            height="100%"
            fill="url(#stripe-pattern)"
          ></rect>
        </svg>
      </div>
      <div className="nav-links">
        <a
          href="https://aaronson.org/blog/new-year-zone"
          target="_blank"
          rel="noopener noreferrer"
        >
          About
        </a>
        <div className="share-link" onClick={share}>
          {copied ? "Copied" : "Share"}
        </div>
      </div>
      <Header newYear={newYear} />
      <HappyNewYearModal
        celebrating={celebrating}
        newYear={newYear}
        remainingTimeZones={timeZoneData.remainingTimeZones}
        setCelebrating={setCelebrating}
        timeZone={timeZoneCelebrating}
      />
      <section className="main-countdown-section">
        {timeZoneData.soonestTimeZone && (
          <CountdownMain
            globalTime={globalTime}
            timeZone={timeZoneData.soonestTimeZone}
            newYear={newYear}
            onCountdownEnd={(timeZone) => celebrate(timeZone)}
          />
        )}
      </section>
      <section className="countdown-list-section">
        {timeZoneData.remainingTimeZones.length > 0 && (
          <CountdownList
            globalTime={globalTime}
            timeZones={timeZoneData.remainingTimeZones}
            newYear={newYear}
            onCountdownEnd={(timeZone) => celebrate(timeZone)}
          />
        )}
      </section>
      <Footer />
    </div>
  );
}
