import { create } from 'zustand'
import type { ContactKind } from '@/core/registries/contact'

/** Visitor details live only in memory, never in localStorage or IndexedDB. */
export const useContactDraftStore = create<{
  kind: ContactKind
  values: Record<string, string>
  status: 'idle' | 'sending' | 'sent'
  error: string
  setKind: (kind: ContactKind) => void
  setField: (name: string, value: string) => void
  setStatus: (status: 'idle' | 'sending' | 'sent') => void
  setError: (error: string) => void
  clear: () => void
}>((set) => ({
  kind: 'company',
  values: {},
  status: 'idle',
  error: '',
  setKind: (kind) =>
    set((s) =>
      s.kind === kind ? s : { kind, error: '', values: { ...s.values, opportunity: '' } }
    ),
  setField: (name, value) => set((s) => ({ values: { ...s.values, [name]: value } })),
  setStatus: (status) => set({ status }),
  setError: (error) => set({ error }),
  clear: () => set({ kind: 'company', values: {}, status: 'idle', error: '' }),
}))
