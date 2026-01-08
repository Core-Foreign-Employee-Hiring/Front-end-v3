'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { Spacing } from '@/components/common/index'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  children: ReactNode
}

export default function Modal({ isOpen, onClose, children }: ModalProps) {
  if (typeof window === 'undefined') return null

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4">
          {/* 배경 오버레이 */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-[rgba(0,0,0,0.3)]"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="bg-gray1 relative z-10 w-full max-w-[860px] rounded-[20px] p-6 shadow-xl"
            onClick={(e) => e.stopPropagation()} // 내부 클릭 시 닫힘 방지
          >
            {children}
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  )
}

Modal.Header = function ModalHeader({ children }: { children: ReactNode }) {
  return (
    <div>
      {children}
      <Spacing height={32} />
    </div>
  )
}

Modal.Body = function ModalBody({ children }: { children: ReactNode }) {
  return (
    <div>
      {children}
      <Spacing height={32} />
    </div>
  )
}

Modal.Footer = function ModalFooter({ children }: { children: ReactNode }) {
  return <div>{children}</div>
}
