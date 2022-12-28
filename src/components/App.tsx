import '../css/App.scss'
import style from '../main.scss?inline'
import { CountdownList } from './CountdownList'
import timezones from "../data/timezones.json"
import { Header } from './Header'
import { CountdownMain } from './CountdownMain'
import { useEffect, useState } from 'react'
import { getNewYearInTimeZone, INTERVAL_MILLISECONDS } from './Countdown'
import { TimeZone } from './TimeZone'
import { HappyNewYearModal } from './HappyNewYearModal'
import { Footer } from './Footer'
import { NewYearEverywhere } from './NewYearEverywhere'

const newYear = 2023;
const timeZonesInOrder = timezones.sort((a, b) => b.utc - a.utc);

interface TimeZoneData {
    soonestTimeZone: TimeZone | null;
    remainingTimeZones: TimeZone[] | null;
}

function getTimeZoneData(): TimeZoneData {
    const now = Date.now();
    const soonestTimeZoneIndex = timeZonesInOrder.findIndex(zone => getNewYearInTimeZone(newYear, zone) > now);

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
    const [celebrating, setCelebrating] = useState(false);
    const [timeZoneCelebrating, setTimeZoneCelebrating] = useState(timeZonesInOrder[0])

    const root = document.documentElement
    const backgroundColor = getComputedStyle(root).getPropertyValue("--background-color")
    const textColor = getComputedStyle(root).getPropertyValue("--text-color")

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

    const celebrate = (timeZone: TimeZone) => {
        setTimeZoneCelebrating(timeZone);
        setCelebrating(true);
    }

    useEffect(() => {
        if (!celebrating) {
            setTimeZoneData(getTimeZoneData());
        }
    }, [celebrating])

    return (
        <div className="app">
            <div className="app-border">
                <div className="app-not-border"></div>
                <svg width="100%" height="100%" className="app-border-svg">
                    <pattern width="100" height="100" viewBox="0 0 100 100" patternUnits="userSpaceOnUse" id="stripe-pattern">
                        <path d="M 0 0 50 0 0 50 Z" fill={textColor}/>
                        <path d="M 100 0 100 50 50 100 0 100 Z" fill={textColor}/>
                    </pattern>

                    <rect x="0" y="0" width="100%" height="100%" fill="url(#stripe-pattern)"></rect>
                </svg>
            </div>
            
            <Header newYear={newYear}/>
            <HappyNewYearModal
                celebrating={celebrating}
                setCelebrating={setCelebrating}
                timeZone={timeZoneCelebrating}
            />
            <section className="main-countdown-section">
                {timeZoneData.soonestTimeZone ? 
                    <CountdownMain
                        globalTime={globalTime}
                        timeZone={timeZoneData.soonestTimeZone}
                        newYear={newYear}
                        onCountdownEnd={timeZone => celebrate(timeZone)}
                    />
                :
                    <NewYearEverywhere newYear={newYear} />
                }
                
            </section>
            <section className="countdown-list-section">
                {timeZoneData.remainingTimeZones ?
                    <CountdownList
                        globalTime={globalTime}
                        timeZones={timeZoneData.remainingTimeZones}
                        newYear={newYear}
                        onCountdownEnd={timeZone => celebrate(timeZone)}
                    />
                :
                    <></>
                }
            </section>
            <Footer />
        </div>
    )
}