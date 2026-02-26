'use client'

import { useEffect } from 'react'
import { motion } from 'framer-motion'

import { Toast } from '@/components/common/toast/ToastContext'
import { AlertErrorIcon, AlertSuccessIcon, WhiteXIcon } from '@/assets/svgComponents'

interface ToastItemProps {
  toast: Toast
  onClose: () => void
}

export default function ToastItem({ toast, onClose }: ToastItemProps) {
  useEffect(() => {
    if (!toast.duration || toast.duration <= 0) return

    const timer = setTimeout(onClose, toast.duration)
    return () => clearTimeout(timer)
  }, [toast.duration, onClose])

  const typeClass = {
    success: 'bg-main-500',
    error: 'bg-error',
  }[toast.type]

  const icon = {
    success: <AlertSuccessIcon width={20} height={20} />,
    error: <AlertErrorIcon width={20} height={20} />,
  }[toast.type]

  return (
    <motion.div
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 100 }}
      transition={{
        type: 'tween',
        duration: 0.3,
        ease: 'easeOut',
      }}
      className={`${typeClass} flex w-[335px] justify-between rounded-[8px] p-4`}
      role="alert"
    >
      <div className="flex gap-x-2">
        <span className="mt-1">{icon}</span>

        <div className="flex flex-col">
          <span className="kr-subtitle-lg text-white">{toast.title}</span>
          {toast.description && <span className="kr-body-md text-white">{toast.description}</span>}
        </div>
      </div>

      <button onClick={onClose} className="transition-opacity hover:opacity-75">
        <WhiteXIcon width={24} height={24} />
      </button>
    </motion.div>
  )
}
