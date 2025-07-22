import { create } from 'zustand';

interface UIState {
  // Modal states
  authModalOpen: boolean;
  cartDrawerOpen: boolean;
  settingsModalOpen: boolean;
  
  // Loading states
  isLoading: boolean;
  loadingMessage: string;
  
  // Notifications
  notifications: Array<{
    id: string;
    type: 'success' | 'error' | 'warning' | 'info';
    title: string;
    message?: string;
    timestamp: number;
  }>;
  
  // Search and filters
  searchQuery: string;
  activeFilters: Record<string, any>;
  
  // Navigation
  activeNav: string;
  breadcrumbs: Array<{ label: string; href?: string }>;
  
  // Actions
  setAuthModalOpen: (open: boolean) => void;
  setCartDrawerOpen: (open: boolean) => void;
  setSettingsModalOpen: (open: boolean) => void;
  setLoading: (loading: boolean, message?: string) => void;
  addNotification: (notification: Omit<UIState['notifications'][0], 'id' | 'timestamp'>) => void;
  removeNotification: (id: string) => void;
  setSearchQuery: (query: string) => void;
  setActiveFilters: (filters: Record<string, any>) => void;
  setActiveNav: (nav: string) => void;
  setBreadcrumbs: (breadcrumbs: Array<{ label: string; href?: string }>) => void;
}

export const useUIStore = create<UIState>((set, get) => ({
  // Initial state
  authModalOpen: false,
  cartDrawerOpen: false,
  settingsModalOpen: false,
  isLoading: false,
  loadingMessage: '',
  notifications: [],
  searchQuery: '',
  activeFilters: {},
  activeNav: 'dashboard',
  breadcrumbs: [{ label: 'Dashboard' }],

  // Actions
  setAuthModalOpen: (authModalOpen) => set({ authModalOpen }),
  setCartDrawerOpen: (cartDrawerOpen) => set({ cartDrawerOpen }),
  setSettingsModalOpen: (settingsModalOpen) => set({ settingsModalOpen }),
  
  setLoading: (isLoading, loadingMessage = '') => set({ isLoading, loadingMessage }),
  
  addNotification: (notification) => {
    const id = Math.random().toString(36).substring(2, 9);
    const timestamp = Date.now();
    set((state) => ({
      notifications: [
        { ...notification, id, timestamp },
        ...state.notifications
      ].slice(0, 5) // Keep only last 5 notifications
    }));
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
      get().removeNotification(id);
    }, 5000);
  },
  
  removeNotification: (id) => set((state) => ({
    notifications: state.notifications.filter(n => n.id !== id)
  })),
  
  setSearchQuery: (searchQuery) => set({ searchQuery }),
  setActiveFilters: (activeFilters) => set({ activeFilters }),
  setActiveNav: (activeNav) => set({ activeNav }),
  setBreadcrumbs: (breadcrumbs) => set({ breadcrumbs }),
}));