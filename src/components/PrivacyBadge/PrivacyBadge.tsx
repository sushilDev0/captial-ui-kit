import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { EyeOff, Eye, Lock } from 'lucide-react';
import type { PrivacyBadgeProps } from './PrivacyBadge.types';


export const PrivacyBadge: React.FC<PrivacyBadgeProps> = ({
    sensitiveNumber,
    label,
    maskPattern = 'last4' }) => {

    const [isMasked, setIsMasked] = useState(true);

    const formatInGroupsOfFour = (str: string) => {
        // Strip out existing spaces, then chunk every 1-4 digits
        const cleanStr = str.replace(/\s+/g, '');
        return cleanStr.match(/.{1,4}/g)?.join(' ') || str;
    };

    const getMaskedDisplay = () => {
        if (maskPattern === 'all') {
            return '****  **** **** ****';
        }
        const last4 = sensitiveNumber.slice(-4);
        return `**** **** **** ${last4}`;
    }

    const toggleLabel = isMasked ? `Reveal ${label}` : `Hide ${label}`;

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="inline-flex w-full max-w-sm flex-col gap-1.5 rounded-2xl border border-slate-800 bg-slate-900/80 p-4 shadow-lg backdrop-blur-sm">

            <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-1.5 text-slate-400">
                    <Lock size={14} className="text-emerald-500" />
                    <span className="text-xs font-medium tracking-wide uppercase">{label}</span>

                </div>



                <button onClick={() => setIsMasked((prev) => !prev)} className="rounded-full p-1.5 text-slate-500 hover:bg-slate-800 hover:text-emerald-400 transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
                    aria-label={toggleLabel}
                    title={toggleLabel}>
                    {isMasked ? <Eye size={16} /> : <EyeOff size={16} />}
                </button>
            </div>


            <div className="relative h-9 w-full overflow-hidden flex items-center">
                <AnimatePresence mode="wait" initial={false}>
                    {isMasked ? (
                        /* MASKED STATE */
                        <motion.span
                            key="masked"
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -15 }}
                            transition={{ type: "spring", stiffness: 350, damping: 25 }}
                            className="absolute text-2xl font-mono font-black tracking-widest text-slate-600 select-none"
                        >
                            {getMaskedDisplay()}
                        </motion.span>
                    ) : (
                        /* REVEALED STATE */
                        <motion.span
                            key="revealed"
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -15 }}
                            transition={{ type: "spring", stiffness: 350, damping: 25 }}
                            className="absolute text-2xl font-mono font-medium tracking-tight text-slate-50 tabular-nums"
                        >
                            {formatInGroupsOfFour(sensitiveNumber)}
                        </motion.span>
                    )}
                </AnimatePresence>
            </div>
        </motion.div>
    )

}





export default PrivacyBadge