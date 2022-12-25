import '../css/CountdownList.scss';
import { TimeZone } from "./TimeZone"
import timezones from "../data/timezones.json"
import { Countdown, getNewYearInTimeZone } from "./Countdown";

interface Props {
    timeZones: TimeZone[]
}

export function CountdownList() {
    return <div className="countdown-list">
        <div className="up-next">
            Next up:
        </div>
        {timezones
            .sort((a, b) => b.utc - a.utc)
            .map(zone => <div className="countdown-list-row" key={zone.name}>
            <div className="countdown-list-timer">
                <Countdown untilTime={getNewYearInTimeZone(zone)} />
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