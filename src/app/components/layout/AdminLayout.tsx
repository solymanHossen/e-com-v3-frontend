import { ReactNode } from 'react';
import { motion } from 'framer-motion';

import { AdminSidebar } from './AdminSidebar';
import { AdminHeader } from './AdminHeader';
import { cn } from '@/app/lib/utils';
import { useThemeStore } from '@/app/stores/themeStore';


interface AdminLayoutProps {
  children: ReactNode;
}

export const AdminLayout = ({ children }: AdminLayoutProps) => {
  const { layout, sidebarCollapsed } = useThemeStore();

  const getLayoutClasses = () => {
    switch (layout) {
      case 'sidebar-left':
        return sidebarCollapsed 
          ? 'grid grid-cols-[64px,1fr] min-h-screen'
          : 'grid grid-cols-[280px,1fr] min-h-screen';
      case 'sidebar-top':
        return 'flex flex-col min-h-screen';
      case 'full-width':
        return 'flex flex-col min-h-screen';
      case 'compact':
        return sidebarCollapsed
          ? 'grid grid-cols-[60px,1fr] min-h-screen gap-4'
          : 'grid grid-cols-[240px,1fr] min-h-screen gap-4';
      case 'minimal':
        return 'flex flex-col min-h-screen max-w-7xl mx-auto';
      default:
        return 'grid grid-cols-[280px,1fr] min-h-screen';
    }
  };

  return (
    <div className={cn("bg-background", getLayoutClasses())}>
      {/* Sidebar for left layouts */}
      {(layout === 'sidebar-left' || layout === 'compact') && (
        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="border-r border-border"
        >
          <AdminSidebar />
        </motion.div>
      )}

      {/* Main content area */}
      <div className="flex flex-col overflow-hidden">
        {/* Header */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <AdminHeader />
        </motion.div>

        {/* Top sidebar for sidebar-top layout */}
        {layout === 'sidebar-top' && (
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            className="border-b border-border"
          >
            <AdminSidebar />
          </motion.div>
        )}

        {/* Page content */}
        <motion.main
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="flex-1 overflow-auto p-6 bg-muted/30"
        >
          {children}
        </motion.main>
      </div>
    </div>
  );
};