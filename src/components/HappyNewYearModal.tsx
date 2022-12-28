import { AnimatePresence, motion } from "framer-motion";
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
        <video autoPlay muted loop className="fireworks" src="fireworks.mp4" />
        <AnimatePresence>
            {celebrating && 
                <motion.div
                    className="happy-new-year-modal"
                    onClick={(e: React.MouseEvent<HTMLElement>) => e.stopPropagation()}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}>
                    <div className="x-button" onClick={closeModal}>
                        X
                    </div>
                    <h1 className="happy-new-year-title">
                        Happy new year!
                    </h1>
                    <h2 className="happy-new-year-subtitle">
                        in {timeZone.locations.join(' / ')}
                    </h2>
                </motion.div>
            }
        </AnimatePresence>
    </div>
}