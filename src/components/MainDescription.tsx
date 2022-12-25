import '../css/MainDescription.scss';

interface Props {
    timeZone: string
}

export function MainDescription({ timeZone }: Props) {
    return <div className="main-countdown">
        <div className="up-next">
            Up next:
        </div>
        <div className="main-time-zone-info">
            <span className="main-time-zone-name">
                { timeZone }
            </span>
            <span className="main-time-zone-locations">
                Mexico City, Chicago, Dallas
            </span>
        </div>
    </div>
}