import '../css/App.scss'
import { CountdownList } from './CountdownList'
import { Header } from './Header'
import { MainDescription } from './MainDescription'
import { MainClock } from './MainClock'

export default function App() {
    return (
        <div className="app">
            <div className="app-border"></div>
            <Header />
            <section className="main-countdown-section">
                <MainDescription timeZone="UTC-5" />
            </section>
            <section className="main-clock-section">
                <MainClock timeZone="UTC-5" />
            </section>
            <section className="countdown-list-section">
                <CountdownList />
            </section>
        </div>
    )
}