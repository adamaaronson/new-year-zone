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

const MIDNIGHT = "12:00 AM"

interface Props {
    untilTime: number
    globalTime: number
}

function getMillisecondsUntil(timeInMilliseconds: number) {
    const now = Date.now();
    return timeInMilliseconds - now;
}

function getSeconds(timeInMilliseconds: number) {
    return Math.floor((timeInMilliseconds / MILLISECONDS_PER_SECOND + 1) % SECONDS_PER_MINUTE).toString().padStart(2, '0');
}

function getMinutes(timeInMilliseconds: number) {
    return Math.floor(timeInMilliseconds / MILLISECONDS_PER_MINUTE % MINUTES_PER_HOUR).toString().padStart(2, '0');
}

function getHours(timeInMilliseconds: number) {
    return Math.floor(timeInMilliseconds / MILLISECONDS_PER_HOUR % HOURS_PER_DAY).toString().padStart(2, '0');
}

function getDays(timeInMilliseconds: number) {
    return Math.floor(timeInMilliseconds / MILLISECONDS_PER_DAY);
}

export function getNewYearInTimeZone(timeZone: TimeZone) {
    const currentYear = new Date().getFullYear();
    const localNewYearDate = new Date(currentYear + 1, 0, 1, 0, 0);

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
        newYearLocalTime == MIDNIGHT ? "Midnight" : newYearLocalTime
    ) + (
        newYearIsSoon ? "" : " on " + newYearLocalDate
    )
}

export function Countdown({ untilTime, globalTime }: Props) {
    const time = untilTime - globalTime;

    return <div className="countdown">
       {getDays(time) > 0 ? (getDays(time) + ":") : ""}{getHours(time)}:{getMinutes(time)}:{getSeconds(time)}
    </div>
}