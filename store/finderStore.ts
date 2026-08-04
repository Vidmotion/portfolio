import { create } from 'zustand'
import type { ProjectCategory, FinderViewMode, FinderSortBy, FinderSortOrder } from '@/types'

interface FinderStore {
  currentCategory: ProjectCategory | null
  selectedProjectId: string | null
  viewMode: FinderViewMode
  sortBy: FinderSortBy
  sortOrder: FinderSortOrder
  searchQuery: string
  history: Array<ProjectCategory | null>
  historyIndex: number

  setCategory: (category: ProjectCategory | null) => void
  selectProject: (id: string | null) => void
  setViewMode: (mode: FinderViewMode) => void
  setSortBy: (sortBy: FinderSortBy) => void
  setSortOrder: (order: FinderSortOrder) => void
  setSearchQuery: (query: string) => void
  goBack: () => void
  goForward: () => void
  canGoBack: () => boolean
  canGoForward: () => boolean
}

export const useFinderStore = create<FinderStore>((set, get) => ({
  currentCategory: null,
  selectedProjectId: null,
  viewMode: 'grid',
  sortBy: 'date',
  sortOrder: 'desc',
  searchQuery: '',
  history: [null],
  historyIndex: 0,

  setCategory: (category) => {
    const { history, historyIndex } = get()
    const newHistory = [...history.slice(0, historyIndex + 1), category]
    set({
      currentCategory: category,
      selectedProjectId: null,
      searchQuery: '',
      history: newHistory,
      historyIndex: newHistory.length - 1,
    })
  },

  selectProject: (id) => set({ selectedProjectId: id }),

  setViewMode: (mode) => set({ viewMode: mode }),

  setSortBy: (sortBy) => set({ sortBy }),

  setSortOrder: (order) => set({ sortOrder: order }),

  setSearchQuery: (query) => set({ searchQuery: query }),

  goBack: () => {
    const { history, historyIndex } = get()
    if (historyIndex <= 0) return
    const prev = history[historyIndex - 1]
    set({ currentCategory: prev, historyIndex: historyIndex - 1 })
  },

  goForward: () => {
    const { history, historyIndex } = get()
    if (historyIndex >= history.length - 1) return
    const next = history[historyIndex + 1]
    set({ currentCategory: next, historyIndex: historyIndex + 1 })
  },

  canGoBack: () => get().historyIndex > 0,
  canGoForward: () => get().historyIndex < get().history.length - 1,
}))
