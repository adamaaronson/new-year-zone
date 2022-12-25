import '../css/App.scss'
import { CountdownList } from './CountdownList'
import { Header } from './Header'
import { MainCountdown } from './MainCountdown'

export default function App() {
    return (
        <div className="app">
            <div className="app-border"></div>
            <Header />
            <section className="main-countdown-section">
                <MainCountdown timeZone="UTC-6" />
            </section>
            <section className="countdown-list-section">
                <CountdownList />
            </section>
        </div>
    )
}