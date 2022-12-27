import '../css/CountdownMain.scss';
import useFitText from "use-fit-text";
import { Countdown, getNewYearInTimeZone, getTimestampDescription } from './Countdown';
import { TimeZone } from './TimeZone';

interface Props {
    timeZone: TimeZone
    globalTime: number
    newYear: number
}

export function CountdownMain({ timeZone, globalTime, newYear }: Props) {
    const { fontSize, ref } = useFitText({
        minFontSize: 1,
        maxFontSize: 100000,
        resolution: 1,
        onFinish: (fontSize) => {
            console.log(fontSize);
        }
    });

    const newYearInTimeZone = getNewYearInTimeZone(newYear, timeZone)

    return <div className="main-countdown">
        <div className="up-next main-up-next">
            Up next:
            <div className="main-timestamp">
                Celebrate at {getTimestampDescription(newYearInTimeZone)}
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