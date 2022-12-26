import '../css/App.scss'
import { CountdownList } from './CountdownList'
import timezones from "../data/timezones.json"
import { Header } from './Header'
import { CountdownMain } from './CountdownMain'
import { useEffect, useState } from 'react'
import { getNewYearInTimeZone, INTERVAL_MILLISECONDS } from './Countdown'
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
    const [globalTime, setGlobalTime] = useState(Date.now());
    const [referenceTime, setReferenceTime] = useState(Date.now());

    useEffect(() => {
        const updateCountdowns = () => {
            setGlobalTime(prevTime => {
                if (prevTime <= 0) {
                    return 0;
                }

                const now = Date.now();
                const interval = now - referenceTime;
                setReferenceTime(now);
                return prevTime + interval;
            })
        }

        setTimeout(updateCountdowns, INTERVAL_MILLISECONDS);
    }, [globalTime])

    return (
        <div className="app">
            <div className="app-border"></div>
            <Header newYear={newYear}/>
            <section className="main-countdown-section">
                {timeZoneData.soonestTimeZone ? 
                    <CountdownMain globalTime={globalTime} timeZone={timeZoneData.soonestTimeZone} />
                :
                    <></>
                }
                
            </section>
            <section className="countdown-list-section">
                {timeZoneData.remainingTimeZones ?
                    <CountdownList globalTime={globalTime} timeZones={timeZoneData.remainingTimeZones} />
                :
                    <></>
                }
            </section>
        </div>
    )
}