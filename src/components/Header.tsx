import '../css/Header.scss';

interface Props {
    newYear: number
}

export function Header({ newYear }: Props) {
    return <header className="header">
        <div className="yearname">
            {newYear}
        </div>
        <div className="header-title">
            <div className="header-logo">
                <div className="header-part header-new">
                    New
                </div>
                <div className="header-part header-year">
                    Year
                </div>
                <div className="header-part header-zone">
                    Zone
                </div>
            </div>
            <div className="subtitle">
                <div className="subtitle-row subtitle-row-1">
                    Countdown to {newYear}
                </div>
                <div className="subtitle-row subtitle-row-2">
                    in every time zone
                </div>
            </div>
        </div>
    </header>
}