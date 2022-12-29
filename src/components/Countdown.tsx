import { useEffect, useState } from "react";
import { TimeZone } from "./TimeZone";

const MILLISECONDS_PER_SECOND = 1000;
const SECONDS_PER_MINUTE = 60;
const MINUTES_PER_HOUR = 60;
const HOURS_PER_DAY = 24;

const MILLISECONDS_PER_MINUTE = MILLISECONDS_PER_SECOND * SECONDS_PER_MINUTE;
const MILLISECONDS_PER_HOUR = MILLISECONDS_PER_MINUTE * MINUTES_PER_HOUR;
const MILLISECONDS_PER_DAY = MILLISECONDS_PER_HOUR * HOURS_PER_DAY;

const NEW_YEAR_DATE = {
    yearOffset: 0,
    month: 0,
    day: 1,
    hour: 0,
    minute: 0,
    second: 0
}

// const NEW_YEAR_DATE = {
//     yearOffset: -1,
//     month: 11,
//     day: 29,
//     hour: 12,
//     minute: 6,
//     second: 0
// }

function getSeconds(timeInMilliseconds: number) {
    // add 1 because it makes countdown more satisfying
    return Math.floor((timeInMilliseconds / MILLISECONDS_PER_SECOND + 1) % SECONDS_PER_MINUTE).toString().padStart(2, '0');
}

function getMinutes(timeInMilliseconds: number) {
    if (timeInMilliseconds < 0) {
        timeInMilliseconds = 0;
    }
    return Math.floor(timeInMilliseconds / MILLISECONDS_PER_MINUTE % MINUTES_PER_HOUR).toString().padStart(2, '0');
}

function getHours(timeInMilliseconds: number) {
    if (timeInMilliseconds < 0) {
        timeInMilliseconds = 0;
    }
    return Math.floor(timeInMilliseconds / MILLISECONDS_PER_HOUR % HOURS_PER_DAY).toString().padStart(2, '0');
}

export function getDays(timeInMilliseconds: number) {
    if (timeInMilliseconds < 0) {
        timeInMilliseconds = 0;
    }
    return Math.floor(timeInMilliseconds / MILLISECONDS_PER_DAY);
}

export function isLocalTimeZone(timeZone: TimeZone) {
    const localTimeZoneOffsetMinutes = new Date().getTimezoneOffset();
    const timeZoneOffsetMinutes = timeZone.utc * MINUTES_PER_HOUR;
    return timeZoneOffsetMinutes === -localTimeZoneOffsetMinutes;
}

export function getNewYearInTimeZone(newYear: number, timeZone: TimeZone) {
    const localNewYearDate = new Date(
        newYear + NEW_YEAR_DATE.yearOffset,
        NEW_YEAR_DATE.month,
        NEW_YEAR_DATE.day,
        NEW_YEAR_DATE.hour, 
        NEW_YEAR_DATE.minute,
        NEW_YEAR_DATE.second
    );

    const localTimeZoneOffsetMinutes = new Date().getTimezoneOffset();
    const timeZoneOffsetMinutes = timeZone.utc * MINUTES_PER_HOUR;
    const differenceMinutes = -localTimeZoneOffsetMinutes - timeZoneOffsetMinutes;

    let timeZoneNewYearDate = localNewYearDate;
    timeZoneNewYearDate.setMinutes(timeZoneNewYearDate.getMinutes() + differenceMinutes);
    
    return timeZoneNewYearDate.getTime();
}

export function getTimestampDescription(timestamp: number, timeZone: TimeZone) {
    if (isLocalTimeZone(timeZone)) {
        return <><i className="fa fa-map-marker"></i> You are here</>
    }

    const newYearLocalTime = new Date(timestamp).toLocaleTimeString([], { hour: "numeric", minute: "numeric" })
    const newYearLocalDate = new Date(timestamp).toLocaleDateString([], { month: "short", day: "numeric"})
    const newYearIsSoon = timestamp < Date.now() + MILLISECONDS_PER_HOUR * 23;

    return "Celebrate at " + (
        newYearLocalTime.replace(":00", "")
    ) + (
        newYearIsSoon ? "" : " on " + newYearLocalDate
    )
}

function getTimeString(time: number) {
    let timeString = "";

    if (time < 0) {
        time = -1;
    }

    if (getDays(time) > 0) {
        timeString += getDays(time) + ":";
    }
    timeString += getHours(time);
    timeString += ":";
    timeString += getMinutes(time);
    timeString += ":";
    timeString += getSeconds(time);

    return timeString;
}

interface Props {
    untilTime: number
    globalTime: number
    onCountdownEnd: () => void
}

export function Countdown({ untilTime, globalTime, onCountdownEnd }: Props) {
    const [complete, setComplete] = useState(false)
    const time = untilTime - globalTime;

    useEffect(() => {
        if (time <= 0 && !complete) {
            onCountdownEnd();
            setComplete(true);
        }
    }, [time])

    useEffect(() => {
        if (time > 0) {
            setComplete(false);
        }
    }, [untilTime])

    return <div className="countdown">
        {getTimeString(time)}
    </div>
}