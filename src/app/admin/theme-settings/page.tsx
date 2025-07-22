"use client"
import React from 'react';
import { motion } from 'framer-motion';
import { Palette, Layout, Type, Zap, Eye, RotateCcw } from 'lucide-react';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';

import { BorderRadius, ComponentSize, LayoutType, THEME_PALETTES, ThemePalette, TypeScale, useThemeStore } from '@/app/stores/themeStore';
import { useUIStore } from '@/app/stores/uiStore';

export const ThemeSettings = () => {
  const {
    theme,
    layout,
    radius,
    size,
    glassEffect,
    typeScale,
    previewMode,
    setTheme,
    setLayout,
    setRadius,
    setSize,
    setGlassEffect,
    setTypeScale,
    setPreviewMode,
    applyTheme
  } = useThemeStore();
  
  const { setBreadcrumbs, setActiveNav, addNotification } = useUIStore();

  React.useEffect(() => {
    setBreadcrumbs([{ label: 'Customization' }, { label: 'Theme Settings' }]);
    setActiveNav('theme');
  }, [setBreadcrumbs, setActiveNav]);

  const handleThemeChange = (newTheme: ThemePalette) => {
    setTheme(newTheme);
    addNotification({
      type: 'success',
      title: 'Theme Updated',
      message: `Successfully switched to ${THEME_PALETTES[newTheme].name} theme`
    });
  };

  const handleLayoutChange = (newLayout: LayoutType) => {
    setLayout(newLayout);
    addNotification({
      type: 'info',
      title: 'Layout Changed',
      message: `Layout updated to ${newLayout.replace('-', ' ')}`
    });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.3
      }
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      {/* Page Header */}
      <motion.div variants={itemVariants} className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2">
            <Palette className="h-6 w-6" />
            Theme Settings
          </h1>
          <p className="text-muted-foreground">
            Customize the appearance and layout of your admin panel
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant={previewMode ? "default" : "outline"}
            onClick={() => setPreviewMode(!previewMode)}
          >
            <Eye className="h-4 w-4 mr-2" />
            {previewMode ? 'Exit Preview' : 'Live Preview'}
          </Button>
          <Button variant="outline" onClick={applyTheme}>
            <RotateCcw className="h-4 w-4 mr-2" />
            Apply Changes
          </Button>
        </div>
      </motion.div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Theme Palettes */}
        <motion.div variants={itemVariants}>
          <Card className="glass">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Palette className="h-5 w-5" />
                Color Themes
              </CardTitle>
              <CardDescription>
                Choose from 10 beautiful color palettes
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                {Object.entries(THEME_PALETTES).map(([key, palette]) => (
                  <motion.div
                    key={key}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={cn(
                      "relative p-3 rounded-lg border-2 cursor-pointer transition-all",
                      theme === key ? "border-primary ring-2 ring-primary/20" : "border-border hover:border-primary/50"
                    )}
                    onClick={() => handleThemeChange(key as ThemePalette)}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-sm">{palette.name}</span>
                      {theme === key && (
                        <Badge variant="default" className="text-xs">
                          Active
                        </Badge>
                      )}
                    </div>
                    <div className="flex gap-1">
                      <div 
                        className="w-4 h-4 rounded-full border border-white/20"
                        style={{ backgroundColor: `hsl(${palette.primary})` }}
                      />
                      <div 
                        className="w-4 h-4 rounded-full border border-white/20"
                        style={{ backgroundColor: `hsl(${palette.accent})` }}
                      />
                      <div 
                        className="w-4 h-4 rounded-full border border-white/20"
                        style={{ backgroundColor: `hsl(${palette.secondary})` }}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Layout Options */}
        <motion.div variants={itemVariants}>
          <Card className="glass">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Layout className="h-5 w-5" />
                Layout System
              </CardTitle>
              <CardDescription>
                Configure the admin panel layout
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                {[
                  { value: 'sidebar-left', label: 'Sidebar Left', desc: 'Traditional left sidebar' },
                  { value: 'sidebar-top', label: 'Sidebar Top', desc: 'Horizontal navigation bar' },
                  { value: 'full-width', label: 'Full Width', desc: 'Maximum screen utilization' },
                  { value: 'compact', label: 'Compact', desc: 'Space-efficient layout' },
                  { value: 'minimal', label: 'Minimal', desc: 'Clean, distraction-free' }
                ].map((layoutOption) => (
                  <div
                    key={layoutOption.value}
                    className={cn(
                      "p-3 rounded-lg border cursor-pointer transition-all",
                      layout === layoutOption.value ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"
                    )}
                    onClick={() => handleLayoutChange(layoutOption.value as LayoutType)}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">{layoutOption.label}</div>
                        <div className="text-sm text-muted-foreground">{layoutOption.desc}</div>
                      </div>
                      {layout === layoutOption.value && (
                        <Badge variant="default">Current</Badge>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Component Sizing */}
        <motion.div variants={itemVariants}>
          <Card className="glass">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5" />
                Component System
              </CardTitle>
              <CardDescription>
                Adjust component sizes and appearance
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Size System */}
              <div className="space-y-3">
                <Label className="text-sm font-medium">Component Size</Label>
                <div className="flex gap-2">
                  {(['xs', 'sm', 'md', 'lg', 'xl'] as ComponentSize[]).map((sizeOption) => (
                    <Button
                      key={sizeOption}
                      variant={size === sizeOption ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSize(sizeOption)}
                    >
                      {sizeOption.toUpperCase()}
                    </Button>
                  ))}
                </div>
              </div>

              <Separator />

              {/* Border Radius */}
              <div className="space-y-3">
                <Label className="text-sm font-medium">Border Radius</Label>
                <div className="flex gap-2">
                  {(['square', 'md', 'xl'] as BorderRadius[]).map((radiusOption) => (
                    <Button
                      key={radiusOption}
                      variant={radius === radiusOption ? "default" : "outline"}
                      size="sm"
                      onClick={() => setRadius(radiusOption)}
                    >
                      {radiusOption === 'square' ? 'Square' : radiusOption.toUpperCase()}
                    </Button>
                  ))}
                </div>
              </div>

              <Separator />

              {/* Type Scale */}
              <div className="space-y-3">
                <Label className="text-sm font-medium">Typography Scale</Label>
                <div className="flex gap-2">
                  {([-1, 0, 1, 2] as TypeScale[]).map((scaleOption) => (
                    <Button
                      key={scaleOption}
                      variant={typeScale === scaleOption ? "default" : "outline"}
                      size="sm"
                      onClick={() => setTypeScale(scaleOption)}
                    >
                      {scaleOption === -1 ? 'XS' : scaleOption === 0 ? 'Default' : scaleOption === 1 ? 'LG' : 'XL'}
                    </Button>
                  ))}
                </div>
              </div>

              <Separator />

              {/* Glass Effect */}
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-sm font-medium">Glass Effect</Label>
                  <p className="text-xs text-muted-foreground">Enable glassmorphism styling</p>
                </div>
                <Switch
                  checked={glassEffect}
                  onCheckedChange={setGlassEffect}
                />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Preview Card */}
        <motion.div variants={itemVariants}>
          <Card className={cn("glass", glassEffect && "glass-strong")}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Eye className="h-5 w-5" />
                Live Preview
              </CardTitle>
              <CardDescription>
                See your changes in real-time
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Button size="sm" className="w-full">
                  Sample Button
                </Button>
                <Button variant="outline" size="sm" className="w-full">
                  Outline Button
                </Button>
              </div>
              
              <div className="p-3 bg-muted rounded-lg">
                <p className="text-sm">
                  This is how your content will appear with the current theme settings.
                </p>
              </div>

              {/* <div className="text-center">
                <Badge variant="secondary">
                  Theme: {THEME_PALETTES[theme].name}
                </Badge>
              </div> */}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  );
};


