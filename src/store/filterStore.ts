import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

interface FilterState {}

export const useFilterStore = create<FilterState>()(devtools((set) => ({})))
