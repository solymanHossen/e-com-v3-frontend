import { motion } from 'framer-motion';
import { NavLink, useLocation } from 'react-router-dom';
import { 
  BarChart3, 
  Package, 
  ShoppingCart, 
  Users, 
  Tag, 
  Settings, 
  Bell, 
  Palette,
  LayoutGrid,
  Activity,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { useThemeStore } from '@/stores/themeStore';
import { useUIStore } from '@/stores/uiStore';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

const navigation = [
  { name: 'Dashboard', href: '/admin', icon: BarChart3, id: 'dashboard' },
  { name: 'Products', href: '/admin/products', icon: Package, id: 'products' },
  { name: 'Orders', href: '/admin/orders', icon: ShoppingCart, id: 'orders' },
  { name: 'Customers', href: '/admin/customers', icon: Users, id: 'customers' },
  { name: 'Coupons', href: '/admin/coupons', icon: Tag, id: 'coupons' },
  { name: 'Analytics', href: '/admin/analytics', icon: Activity, id: 'analytics' },
  { name: 'Notifications', href: '/admin/notifications', icon: Bell, id: 'notifications' },
];

const settingsNavigation = [
  { name: 'Theme Settings', href: '/admin/theme', icon: Palette, id: 'theme' },
  { name: 'System Settings', href: '/admin/settings', icon: Settings, id: 'settings' },
  { name: 'Widget Builder', href: '/admin/widgets', icon: LayoutGrid, id: 'widgets' },
];

export const AdminSidebar = () => {
  const location = useLocation();
  const { layout, sidebarCollapsed, setSidebarCollapsed, size } = useThemeStore();
  const { setActiveNav } = useUIStore();

  const isTopLayout = layout === 'sidebar-top';
  const isMinimal = layout === 'minimal';

  if (isMinimal) return null;

  const NavItem = ({ item, isActive }: { item: any; isActive: boolean }) => (
    <NavLink
      to={item.href}
      onClick={() => setActiveNav(item.id)}
      className={cn(
        "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200",
        "hover:bg-accent hover:text-accent-foreground",
        isActive && "bg-primary text-primary-foreground shadow-sm",
        sidebarCollapsed && !isTopLayout && "justify-center px-2",
        size === 'xs' && "text-xs py-1",
        size === 'sm' && "text-sm py-1.5",
        size === 'lg' && "text-base py-3",
        size === 'xl' && "text-lg py-4"
      )}
    >
      <item.icon className={cn(
        "h-4 w-4 shrink-0",
        size === 'xs' && "h-3 w-3",
        size === 'sm' && "h-3.5 w-3.5",
        size === 'lg' && "h-5 w-5",
        size === 'xl' && "h-6 w-6"
      )} />
      {(!sidebarCollapsed || isTopLayout) && (
        <span className="truncate">{item.name}</span>
      )}
    </NavLink>
  );

  if (isTopLayout) {
    return (
      <div className="flex items-center justify-between px-6 py-4 bg-card">
        <div className="flex items-center space-x-1">
          {navigation.map((item) => {
            const isActive = location.pathname === item.href;
            return <NavItem key={item.id} item={item} isActive={isActive} />;
          })}
        </div>
        <div className="flex items-center space-x-1">
          {settingsNavigation.map((item) => {
            const isActive = location.pathname === item.href;
            return <NavItem key={item.id} item={item} isActive={isActive} />;
          })}
        </div>
      </div>
    );
  }

  return (
    <motion.nav
      animate={{ width: sidebarCollapsed ? 64 : 280 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className="flex flex-col h-full bg-card border-r border-border"
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        {!sidebarCollapsed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="flex items-center space-x-2"
          >
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
              <Package className="h-4 w-4 text-white" />
            </div>
            <span className="font-bold text-lg">SaaS Store</span>
          </motion.div>
        )}
        
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
          className="h-8 w-8 p-0"
        >
          {sidebarCollapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <ChevronLeft className="h-4 w-4" />
          )}
        </Button>
      </div>

      {/* Navigation */}
      <div className="flex-1 flex flex-col overflow-y-auto p-4 space-y-1">
        {navigation.map((item) => {
          const isActive = location.pathname === item.href;
          return <NavItem key={item.id} item={item} isActive={isActive} />;
        })}

        {/* Divider */}
        <div className="my-4 border-t border-border" />

        {/* Settings Section */}
        {(!sidebarCollapsed) && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-xs font-medium text-muted-foreground px-3 py-2"
          >
            CUSTOMIZATION
          </motion.div>
        )}

        {settingsNavigation.map((item) => {
          const isActive = location.pathname === item.href;
          return <NavItem key={item.id} item={item} isActive={isActive} />;
        })}
      </div>

      {/* Footer */}
      {!sidebarCollapsed && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="p-4 border-t border-border"
        >
          <div className="text-xs text-muted-foreground text-center">
            SaaS eCommerce v2.0
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
};