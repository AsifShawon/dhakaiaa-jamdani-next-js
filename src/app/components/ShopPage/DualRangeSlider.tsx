"use client";
import { useCallback, useEffect, useState, useRef, Suspense } from "react";
import { useRouter, useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from "framer-motion";

// Utility function for debouncing
function debounce<T extends (...args: any[]) => void>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

// Format currency with commas
const formatCurrency = (value: number): string => {
  return value.toLocaleString('en-BD');
};

const DualRangeSliderComp = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // Configuration
  const min = 0;
  const max = 10000;
  const step = 100;
  
  // State management
  const [minVal, setMinVal] = useState(parseInt(searchParams.get('minPrice') || '0'));
  const [maxVal, setMaxVal] = useState(parseInt(searchParams.get('maxPrice') || '10000'));
  const [inputMin, setInputMin] = useState(minVal.toString());
  const [inputMax, setInputMax] = useState(maxVal.toString());
  const [isDragging, setIsDragging] = useState(false);
  const [activeThumb, setActiveThumb] = useState<'min' | 'max' | null>(null);
  
  // Refs
  const minValRef = useRef(minVal);
  const maxValRef = useRef(maxVal);
  const rangeRef = useRef<HTMLDivElement>(null);

  // Calculate percentage for positioning
  const getPercent = useCallback(
    (value: number) => Math.round(((value - min) / (max - min)) * 100),
    [min, max]
  );

  // Update URL with new price range
  const updateURL = useCallback((minPrice: number, maxPrice: number) => {
    const debouncedUpdate = debounce((min: number, max: number) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set('minPrice', min.toString());
      params.set('maxPrice', max.toString());
      router.push('?' + params.toString(), { scroll: false });
    }, 300);
    
    debouncedUpdate(minPrice, maxPrice);
  }, [searchParams, router]);

  // Update slider visual position
  useEffect(() => {
    const minPercent = getPercent(minVal);
    const maxPercent = getPercent(maxVal);

    if (rangeRef.current) {
      rangeRef.current.style.left = `${minPercent}%`;
      rangeRef.current.style.width = `${maxPercent - minPercent}%`;
    }
  }, [minVal, maxVal, getPercent]);

  // Sync refs with state
  useEffect(() => {
    minValRef.current = minVal;
    maxValRef.current = maxVal;
  }, [minVal, maxVal]);

  // Handle minimum slider change
  const handleMinChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.min(Number(event.target.value), maxVal - step);
    setMinVal(value);
    setInputMin(value.toString());
    updateURL(value, maxVal);
  };

  // Handle maximum slider change
  const handleMaxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.max(Number(event.target.value), minVal + step);
    setMaxVal(value);
    setInputMax(value.toString());
    updateURL(minVal, value);
  };

  // Handle input field changes
  const handleMinInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, ''); // Only allow numbers
    setInputMin(value);
  };

  const handleMaxInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, ''); // Only allow numbers
    setInputMax(value);
  };

  // Handle input field blur (when user finishes editing)
  const handleMinInputBlur = () => {
    let value = Number(inputMin) || min;
    value = Math.max(min, Math.min(value, maxVal - step));
    setMinVal(value);
    setInputMin(value.toString());
    updateURL(value, maxVal);
  };

  const handleMaxInputBlur = () => {
    let value = Number(inputMax) || max;
    value = Math.min(max, Math.max(value, minVal + step));
    setMaxVal(value);
    setInputMax(value.toString());
    updateURL(minVal, value);
  };

  // Handle mouse events for better UX
  const handleMouseDown = (thumb: 'min' | 'max') => {
    setIsDragging(true);
    setActiveThumb(thumb);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setActiveThumb(null);
  };

  useEffect(() => {
    const handleGlobalMouseUp = () => {
      setIsDragging(false);
      setActiveThumb(null);
    };

    if (isDragging) {
      document.addEventListener('mouseup', handleGlobalMouseUp);
      return () => document.removeEventListener('mouseup', handleGlobalMouseUp);
    }
  }, [isDragging]);

  return (
    <div className="w-full max-w-md mx-auto p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700">
      <div className="space-y-6">
        {/* Header */}
        <div className="text-center">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            Price Range
          </h3>
          <div className="flex items-center justify-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
            <span>৳{formatCurrency(minVal)}</span>
            <span>-</span>
            <span>৳{formatCurrency(maxVal)}</span>
          </div>
        </div>

        {/* Input Fields */}
        <div className="flex items-center justify-between space-x-4">
          <div className="flex-1">
            <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-2">
              Minimum
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400 text-sm">
                ৳
              </span>
              <input
                type="text"
                value={inputMin}
                onChange={handleMinInputChange}
                onBlur={handleMinInputBlur}
                className="w-full pl-8 pr-3 py-2.5 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-sm font-medium text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200"
                placeholder="0"
              />
            </div>
          </div>

          <div className="flex-shrink-0 pt-6">
            <div className="w-8 h-px bg-gray-300 dark:bg-gray-600"></div>
          </div>

          <div className="flex-1">
            <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-2">
              Maximum
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400 text-sm">
                ৳
              </span>
              <input
                type="text"
                value={inputMax}
                onChange={handleMaxInputChange}
                onBlur={handleMaxInputBlur}
                className="w-full pl-8 pr-3 py-2.5 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-sm font-medium text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200"
                placeholder="10000"
              />
            </div>
          </div>
        </div>

        {/* Slider Container */}
        <div className="relative py-6">
          {/* Track */}
          <div className="relative h-2 bg-gray-200 dark:bg-gray-700 rounded-full">
            {/* Active Range */}
            <motion.div
              ref={rangeRef}
              className="absolute h-2 bg-gradient-to-r from-red-500 to-orange-500 rounded-full shadow-sm"
              initial={false}
              animate={{
                left: `${getPercent(minVal)}%`,
                width: `${getPercent(maxVal) - getPercent(minVal)}%`,
              }}
              transition={{ duration: 0.1 }}
            />
          </div>

          {/* Minimum Range Input */}
          <input
            type="range"
            min={min}
            max={max}
            step={step}
            value={minVal}
            onChange={handleMinChange}
            onMouseDown={() => handleMouseDown('min')}
            onMouseUp={handleMouseUp}
            className="absolute top-0 h-2 w-full appearance-none bg-transparent cursor-pointer slider-thumb"
            style={{
              zIndex: activeThumb === 'min' ? 2 : 1,
            }}
          />

          {/* Maximum Range Input */}
          <input
            type="range"
            min={min}
            max={max}
            step={step}
            value={maxVal}
            onChange={handleMaxChange}
            onMouseDown={() => handleMouseDown('max')}
            onMouseUp={handleMouseUp}
            className="absolute top-0 h-2 w-full appearance-none bg-transparent cursor-pointer slider-thumb"
            style={{
              zIndex: activeThumb === 'max' ? 2 : 1,
            }}
          />

          {/* Thumb indicators */}
          <div
            className="absolute top-1/2 transform -translate-y-1/2 -translate-x-1/2 w-5 h-5 bg-white dark:bg-gray-800 border-2 border-red-500 rounded-full shadow-md cursor-pointer transition-all duration-200 hover:scale-110"
            style={{ left: `${getPercent(minVal)}%`, zIndex: activeThumb === 'min' ? 3 : 2 }}
          >
            <AnimatePresence>
              {activeThumb === 'min' && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 text-xs px-2 py-1 rounded font-medium"
                >
                  ৳{formatCurrency(minVal)}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div
            className="absolute top-1/2 transform -translate-y-1/2 -translate-x-1/2 w-5 h-5 bg-white dark:bg-gray-800 border-2 border-red-500 rounded-full shadow-md cursor-pointer transition-all duration-200 hover:scale-110"
            style={{ left: `${getPercent(maxVal)}%`, zIndex: activeThumb === 'max' ? 3 : 2 }}
          >
            <AnimatePresence>
              {activeThumb === 'max' && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 text-xs px-2 py-1 rounded font-medium"
                >
                  ৳{formatCurrency(maxVal)}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Quick Select Buttons */}
        <div className="flex flex-wrap gap-2 justify-center">
          {[
            { label: 'Under ৳1K', min: 0, max: 1000 },
            { label: '৳1K-5K', min: 1000, max: 5000 },
            { label: '৳5K-10K', min: 5000, max: 10000 },
            { label: 'All', min: 0, max: 10000 },
          ].map((preset) => (
            <button
              key={preset.label}
              onClick={() => {
                setMinVal(preset.min);
                setMaxVal(preset.max);
                setInputMin(preset.min.toString());
                setInputMax(preset.max.toString());
                updateURL(preset.min, preset.max);
              }}
              className={`px-3 py-1.5 text-xs font-medium rounded-full transition-all duration-200 ${
                minVal === preset.min && maxVal === preset.max
                  ? 'bg-red-500 text-white shadow-md'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              {preset.label}
            </button>
          ))}
        </div>
      </div>

      {/* Custom Styles */}
      <style jsx>{`
        .slider-thumb::-webkit-slider-thumb {
          appearance: none;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: transparent;
          cursor: pointer;
          border: none;
          pointer-events: auto;
        }
        
        .slider-thumb::-moz-range-thumb {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: transparent;
          cursor: pointer;
          border: none;
          pointer-events: auto;
        }
      `}</style>
    </div>
  );
};

const DualRangeSlider = () => {
  return (
    <Suspense fallback={
      <div className="w-full max-w-md mx-auto p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700">
        <div className="animate-pulse space-y-6">
          <div className="text-center">
            <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-32 mx-auto mb-2"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-24 mx-auto"></div>
          </div>
          <div className="flex space-x-4">
            <div className="flex-1">
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-16 mb-2"></div>
              <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded"></div>
            </div>
            <div className="flex-1">
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-16 mb-2"></div>
              <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded"></div>
            </div>
          </div>
          <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded"></div>
        </div>
      </div>
    }>
      <DualRangeSliderComp />
    </Suspense>
  );
};

export default DualRangeSlider;