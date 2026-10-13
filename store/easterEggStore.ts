import { create } from 'zustand'

export type EasterEgg = 'hello' | 'action'
export const useEasterEggStore = create<{
  active: EasterEgg | null
  show: (egg: EasterEgg) => void
  close: () => void
}>((set) => ({
  active: null,
  show: (active) => set({ active }),
  close: () => set({ active: null }),
}))
