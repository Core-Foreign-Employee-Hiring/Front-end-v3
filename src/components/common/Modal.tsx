'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { Spacing } from '@/components/common/index'
import { twMerge } from 'tailwind-merge'

interface ModalProps {
  isOpen: boolean
  onClose?: () => void
  children: ReactNode
  customClassName?: string // 넓이 같은 경우는 매번 달라져서 props로 받음
  mobileHidden?: boolean
}

export default function Modal({ isOpen, onClose, children, customClassName, mobileHidden = true }: ModalProps) {
  if (typeof window === 'undefined') return null

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <div
          className={`${mobileHidden ? 'hidden' : ''} desktop:flex tablet:flex fixed inset-0 z-60 flex items-center justify-center p-4`}
        >
          {/* 배경 오버레이 */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose && onClose}
            className="fixed inset-0 bg-[rgba(0,0,0,0.3)]"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className={twMerge('bg-gray1 relative z-10 w-[508px] w-full rounded-[20px] p-6 shadow-xl', customClassName)}
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

Modal.Header = function ModalHeader({ children, rightElement }: { children: ReactNode; rightElement?: ReactNode }) {
  return (
    <div>
      <div className="flex items-center justify-between">
        {children}
        {rightElement}
      </div>
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
  return <div className="flex w-full gap-x-3">{children}</div>
}
