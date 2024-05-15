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
import { NewYearEverywhere } from "./NewYearEverywhere";

const newYear = 2025;
const INTERVAL_MILLISECONDS = 100;
const COPIED_MILLISECONDS = 2 * 1000; // 2 seconds
const timeZonesInOrder = timezones.sort((a, b) => b.utc - a.utc);

const defaultBackgroundColor = timeZonesInOrder[0].backgroundColor;
const defaultTextColor = timeZonesInOrder[0].textColor;

interface TimeZoneData {
  soonestTimeZone: TimeZone | null;
  remainingTimeZones: TimeZone[] | null;
}

function getTimeZoneData(): TimeZoneData {
  const now = Date.now();
  const soonestTimeZoneIndex = timeZonesInOrder.findIndex(
    (zone) => getNewYearInTimeZone(newYear, zone) > now
  );

  if (soonestTimeZoneIndex === -1) {
    return {
      soonestTimeZone: null,
      remainingTimeZones: null,
    };
  }

  return {
    soonestTimeZone: timeZonesInOrder[soonestTimeZoneIndex],
    remainingTimeZones: timeZonesInOrder.slice(soonestTimeZoneIndex + 1),
  };
}

export default function App() {
  const [timeZoneData, setTimeZoneData] = useState(getTimeZoneData());
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
      setTimeZoneData(getTimeZoneData());
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
        setCelebrating={setCelebrating}
        timeZone={timeZoneCelebrating}
      />
      <section className="main-countdown-section">
        {timeZoneData.soonestTimeZone ? (
          <CountdownMain
            globalTime={globalTime}
            timeZone={timeZoneData.soonestTimeZone}
            newYear={newYear}
            onCountdownEnd={(timeZone) => celebrate(timeZone)}
          />
        ) : (
          <NewYearEverywhere newYear={newYear} />
        )}
      </section>
      <section className="countdown-list-section">
        {timeZoneData.remainingTimeZones &&
          timeZoneData.remainingTimeZones.length > 0 && (
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
