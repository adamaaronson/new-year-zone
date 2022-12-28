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
        <AnimatePresence>
            {celebrating && <>
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1}}
                    exit={{ opacity: 0 }}>
                    <video autoPlay muted loop className="fireworks" src="fireworks.mp4" />
                </motion.div>
                <motion.div
                    className="happy-new-year-modal"
                    onClick={(e: React.MouseEvent<HTMLElement>) => e.stopPropagation()}
                    initial={{ scale: 0, rotate: "0deg" }}
                    animate={{ scale: 1, rotate: "-2deg" }}
                    exit={{ scale: 0, rotate: "0deg" }}
                    transition={{ ease: "easeInOut", duration: 0.3 }}>
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
                </>
            }
        </AnimatePresence>
    </div>
}