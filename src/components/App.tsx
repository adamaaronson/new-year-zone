import '../css/App.scss'
import { CountdownList } from './CountdownList'
import timezones from "../data/timezones.json"
import { Header } from './Header'
import { CountdownMain } from './CountdownMain'
import { useState } from 'react'
import { getNewYearInTimeZone } from './Countdown'
import { TimeZone } from './TimeZone'

const newYear = new Date().getFullYear() + 1;
const timeZonesInOrder = timezones.sort((a, b) => b.utc - a.utc);

interface TimeZoneData {
    soonestTimeZone: TimeZone | null;
    remainingTimeZones: TimeZone[] | null;
}

function getTimeZoneData(): TimeZoneData {
    const now = Date.now();
    const soonestTimeZoneIndex = timeZonesInOrder.findIndex(zone => getNewYearInTimeZone(zone) > now);

    if (soonestTimeZoneIndex === -1) {
        return {
            soonestTimeZone: null,
            remainingTimeZones: null
        }
    }

    return {
        soonestTimeZone: timeZonesInOrder[soonestTimeZoneIndex],
        remainingTimeZones: timeZonesInOrder.slice(soonestTimeZoneIndex + 1)
    };
}

export default function App() {
    const [timeZoneData, setTimeZoneData] = useState(getTimeZoneData());

    return (
        <div className="app">
            <div className="app-border"></div>
            <Header newYear={newYear}/>
            <section className="main-countdown-section">
                {timeZoneData.soonestTimeZone ? 
                    <CountdownMain timeZone={timeZoneData.soonestTimeZone} />
                :
                    <></>
                }
                
            </section>
            <section className="countdown-list-section">
                {timeZoneData.remainingTimeZones ?
                    <CountdownList timeZones={timeZoneData.remainingTimeZones} />
                :
                    <></>
                }
            </section>
        </div>
    )
}