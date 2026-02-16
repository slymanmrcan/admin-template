import { create } from "zustand"

type UIState = {
  sidebarOpen: boolean
  isPageLoading: boolean
  activeModal: string | null
}

type UIActions = {
  toggleSidebar: () => void
  setSidebarOpen: (open: boolean) => void
  setPageLoading: (loading: boolean) => void
  openModal: (modalId: string) => void
  closeModal: () => void
}

export const useUIStore = create<UIState & UIActions>((set) => ({
  // State
  sidebarOpen: true,
  isPageLoading: false,
  activeModal: null,

  // Actions
  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
  setSidebarOpen: (sidebarOpen) => set({ sidebarOpen }),
  setPageLoading: (isPageLoading) => set({ isPageLoading }),
  openModal: (modalId) => set({ activeModal: modalId }),
  closeModal: () => set({ activeModal: null }),
}))
