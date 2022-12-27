import { useEffect, useState } from "react";
import { TimeZone } from "./TimeZone";

// source for a lot of this:
// https://medium.com/@bsalwiczek/building-timer-in-react-its-not-as-simple-as-you-may-think-80e5f2648f9b

export const INTERVAL_MILLISECONDS = 100;

const MILLISECONDS_PER_SECOND = 1000;
const SECONDS_PER_MINUTE = 60;
const MINUTES_PER_HOUR = 60;
const HOURS_PER_DAY = 24;

const MILLISECONDS_PER_MINUTE = MILLISECONDS_PER_SECOND * SECONDS_PER_MINUTE;
const MILLISECONDS_PER_HOUR = MILLISECONDS_PER_MINUTE * MINUTES_PER_HOUR;
const MILLISECONDS_PER_DAY = MILLISECONDS_PER_HOUR * HOURS_PER_DAY;

const HAPPY_NEW_YEAR = "Happy New Year!"

const NEW_YEAR_DATE = {
    yearOffset: 0,
    month: 0,
    day: 1,
    hour: 0,
    minute: 0
}

// const NEW_YEAR_DATE = {
//     yearOffset: -1,
//     month: 11,
//     day: 28,
//     hour: 20,
//     minute: 7
// }

interface Props {
    untilTime: number
    globalTime: number
}

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

export function getNewYearInTimeZone(newYear: number, timeZone: TimeZone) {
    const localNewYearDate = new Date(
        newYear + NEW_YEAR_DATE.yearOffset,
        NEW_YEAR_DATE.month,
        NEW_YEAR_DATE.day,
        NEW_YEAR_DATE.hour, 
        NEW_YEAR_DATE.minute
    );

    const localTimeZoneOffsetMinutes = new Date().getTimezoneOffset();
    const timeZoneOffsetMinutes = timeZone.utc * MINUTES_PER_HOUR;
    const differenceMinutes = -localTimeZoneOffsetMinutes - timeZoneOffsetMinutes;

    let timeZoneNewYearDate = localNewYearDate;
    timeZoneNewYearDate.setMinutes(timeZoneNewYearDate.getMinutes() + differenceMinutes);
    
    return timeZoneNewYearDate.getTime();
}

export function getTimestampDescription(timestamp: number) {
    const newYearLocalTime = new Date(timestamp).toLocaleTimeString([], { hour: "numeric", minute: "numeric" })
    const newYearLocalDate = new Date(timestamp).toLocaleDateString([], { month: "short", day: "numeric"})
    const newYearIsSoon = timestamp < Date.now() + MILLISECONDS_PER_HOUR * 23;

    return (
        newYearLocalTime
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

export function Countdown({ untilTime, globalTime }: Props) {
    const time = untilTime - globalTime;

    return <div className="countdown">
        {getTimeString(time)}
    </div>
}