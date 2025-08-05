"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '@/app/context/ThemeContext';
import clsx from 'clsx';

interface AnalyticsChartProps {
  data: Array<{ month: string; value: number }>;
  type: 'revenue' | 'orders';
}

const AnalyticsChart: React.FC<AnalyticsChartProps> = ({ data, type }) => {
  const { theme } = useTheme();
  
  if (!data || data.length === 0) {
    return (
      <div className="h-64 flex items-center justify-center">
        <p className={clsx("text-gray-500", {
          "text-gray-400": theme === "dark"
        })}>
          No data available
        </p>
      </div>
    );
  }

  const maxValue = Math.max(...data.map(item => item.value));
  const formatValue = (value: number) => {
    if (type === 'revenue') {
      return `৳${value.toLocaleString()}`;
    }
    return value.toString();
  };

  return (
    <div className="h-64 flex flex-col">
      {/* Chart Area */}
      <div className="flex-1 flex items-end justify-between gap-2 px-4 py-4">
        {data.map((item, index) => {
          const height = maxValue > 0 ? (item.value / maxValue) * 100 : 0;
          
          return (
            <div key={item.month} className="flex flex-col items-center flex-1">
              <div className="relative w-full flex justify-center mb-2">
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: `${height}%` }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  className={clsx("w-8 sm:w-12 rounded-t-lg relative group cursor-pointer", {
                    "bg-gradient-to-t from-blue-500 to-blue-400": type === 'orders',
                    "bg-gradient-to-t from-green-500 to-green-400": type === 'revenue'
                  })}
                  style={{ minHeight: '4px' }}
                >
                  {/* Tooltip */}
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                    <div className={clsx("px-2 py-1 rounded text-xs font-medium whitespace-nowrap", {
                      "bg-gray-800 text-white": theme === "light",
                      "bg-white text-gray-800": theme === "dark"
                    })}>
                      {formatValue(item.value)}
                    </div>
                  </div>
                </motion.div>
              </div>
              
              {/* Month Label */}
              <span className={clsx("text-xs font-medium", {
                "text-gray-600": theme === "light",
                "text-gray-400": theme === "dark"
              })}>
                {item.month}
              </span>
            </div>
          );
        })}
      </div>

      {/* Legend */}
      <div className="flex items-center justify-center mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-2">
          <div className={clsx("w-3 h-3 rounded", {
            "bg-blue-500": type === 'orders',
            "bg-green-500": type === 'revenue'
          })} />
          <span className={clsx("text-sm font-medium", {
            "text-gray-700": theme === "light",
            "text-gray-300": theme === "dark"
          })}>
            {type === 'revenue' ? 'Monthly Revenue' : 'Monthly Orders'}
          </span>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsChart;