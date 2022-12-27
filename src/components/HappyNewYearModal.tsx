import { useState } from 'react';
import '../css/HappyNewYearModal.scss';
import { TimeZone } from './TimeZone';

interface Props {
    timeZone: TimeZone
    celebrating: boolean
    setCelebrating: (celebrating: boolean) => void
}

export function HappyNewYearModal({ timeZone, celebrating, setCelebrating }: Props) {
    const closeModal = () => {
        setCelebrating(false)
    }

    return <div className={"happy-new-year-modal-wrapper" + (celebrating ? "" : " invisible")} onClick={closeModal}>
        <div className={"happy-new-year-modal" + (celebrating ? "" : " invisible")} onClick={e => e.stopPropagation()}>
            <div className="x-button" onClick={closeModal}>
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