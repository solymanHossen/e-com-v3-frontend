'use client';

import { useState } from 'react';

export default function ThemeController() {
  const [currentTheme, setCurrentTheme] = useState('default');

  const updateThemeVariable = (variable: string, value: string) => {
    document.documentElement.style.setProperty(`--color-${variable}`, value);
  };

  const presetThemes = {
    default: {
      primary: '#5cb85c',
      secondary: '#fff',
      success: '#5cb85c',
      warning: '#f0ad4e',
    },
    dark: {
      primary: '#2563eb',
      secondary: '#1f2937',
      success: '#10b981',
      warning: '#f59e0b',
    },
    purple: {
      primary: '#8b5cf6',
      secondary: '#f3f4f6',
      success: '#059669',
      warning: '#d97706',
    },
    ocean: {
      primary: '#0ea5e9',
      secondary: '#e0f2fe',
      success: '#14b8a6',
      warning: '#f97316',
    }
  };

  const applyTheme = (themeName: string) => {
    const theme = presetThemes[themeName as keyof typeof presetThemes];
    if (theme) {
      Object.entries(theme).forEach(([key, value]) => {
        updateThemeVariable(key, value);
      });
      setCurrentTheme(themeName);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 bg-white border border-gray-300 rounded-lg p-4 shadow-lg">
      <h3 className="text-sm font-semibold mb-3">Theme Controller</h3>
      <div className="flex flex-col gap-2">
        {Object.keys(presetThemes).map((themeName) => (
          <button
            key={themeName}
            onClick={() => applyTheme(themeName)}
            className={`px-3 py-1 text-xs rounded capitalize transition-all ${
              currentTheme === themeName
                ? 'bg-blue-500 text-white'
                : 'bg-gray-100 hover:bg-gray-200'
            }`}
          >
            {themeName}
          </button>
        ))}
      </div>
    </div>
  );
}
