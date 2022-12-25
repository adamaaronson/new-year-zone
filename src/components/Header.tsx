import '../css/Header.scss';

export function Header() {
    return <header className="header">
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
    </header>
}