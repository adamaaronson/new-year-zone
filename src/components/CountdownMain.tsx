import '../css/CountdownMain.scss';
import useFitText from "use-fit-text";
import { Countdown, getNewYearInTimeZone, getTimestampDescription } from './Countdown';
import { useState } from 'react';
import { TimeZone } from './TimeZone';

interface Props {
    timeZone: TimeZone
    globalTime: number
}

export function CountdownMain({ timeZone, globalTime }: Props) {
    const { fontSize, ref } = useFitText({
        minFontSize: 5,
        maxFontSize: 10000,
        resolution: 1
    });

    const newYearInTimeZone = getNewYearInTimeZone(timeZone)

    return <div className="main-countdown">
        <div className="up-next main-up-next">
            Up next
            <div className="main-timestamp">
                at {getTimestampDescription(newYearInTimeZone)}:
            </div>
        </div>
        
        <div className="main-clock">
            <div className="main-clock-textfit" ref={ref} style={{ fontSize }}>
                <Countdown untilTime={newYearInTimeZone} globalTime={globalTime}/>  
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