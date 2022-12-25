import '../css/CountdownMain.scss';
import useFitText from "use-fit-text";
import { Countdown } from './Countdown';
import { useState } from 'react';
import { TimeZone } from './TimeZone';

interface Props {
    timeZone: TimeZone
}

function getNewYear() {
    const currentYear = new Date().getFullYear();
    const newYearDate = new Date(currentYear + 1, 0, 1, 0, 0);
    return newYearDate.getTime();
}

export function CountdownMain({ timeZone }: Props) {
    const newYearDate = useState(getNewYear());
    const { fontSize, ref } = useFitText({
        minFontSize: 0,
        resolution: 1
    });

    return <div className="main-countdown">
        <div className="up-next main-up-next">
            Up next:
            {/* Next to {new Date(getNewYear()).getFullYear()}: */}
        </div>
        <div className="main-time-zone-info">
            
            
        </div>
        <div className="main-clock">
            <div className="main-clock-textfit" ref={ref} style={{ fontSize }}>
                <Countdown untilTime={getNewYear()}/>  
            </div>
            <div className="main-time-zone-locations">
                Mexico City / Chicago / Dallas
            </div>
            <div className="main-time-zone-name">
                UTC-6
            </div>
        </div>
    </div>
}