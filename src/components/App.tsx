import '../css/App.scss'
import { CountdownList } from './CountdownList'
import { Header } from './Header'
import { MainCountdown } from './MainCountdown'

export default function App() {
    return (
        <div className="app">
            <Header />
            <section className="main-countdown-section">
                <MainCountdown timeZone="UTC-5" />
            </section>
            <section className="countdown-list-section">
                <CountdownList />
            </section>
        </div>
    )
}