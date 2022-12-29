import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import '../css/HappyNewYearModal.scss';
import { isLocalTimeZone } from "./Countdown";
import { TimeZone } from './TimeZone';

interface Props {
    timeZone: TimeZone
    celebrating: boolean
    setCelebrating: (celebrating: boolean) => void
}

const AUTO_CLOSE_MILLISECONDS = 5 * 60 * 1000 // 5 minutes
const COPIED_MILLISECONDS = 2 * 1000 // 2 seconds

export function HappyNewYearModal({ timeZone, celebrating, setCelebrating }: Props) {
    const [copied, setCopied] = useState(false);
    const closeModal = () => {
        setCelebrating(false)
    }

    useEffect(() => {
        if (celebrating) {
            setTimeout(() => {
                if (celebrating) {
                    closeModal()
                }
            }, AUTO_CLOSE_MILLISECONDS)
        }
    }, [celebrating])

    useEffect(() => {
        if (copied) {
            setTimeout(() => {
                setCopied(false)
            }, COPIED_MILLISECONDS)
        }
    }, [copied])

    function share(timeZone: TimeZone) {
        const text = `I celebrated the New Year in ${timeZone.locations.join(' / ')} on New Year Zone! See who's up next! https://newyear.zone`

        if ("share" in navigator) {
            // can use Web Share API
            navigator.share({
                text: text
            })
        } else {
            // fallback
            window.navigator.clipboard.writeText(text);
            setCopied(true);
        }
    }

    return <AnimatePresence>{celebrating && 
        <div className={"happy-new-year-modal-wrapper"} onClick={closeModal}>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1}}
                exit={{ opacity: 0 }}
                transition={{ ease: "easeInOut", duration: 0.3 }}>
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
                {!isLocalTimeZone(timeZone) &&
                    <h2 className="happy-new-year-subtitle">
                        in {timeZone.locations.join(' / ')}
                    </h2>
                }
                <button className="share-button" onClick={() => share(timeZone)}>
                    <i className="fa fa-share-square"></i><span className="share">{copied ? "Copied" : "Share"}</span>
                </button>
            </motion.div>
        </div>
    }</AnimatePresence>
}