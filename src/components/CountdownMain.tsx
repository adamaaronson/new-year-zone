import '../css/CountdownMain.scss';
import useFitText from "use-fit-text";
import { Countdown, getNewYearInTimeZone, getTimestampDescription } from './Countdown';
import { useState } from 'react';
import { TimeZone } from './TimeZone';

interface Props {
    timeZone: TimeZone
}

export function CountdownMain({ timeZone }: Props) {
    const { fontSize, ref } = useFitText({
        minFontSize: 5,
        maxFontSize: 10000,
        resolution: 1
    });

    const newYearInTimeZone = getNewYearInTimeZone(timeZone)

    return <div className="main-countdown">
        <div className="up-next main-up-next">
            Up next, at {getTimestampDescription(newYearInTimeZone)}:
        </div>
        <div className="main-clock">
            <div className="main-clock-textfit" ref={ref} style={{ fontSize }}>
                <Countdown untilTime={newYearInTimeZone}/>  
            </div>
            <div className="main-time-zone-locations">
                { timeZone.locations.join(" / ")}
            </div>
            <div className="main-time-zone-name">
                { timeZone.name }
            </div>
        </div>
    </div>
}