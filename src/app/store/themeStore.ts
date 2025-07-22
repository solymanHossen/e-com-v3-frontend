import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Theme palette definitions
export const THEME_PALETTES = {
  oceanBlue: {
    name: 'Ocean Blue',
    primary: '221 83% 53%',
    secondary: '213 27% 84%',
    background: '220 27% 98%',
    foreground: '215 25% 27%',
    border: '213 27% 84%',
    accent: '212 100% 47%',
    hover: '221 83% 45%',
    card: '0 0% 100%',
    muted: '210 20% 98%',
  },
  midnightDark: {
    name: 'Midnight Dark',
    primary: '240 6% 90%',
    secondary: '240 4% 16%',
    background: '240 10% 4%',
    foreground: '0 0% 98%',
    border: '240 4% 16%',
    accent: '142 76% 36%',
    hover: '240 6% 80%',
    card: '240 4% 6%',
    muted: '240 4% 8%',
  },
  mintFresh: {
    name: 'Mint Fresh',
    primary: '142 76% 36%',
    secondary: '138 76% 97%',
    background: '138 76% 99%',
    foreground: '138 84% 5%',
    border: '138 76% 90%',
    accent: '142 86% 28%',
    hover: '142 86% 28%',
    card: '0 0% 100%',
    muted: '138 76% 95%',
  },
  elegantPurple: {
    name: 'Elegant Purple',
    primary: '262 83% 58%',
    secondary: '270 50% 98%',
    background: '270 50% 99%',
    foreground: '270 15% 17%',
    border: '270 50% 90%',
    accent: '262 100% 50%',
    hover: '262 83% 50%',
    card: '0 0% 100%',
    muted: '270 50% 95%',
  },
  carbonBlack: {
    name: 'Carbon Black',
    primary: '0 0% 98%',
    secondary: '0 0% 15%',
    background: '0 0% 6%',
    foreground: '0 0% 98%',
    border: '0 0% 15%',
    accent: '47 96% 53%',
    hover: '0 0% 90%',
    card: '0 0% 8%',
    muted: '0 0% 10%',
  },
  arcticWhite: {
    name: 'Arctic White',
    primary: '200 6% 10%',
    secondary: '200 20% 98%',
    background: '0 0% 100%',
    foreground: '200 6% 10%',
    border: '200 20% 90%',
    accent: '195 100% 50%',
    hover: '200 6% 20%',
    card: '0 0% 100%',
    muted: '200 20% 98%',
  },
  modernGray: {
    name: 'Modern Gray',
    primary: '220 9% 46%',
    secondary: '220 14% 96%',
    background: '0 0% 100%',
    foreground: '220 9% 46%',
    border: '220 13% 91%',
    accent: '220 100% 50%',
    hover: '220 9% 36%',
    card: '0 0% 100%',
    muted: '220 14% 96%',
  },
  sunsetOrange: {
    name: 'Sunset Orange',
    primary: '24 95% 53%',
    secondary: '25 95% 97%',
    background: '25 95% 99%',
    foreground: '25 15% 17%',
    border: '25 95% 90%',
    accent: '16 100% 50%',
    hover: '24 95% 43%',
    card: '0 0% 100%',
    muted: '25 95% 95%',
  },
  neonGreen: {
    name: 'Neon Green',
    primary: '120 100% 25%',
    secondary: '120 60% 97%',
    background: '120 60% 99%',
    foreground: '120 100% 5%',
    border: '120 60% 90%',
    accent: '105 100% 50%',
    hover: '120 100% 15%',
    card: '0 0% 100%',
    muted: '120 60% 95%',
  },
  softPeach: {
    name: 'Soft Peach',
    primary: '15 86% 50%',
    secondary: '15 86% 97%',
    background: '15 86% 99%',
    foreground: '15 20% 17%',
    border: '15 86% 90%',
    accent: '340 100% 50%',
    hover: '15 86% 40%',
    card: '0 0% 100%',
    muted: '15 86% 95%',
  },
} as const;

export type ThemePalette = keyof typeof THEME_PALETTES;
export type ThemeMode = 'light' | 'dark' | 'system';
export type LayoutType = 'sidebar-left' | 'sidebar-top' | 'full-width' | 'compact' | 'minimal';
export type BorderRadius = 'square' | 'md' | 'xl';
export type ComponentSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type TypeScale = -1 | 0 | 1 | 2;

interface ThemeState {
  // Theme system
  theme: ThemePalette;
  mode: ThemeMode;
  layout: LayoutType;
  radius: BorderRadius;
  size: ComponentSize;
  glassEffect: boolean;
  typeScale: TypeScale;
  
  // UI state
  sidebarCollapsed: boolean;
  settingsOpen: boolean;
  previewMode: boolean;
  
  // Actions
  setTheme: (theme: ThemePalette) => void;
  setMode: (mode: ThemeMode) => void;
  setLayout: (layout: LayoutType) => void;
  setRadius: (radius: BorderRadius) => void;
  setSize: (size: ComponentSize) => void;
  setGlassEffect: (enabled: boolean) => void;
  setTypeScale: (scale: TypeScale) => void;
  setSidebarCollapsed: (collapsed: boolean) => void;
  setSettingsOpen: (open: boolean) => void;
  setPreviewMode: (enabled: boolean) => void;
  applyTheme: () => void;
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set, get) => ({
      // Default values
      theme: 'oceanBlue',
      mode: 'light',
      layout: 'sidebar-left',
      radius: 'md',
      size: 'md',
      glassEffect: true,
      typeScale: 0,
      sidebarCollapsed: false,
      settingsOpen: false,
      previewMode: false,

      // Actions
      setTheme: (theme) => {
        set({ theme });
        get().applyTheme();
      },
      
      setMode: (mode) => {
        set({ mode });
        get().applyTheme();
      },
      
      setLayout: (layout) => set({ layout }),
      setRadius: (radius) => {
        set({ radius });
        get().applyTheme();
      },
      
      setSize: (size) => {
        set({ size });
        get().applyTheme();
      },
      
      setGlassEffect: (glassEffect) => set({ glassEffect }),
      setTypeScale: (typeScale) => {
        set({ typeScale });
        get().applyTheme();
      },
      
      setSidebarCollapsed: (sidebarCollapsed) => set({ sidebarCollapsed }),
      setSettingsOpen: (settingsOpen) => set({ settingsOpen }),
      setPreviewMode: (previewMode) => set({ previewMode }),

      applyTheme: () => {
        const { theme, mode, radius, size, typeScale } = get();
        const root = document.documentElement;
        const palette = THEME_PALETTES[theme];

        // Apply theme colors
        Object.entries(palette).forEach(([key, value]) => {
          if (key !== 'name') {
            root.style.setProperty(`--theme-${theme}-${key}`, value);
          }
        });

        // Apply current theme to CSS variables
        root.style.setProperty('--background', `var(--theme-${theme}-background)`);
        root.style.setProperty('--foreground', `var(--theme-${theme}-foreground)`);
        root.style.setProperty('--card', `var(--theme-${theme}-card)`);
        root.style.setProperty('--card-foreground', `var(--theme-${theme}-foreground)`);
        root.style.setProperty('--popover', `var(--theme-${theme}-card)`);
        root.style.setProperty('--popover-foreground', `var(--theme-${theme}-foreground)`);
        root.style.setProperty('--primary', `var(--theme-${theme}-primary)`);
        root.style.setProperty('--primary-foreground', theme.includes('dark') || theme === 'carbonBlack' ? `var(--theme-${theme}-background)` : '0 0% 100%');
        root.style.setProperty('--secondary', `var(--theme-${theme}-secondary)`);
        root.style.setProperty('--secondary-foreground', `var(--theme-${theme}-foreground)`);
        root.style.setProperty('--muted', `var(--theme-${theme}-muted)`);
        root.style.setProperty('--muted-foreground', `var(--theme-${theme}-foreground)`);
        root.style.setProperty('--accent', `var(--theme-${theme}-accent)`);
        root.style.setProperty('--accent-foreground', theme.includes('dark') || theme === 'carbonBlack' ? `var(--theme-${theme}-background)` : '0 0% 100%');
        root.style.setProperty('--border', `var(--theme-${theme}-border)`);
        root.style.setProperty('--input', `var(--theme-${theme}-border)`);
        root.style.setProperty('--ring', `var(--theme-${theme}-primary)`);

        // Apply border radius
        const radiusValues = {
          square: '0',
          md: '0.375rem',
          xl: '0.75rem',
        };
        root.style.setProperty('--radius', radiusValues[radius]);

        // Apply type scale
        const scaleMultiplier = 1 + (typeScale * 0.125); // 12.5% per step
        root.style.setProperty('--type-scale', scaleMultiplier.toString());

        // Apply dark/light mode class to document element
        const isDarkMode = mode === 'dark' || (mode === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);
        
        if (isDarkMode) {
          document.documentElement.classList.add('dark');
          document.body.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
          document.body.classList.remove('dark');
        }
      },
    }),
    {
      name: 'theme-storage',
      partialize: (state) => ({
        theme: state.theme,
        mode: state.mode,
        layout: state.layout,
        radius: state.radius,
        size: state.size,
        glassEffect: state.glassEffect,
        typeScale: state.typeScale,
        sidebarCollapsed: state.sidebarCollapsed,
      }),
    }
  )
);

// Initialize theme on load
if (typeof window !== 'undefined') {
  const store = useThemeStore.getState();
  store.applyTheme();
}