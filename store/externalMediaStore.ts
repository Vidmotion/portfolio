import { create } from 'zustand'

// Opt-in per visit. Never persist consent or load third parties before a choice.
export const useExternalMediaStore = create<{
  spotify: boolean
  setSpotify: (enabled: boolean) => void
}>((set) => ({
  spotify: false,
  setSpotify: (spotify) => set({ spotify }),
}))
