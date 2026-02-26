'use client'

import { useContext, useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import ToastItem from './ToastItem'
import { ToastContext } from '@/components/common/toast/ToastContext'

export default function ToastContainer() {
  const context = useContext(ToastContext)
  const [isHydrated, setIsHydrated] = useState(false)

  useEffect(() => {
    setIsHydrated(true)
  }, [])

  if (!context || !isHydrated) return null

  return (
    <div className="pointer-events-none fixed top-[60px] left-1/2 z-50 flex -translate-x-1/2 flex-col items-center gap-2">
      <AnimatePresence>
        {context.toasts.map((toast) => (
          <motion.div
            layout // 레이아웃 변화를 부드럽게 만들기 위해 추가 권장
            key={toast.id}
            className="pointer-events-auto contents"
          >
            <ToastItem toast={toast} onClose={() => context.removeToast(toast.id)} />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}
