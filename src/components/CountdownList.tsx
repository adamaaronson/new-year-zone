import '../css/CountdownList.scss';
import { TimeZone } from "./TimeZone"
import { Countdown, getNewYearInTimeZone, getTimestampDescription } from "./Countdown";

interface Props {
    timeZones: TimeZone[]
    globalTime: number
    newYear: number
    onCountdownEnd: (timeZone: TimeZone) => void
}

export function CountdownList({ timeZones, globalTime, newYear, onCountdownEnd }: Props) {
    return <div className="countdown-list">
        <div className="up-next">
            Coming up:
        </div>
        {timeZones
            .map(zone => <div className="countdown-list-row" key={zone.name}>
            <div className="countdown-list-time-stuff">
                <div className="countdown-list-timer">
                    <Countdown
                        globalTime={globalTime}
                        untilTime={getNewYearInTimeZone(newYear, zone)}
                        onCountdownEnd={() => onCountdownEnd(zone)}
                    />
                </div>
                <div className="countdown-list-timestamp">
                    Celebrate at {getTimestampDescription(getNewYearInTimeZone(newYear, zone))}
                </div>
            </div>
            <div className="countdown-list-info">
                <div className="countdown-list-locations">
                    {zone.locations.map(location => <div className="countdown-list-location" key={location}>
                        {location}
                    </div>)}
                </div>
                <div className="countdown-list-timezone-name">
                    {zone.name}
                </div>
            </div>
        </div>)}
    </div>
}