import '../css/App.scss'
import { CountdownList } from './CountdownList'
import timezones from "../data/timezones.json"
import { Header } from './Header'
import { CountdownMain } from './CountdownMain'
import { useState } from 'react'
import { getNewYearInTimeZone } from './Countdown'

// function getSoonestTimeZone() {
//     const now = Date.now()
//     getNewYearInTimeZone
// }

export default function App() {
    const [mainTimeZone, setMainTimeZone] = useState(getSoonestTimeZone())
    return (
        <div className="app">
            <div className="app-border"></div>
            <Header />
            <section className="main-countdown-section">
                <CountdownMain timeZone={timezones[0]} />
            </section>
            <section className="countdown-list-section">
                <CountdownList />
            </section>
        </div>
    )
}