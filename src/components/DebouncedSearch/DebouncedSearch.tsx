import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Search, X, Loader2 } from "lucide-react";
import { useDebounce } from "./useDebounce";
import type { DebouncedSearchProps } from "./DebouncedSearch.types";

export const DebouncedSearch: React.FC<DebouncedSearchProps> = ({
  onSearch,
  delay = 300,
  isLoading = false,
  enableShortcut = true,
  placeholder = "Search assets or transactions...",
  className = "",
  ...restProps
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedValue = useDebounce(searchTerm, delay);
  const inputRef = useRef<HTMLInputElement>(null);

  // 1. Fire onSearch callback when debounced value changes
  useEffect(() => {
    onSearch(debouncedValue);
  }, [debouncedValue, onSearch]);

  // 2. Global Keyboard Shortcut Handler (Cmd+K or Ctrl+K)
  useEffect(() => {
    if (!enableShortcut) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [enableShortcut]);

  const handleClear = () => {
    setSearchTerm("");
    inputRef.current?.focus();
  };

  return (
    <div className={`relative w-full max-w-sm ${className}`}>
      <div className="relative flex items-center">
        {/* Search Icon */}
        <div className="absolute left-3.5 pointer-events-none text-slate-500 flex items-center justify-center">
          <Search size={16} />
        </div>

        {/* Input Element */}
        <input
          ref={inputRef}
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder={placeholder}
          className="w-full rounded-2xl border border-slate-800 bg-slate-900/80 py-2.5 pl-10 pr-20 text-sm text-slate-100 placeholder-slate-500 shadow-lg backdrop-blur-sm transition-colors focus:border-emerald-500/50 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
          {...restProps}
        />

        {/* Right-aligned Actions & Shortcuts */}
        <div className="absolute right-3 flex items-center gap-1.5">
          <AnimatePresence mode="wait">
            {isLoading ? (
              <motion.div
                key="loading"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.15 }}
                className="text-emerald-500 animate-spin flex items-center"
              >
                <Loader2 size={16} />
              </motion.div>
            ) : searchTerm ? (
              <motion.button
                key="clear"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.15 }}
                type="button"
                onClick={handleClear}
                className="rounded-full p-1 text-slate-500 hover:bg-slate-800 hover:text-slate-200 transition-colors focus:outline-none"
                aria-label="Clear search input"
              >
                <X size={14} />
              </motion.button>
            ) : enableShortcut ? (
              <motion.kbd
                key="shortcut"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="hidden sm:inline-flex items-center rounded border border-slate-800 bg-slate-950 px-1.5 py-0.5 text-[10px] font-mono text-slate-500 select-none pointer-events-none"
              >
                ⌘K
              </motion.kbd>
            ) : null}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default DebouncedSearch;