import React, { useEffect } from 'react';
import { motion, useSpring, useTransform } from "motion/react";
import { TrendingUp, TrendingDown } from "lucide-react";
import type { CurrencyCounterProps } from "./CurrencyCounter.types";

export const CurrencyCounter: React.FC<CurrencyCounterProps> = ({
  value,
  currency = "INR",
  locale = "en-IN",
  label = "Total Balance",
  trendPercentage
}) => {

  const springValue = useSpring(0, {
    stiffness: 60,
    damping: 18,
    mass: 1
  });

  useEffect(() => {
    springValue.set(value);
  }, [value, springValue]);

  const displayValue = useTransform(springValue, (latest) =>
    new Intl.NumberFormat(locale, {
      style: 'currency',
      currency,
      maximumFractionDigits: 2,
    }).format(latest)
  );

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="inline-flex w-full max-w-sm flex-col gap-1 rounded-2xl border border-slate-800 bg-slate-900/80 p-5 shadow-lg backdrop-blur-sm"
    >
      {label && (
        <span className="text-xs font-medium tracking-wide uppercase text-slate-400">
          {label}
        </span>
      )}

      <div className="flex items-baseline justify-between gap-2 mt-1">
        <motion.span className="text-3xl font-bold tracking-tight text-slate-50 font-mono tabular-nums">
          {displayValue}
        </motion.span>

        {trendPercentage !== undefined && (
          <div
            className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-semibold ${
              trendPercentage >= 0
                ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                : "bg-rose-500/10 text-rose-400 border border-rose-500/20"
            }`}
          >
            {trendPercentage >= 0 ? (
              <TrendingUp size={12} />
            ) : (
              <TrendingDown size={12} />
            )}
            <span>
              {trendPercentage >= 0 ? `+${trendPercentage}%` : `${trendPercentage}%`}
            </span>
          </div> 
        )}
      </div> 
    </motion.div>
  );
};

export default CurrencyCounter;