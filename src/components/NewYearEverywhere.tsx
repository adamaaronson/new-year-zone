import '../css/NewYearEverywhere.scss';

interface Props {
    newYear: number
}

export function NewYearEverywhere({newYear}: Props) {
    return <div className="new-year-everywhere">
        <h1 className="happy-new-year-title">
            Happy new year!
        </h1>
        <h4 className="happy-new-year-subtitle">
            It's {newYear} everywhere!
        </h4>
    </div>
}