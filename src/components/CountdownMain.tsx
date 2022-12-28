import '../css/CountdownMain.scss';
import { Countdown, getDays, getNewYearInTimeZone, getTimestampDescription } from './Countdown';
import { TimeZone } from './TimeZone';
import { useEffect, useRef, useState } from 'react';

interface Props {
    timeZone: TimeZone
    globalTime: number
    newYear: number
    onCountdownEnd: (timeZone: TimeZone) => void
}

function getNewTextSize(textWidth: number, containerWidth: number, textSize: number) {
    return Math.floor(containerWidth / textWidth * textSize);
}

export function CountdownMain({ timeZone, globalTime, newYear, onCountdownEnd }: Props) {
    const newYearInTimeZone = getNewYearInTimeZone(newYear, timeZone)
    const countdownTextRef = useRef(null);
    const countdownContainerRef = useRef(null);
    const [countdownSize, setCountdownSize] = useState(100);

    const resizeCountdown = () => {
        if (countdownTextRef.current && countdownContainerRef.current) {
            const currentFontSize = window
                .getComputedStyle(countdownTextRef.current, null)
                .getPropertyValue("font-size");
            
            const newCountdownSize = getNewTextSize(
                countdownTextRef.current["offsetWidth"],
                countdownContainerRef.current["offsetWidth"],
                parseInt(currentFontSize)
            );

            setCountdownSize(newCountdownSize);
        }
    }

    // resize countdown on load
    useEffect(() => {
        resizeCountdown();
    }, [])

    // resize countdown on days change
    useEffect(() => {
        resizeCountdown();
    }, [getDays(newYearInTimeZone - globalTime)])

    // resize countdown on window resize
    useEffect(() => {
        window.addEventListener('resize', resizeCountdown);
    }, [])

    return <div className="main-countdown">
        <div className="up-next main-up-next" ref={countdownContainerRef}>
            Up next:
            <div className="main-timestamp">
                {getTimestampDescription(newYearInTimeZone, timeZone)}
            </div>
        </div>
        
        <div className="main-countdown-meat">
            <div className="main-countdown-text" ref={countdownTextRef} style={{fontSize: countdownSize + "px"}}>
                <Countdown
                    untilTime={newYearInTimeZone}
                    globalTime={globalTime}
                    onCountdownEnd={() => onCountdownEnd(timeZone)}
                />  
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