import { useState } from 'react';
import '../css/HappyNewYearModal.scss';
import { TimeZone } from './TimeZone';

interface Props {
    timeZone: TimeZone
}

export function HappyNewYearModal({ timeZone }: Props) {
    const [visible, setVisible] = useState(true);

    return <div className={"happy-new-year-modal-wrapper" + (visible ? "" : " invisible")} onClick={() => setVisible(false)}>
        <div className={"happy-new-year-modal" + (visible ? "" : " invisible")} onClick={e => e.stopPropagation()}>
            <div className="x-button" onClick={() => setVisible(false)}>
                X
            </div>
            <h1 className="happy-new-year-title">
                Happy new year!
            </h1>
            <h2 className="happy-new-year-subtitle">
                in {timeZone.locations.join(' / ')}
            </h2>
        </div>
    </div>
}