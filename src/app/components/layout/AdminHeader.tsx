import { motion } from 'framer-motion';
import { Search, Bell, Settings, User, Sun, Moon, Monitor } from 'lucide-react';
import { useThemeStore } from '@/stores/themeStore';
import { useUIStore } from '@/stores/uiStore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger,
  DropdownMenuSeparator 
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

export const AdminHeader = () => {
  const { mode, setMode, size, setSettingsOpen, previewMode, setPreviewMode } = useThemeStore();
  const { searchQuery, setSearchQuery, notifications, breadcrumbs } = useUIStore();

  const getModeIcon = () => {
    switch (mode) {
      case 'light': return Sun;
      case 'dark': return Moon;
      case 'system': return Monitor;
      default: return Sun;
    }
  };

  const getButtonSize = () => {
    switch (size) {
      case 'xs': return 'sm';
      case 'sm': return 'sm';
      case 'md': return 'default';
      case 'lg': return 'lg';
      case 'xl': return 'lg';
      default: return 'default';
    }
  };

  const ModeIcon = getModeIcon();
  const buttonSize = getButtonSize();

  return (
    <motion.header
      initial={{ y: -10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="flex items-center justify-between px-6 py-4 bg-card border-b border-border"
    >
      {/* Left side - Breadcrumbs */}
      <div className="flex items-center space-x-2">
        <nav className="flex items-center space-x-2 text-sm text-muted-foreground">
          {breadcrumbs.map((crumb, index) => (
            <div key={index} className="flex items-center space-x-2">
              {index > 0 && <span>/</span>}
              <span className={cn(
                index === breadcrumbs.length - 1 && "text-foreground font-medium"
              )}>
                {crumb.label}
              </span>
            </div>
          ))}
        </nav>
      </div>

      {/* Center - Search */}
      <div className="flex-1 max-w-md mx-8">
        <div className="relative">
          <Search className={cn(
            "absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground",
            size === 'xs' && "h-3 w-3",
            size === 'sm' && "h-3.5 w-3.5", 
            size === 'md' && "h-4 w-4",
            size === 'lg' && "h-5 w-5",
            size === 'xl' && "h-6 w-6"
          )} />
          <Input
            placeholder="Search products, orders, customers..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={cn(
              "pl-10 bg-muted/50 border-0 focus:bg-background",
              size === 'xs' && "h-7 text-xs",
              size === 'sm' && "h-8 text-sm",
              size === 'md' && "h-9",
              size === 'lg' && "h-10 text-lg",
              size === 'xl' && "h-12 text-xl"
            )}
          />
        </div>
      </div>

      {/* Right side - Actions */}
      <div className="flex items-center space-x-2">
        {/* Preview Mode Toggle */}
        <Button
          variant={previewMode ? "default" : "outline"}
          size={buttonSize}
          onClick={() => setPreviewMode(!previewMode)}
        >
          {previewMode ? 'Exit Preview' : 'Preview'}
        </Button>

        {/* Theme Mode Toggle */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size={buttonSize}>
              <ModeIcon className={cn(
                size === 'xs' && "h-3 w-3",
                size === 'sm' && "h-3.5 w-3.5",
                size === 'md' && "h-4 w-4", 
                size === 'lg' && "h-5 w-5",
                size === 'xl' && "h-6 w-6"
              )} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => setMode('light')}>
              <Sun className="h-4 w-4 mr-2" />
              Light
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setMode('dark')}>
              <Moon className="h-4 w-4 mr-2" />
              Dark
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setMode('system')}>
              <Monitor className="h-4 w-4 mr-2" />
              System
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Notifications */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size={buttonSize} className="relative">
              <Bell className={cn(
                size === 'xs' && "h-3 w-3",
                size === 'sm' && "h-3.5 w-3.5",
                size === 'md' && "h-4 w-4",
                size === 'lg' && "h-5 w-5", 
                size === 'xl' && "h-6 w-6"
              )} />
              {notifications.length > 0 && (
                <Badge 
                  variant="destructive" 
                  className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs"
                >
                  {notifications.length}
                </Badge>
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80">
            {notifications.length === 0 ? (
              <div className="p-4 text-center text-muted-foreground text-sm">
                No new notifications
              </div>
            ) : (
              notifications.slice(0, 5).map((notification) => (
                <DropdownMenuItem key={notification.id} className="flex flex-col items-start p-4">
                  <div className="flex w-full justify-between items-start">
                    <div className="flex-1">
                      <p className="font-medium text-sm">{notification.title}</p>
                      {notification.message && (
                        <p className="text-xs text-muted-foreground mt-1">
                          {notification.message}
                        </p>
                      )}
                    </div>
                    <Badge variant={
                      notification.type === 'error' ? 'destructive' :
                      notification.type === 'warning' ? 'secondary' :
                      notification.type === 'success' ? 'default' : 'outline'
                    }>
                      {notification.type}
                    </Badge>
                  </div>
                </DropdownMenuItem>
              ))
            )}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Settings */}
        <Button
          variant="outline"
          size={buttonSize}
          onClick={() => setSettingsOpen(true)}
        >
          <Settings className={cn(
            size === 'xs' && "h-3 w-3",
            size === 'sm' && "h-3.5 w-3.5",
            size === 'md' && "h-4 w-4",
            size === 'lg' && "h-5 w-5",
            size === 'xl' && "h-6 w-6"
          )} />
        </Button>

        {/* User Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size={buttonSize}>
              <User className={cn(
                size === 'xs' && "h-3 w-3",
                size === 'sm' && "h-3.5 w-3.5", 
                size === 'md' && "h-4 w-4",
                size === 'lg' && "h-5 w-5",
                size === 'xl' && "h-6 w-6"
              )} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Account Settings</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Sign Out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </motion.header>
  );
};