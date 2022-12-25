interface Props {
    timeZone: string
}

export function MainCountdown({ timeZone }: Props) {
    return <div className="main-countdown">
        <div className="main-up-next">
            Up next:
        </div>
        <div className="main-time-zone-info">
            <div className="main-time-zone-name">
                { timeZone }
            </div>
        </div>
    </div>
}