'use client'

import { twMerge } from 'tailwind-merge'
import { motion } from 'framer-motion'

interface TooltipProps {
  description: string
  customClassname?: string
}

export default function Tooltip({ description, customClassname }: TooltipProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: -10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95, y: -10 }}
      transition={{ type: 'spring', damping: 25, stiffness: 300 }}
      className={twMerge(
        'desktop:w-[480px] tablet:w-[480px] absolute top-10 left-10 z-50 w-[280px]',
        'text-gray5 kr-badge-md border-gray2 rounded-[8px] border bg-white p-4 shadow-lg',
        customClassname
      )}
      onClick={(e) => e.stopPropagation()}
    >
      <p className="leading-relaxed whitespace-pre-line">{description}</p>

      <div className="border-gray2 absolute -top-1 left-4 h-2 w-2 rotate-45 border-t border-l bg-white" />
    </motion.div>
  )
}
