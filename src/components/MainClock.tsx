import '../css/MainClock.scss';
import useFitText from "use-fit-text";

interface Props {
    timeZone: string
}

export function MainClock({ timeZone }: Props) {
    const { fontSize, ref } = useFitText({
        minFontSize: 0,
        resolution: 1
    });

    return <div className="main-clock">
        <div className="main-clock-textfit" ref={ref} style={{ fontSize }}>
            00:45:34    
        </div>
        <div className="main-until">
            Until 2023
        </div>
    </div>
}