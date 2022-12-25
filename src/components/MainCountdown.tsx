import '../css/MainCountdown.scss';
import useFitText from "use-fit-text";
import { Countdown } from './Countdown';
import { useState } from 'react';

interface Props {
    timeZone: string
}

function getNewYear() {
    const currentYear = new Date().getFullYear();
    const newYearDate = new Date(currentYear + 1, 0, 1, 0, 0);
    return newYearDate.getTime();
}

export function MainCountdown({ timeZone }: Props) {
    const newYearDate = useState(getNewYear());
    const { fontSize, ref } = useFitText({
        minFontSize: 0,
        resolution: 1
    });

    return <div className="main-countdown">
        <div className="up-next">
            Up next:
        </div>
        <div className="main-time-zone-info">
            <span className="main-time-zone-name">
                { timeZone }
            </span>
            <span className="main-time-zone-locations">
                Mexico City, Chicago, Dallas
            </span>
        </div>
        <div className="main-clock">
            <div className="main-clock-textfit" ref={ref} style={{ fontSize }}>
                <Countdown untilTime={getNewYear()}/>  
            </div>
            <div className="main-until">
                Until 2023
            </div>
        </div>
    </div>
}