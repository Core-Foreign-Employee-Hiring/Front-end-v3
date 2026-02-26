'use client'

import { createContext, useCallback, useContext, useState } from 'react'

export type ToastType = 'success' | 'error'

export interface Toast {
  id: string
  type: ToastType
  title: string
  description: string | undefined
  duration?: number
}

interface ToastContextType {
  toasts: Toast[]
  addToast: (title: string, type: ToastType, description?: string, duration?: number) => void
  removeToast: (id: string) => void
}

export const ToastContext = createContext<ToastContextType | undefined>(undefined)

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([])

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id))
  }, [])

  const addToast = useCallback((title: string, type: ToastType, description?: string, duration = 3000) => {
    const id = Date.now().toString()
    const toast: Toast = { id, title, description, type, duration }

    setToasts((prev) => [...prev, toast])

    if (duration > 0) {
      setTimeout(() => {
        removeToast(id)
      }, duration)
    }
  }, [])

  return <ToastContext.Provider value={{ toasts, addToast, removeToast }}>{children}</ToastContext.Provider>
}

export function useToast() {
  const context = useContext(ToastContext)
  if (!context) {
    throw new Error('useToast must be used within ToastProvider')
  }

  return {
    success: (title: string, description?: string) => context.addToast(title, 'success', description),
    error: (title: string, description?: string) => context.addToast(title, 'error', description),
  }
}
