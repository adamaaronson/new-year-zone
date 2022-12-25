import { useEffect, useState } from "react";

// source for a lot of this:
// https://medium.com/@bsalwiczek/building-timer-in-react-its-not-as-simple-as-you-may-think-80e5f2648f9b

const MILLISECONDS_UNTIL_COUNTDOWN = 60*10*1000;
const INTERVAL_MILLISECONDS = 100;

const MILLISECONDS_PER_SECOND = 1000;
const SECONDS_PER_MINUTE = 60;
const MINUTES_PER_HOUR = 60;
const HOURS_PER_DAY = 24;

const MILLISECONDS_PER_MINUTE = MILLISECONDS_PER_SECOND * SECONDS_PER_MINUTE;
const MILLISECONDS_PER_HOUR = MILLISECONDS_PER_MINUTE * MINUTES_PER_HOUR;
const MILLISECONDS_PER_DAY = MILLISECONDS_PER_HOUR * HOURS_PER_DAY;

interface Props {
    untilTime: number
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
    return Math.floor(timeInMilliseconds / MILLISECONDS_PER_DAY).toString();
}

export function Countdown({ untilTime }: Props) {
    const [time, setTime] = useState(getMillisecondsUntil(untilTime));
    const [referenceTime, setReferenceTime] = useState(Date.now());
    
    useEffect(() => {
        const countdown = () => {
            setTime(prevTime => {
                if (prevTime <= 0) {
                    return 0;
                }

                const now = Date.now();
                const interval = now - referenceTime;
                setReferenceTime(now);
                return prevTime - interval;
            })
        }

        setTimeout(countdown, INTERVAL_MILLISECONDS);
    }, [time])

    return <div className="countdown">
       {getDays(time)}:{getHours(time)}:{getMinutes(time)}:{getSeconds(time)}
    </div>
}