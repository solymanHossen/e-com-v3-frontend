"use client";
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowRight, Star, Zap, Shield, Sparkles, Check, User, ChevronDown, 
  ShoppingCart, Heart, Search, Menu, X, Sun, Moon, Mail, Phone, MapPin,
  Facebook, Twitter, Instagram, Linkedin, Play, TrendingUp, Award, Users
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
// If Badge exists at another location, update the import path accordingly, for example:

// Or, if the file is named 'badge.tsx' and located in 'components/ui', ensure it exists:
// import { Badge } from '../../components/ui/badge';
import { useThemeStore } from '../stores/themeStore';


export default function LandingPage(){
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [selectedPlan, setSelectedPlan] = useState('pro');
  const { mode, setMode } = useThemeStore();

  const isDarkMode = mode === 'dark';

  const toggleTheme = () => {
    const newMode = isDarkMode ? 'light' : 'dark';
    setMode(newMode);
  };

  const features = [
    { icon: Zap, title: '10 Dynamic Themes', desc: 'Beautiful color palettes with live preview', color: 'text-yellow-500' },
    { icon: Shield, title: 'Advanced Admin Panel', desc: 'Complete dashboard with analytics & management', color: 'text-blue-500' },
    { icon: Sparkles, title: 'Customizable Layout', desc: 'Multiple layout options with glass effects', color: 'text-purple-500' },
    { icon: TrendingUp, title: 'Real-time Analytics', desc: 'Track your store performance in real-time', color: 'text-green-500' },
    { icon: Award, title: 'Premium Templates', desc: 'Professional designs for every industry', color: 'text-orange-500' },
    { icon: Users, title: 'Customer Management', desc: 'Advanced CRM tools for better relationships', color: 'text-pink-500' }
  ];

  const testimonials = [
    { name: 'Sarah Johnson', role: 'CEO, TechStart', content: 'This platform transformed our online presence. Sales increased by 300% in just 3 months!', avatar: '👩‍💼', rating: 5 },
    { name: 'Mike Chen', role: 'Founder, GreenLife', content: 'The theme customization is incredible. We launched our store in days, not months.', avatar: '👨‍💻', rating: 5 },
    { name: 'Emily Rodriguez', role: 'Marketing Director', content: 'Best ecommerce platform we have used. The analytics are game-changing.', avatar: '👩‍🎨', rating: 5 }
  ];

  const pricingPlans = [
    {
      name: 'Starter',
      price: '$29',
      period: '/month',
      features: ['Up to 100 products', 'Basic templates', 'Email support', 'Basic analytics'],
      popular: false
    },
    {
      name: 'Pro',
      price: '$79',
      period: '/month',
      features: ['Unlimited products', 'All premium themes', 'Priority support', 'Advanced analytics', 'Custom domain'],
      popular: true
    },
    {
      name: 'Enterprise',
      price: '$199',
      period: '/month',
      features: ['Everything in Pro', 'White-label solution', '24/7 phone support', 'Custom integrations', 'Dedicated manager'],
      popular: false
    }
  ];

  const products = [
    { id: 1, name: 'Premium Headphones', price: '$299', image: '🎧', rating: 4.8, reviews: 124 },
    { id: 2, name: 'Smart Watch', price: '$399', image: '⌚', rating: 4.9, reviews: 89 },
    { id: 3, name: 'Wireless Speaker', price: '$149', image: '🔊', rating: 4.7, reviews: 156 },
    { id: 4, name: 'Laptop Stand', price: '$79', image: '💻', rating: 4.6, reviews: 78 }
  ];

  const stats = [
    { label: 'Active Stores', value: '50K+', icon: '🏪' },
    { label: 'Products Sold', value: '2M+', icon: '📦' },
    { label: 'Revenue Generated', value: '$500M+', icon: '💰' },
    { label: 'Countries', value: '120+', icon: '🌍' }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-background/80 backdrop-blur-md border-b border-border z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-primary rounded-lg"></div>
              <span className="text-xl font-bold">EcommerceX</span>
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-foreground/80 hover:text-primary transition-colors">Features</a>
              <a href="#products" className="text-foreground/80 hover:text-primary transition-colors">Products</a>
              <a href="#pricing" className="text-foreground/80 hover:text-primary transition-colors">Pricing</a>
              <a href="#contact" className="text-foreground/80 hover:text-primary transition-colors">Contact</a>
            </div>

            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleTheme}
                className="w-9 h-9 p-0"
              >
                {isDarkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              </Button>
              <Button variant="outline" size="sm" className="hidden md:flex">
                Sign In
              </Button>
              <Button size="sm" className="hidden md:flex">
                Get Started
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden w-9 h-9 p-0"
              >
                {isMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed top-16 left-0 right-0 bg-background border-b border-border z-40 md:hidden"
        >
          <div className="px-6 py-4 space-y-4">
            <a href="#features" className="block text-foreground/80 hover:text-primary">Features</a>
            <a href="#products" className="block text-foreground/80 hover:text-primary">Products</a>
            <a href="#pricing" className="block text-foreground/80 hover:text-primary">Pricing</a>
            <a href="#contact" className="block text-foreground/80 hover:text-primary">Contact</a>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm">Sign In</Button>
              <Button size="sm">Get Started</Button>
            </div>
          </div>
        </motion.div>
      )}

      {/* Hero Section */}
      <section className="relative pt-24 pb-20 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero opacity-10"></div>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-6xl mx-auto text-center relative z-10"
        >
          {/* <Badge variant="secondary" className="mb-6">
            🚀 New: AI-Powered Product Recommendations
          </Badge> */}
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-primary bg-clip-text text-transparent">
            Build Your Dream
            <br />eCommerce Store
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Create stunning online stores with our dynamic theme system, powerful admin panel, and lightning-fast performance. Join thousands of successful merchants worldwide.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button size="lg" className="hover-glow">
              Start Free Trial <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button variant="outline" size="lg">
              <Play className="mr-2 h-4 w-4" />
              Watch Demo
            </Button>
          </div>
          
          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-2xl mb-2">{stat.icon}</div>
                <div className="text-2xl font-bold text-primary">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">Powerful Features</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Everything you need to run a successful online business, from design to analytics
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="glass hover-lift h-full group">
                  <CardContent className="p-6 text-center">
                    <div className={`inline-flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 mb-4 group-hover:scale-110 transition-transform ${feature.color}`}>
                      <feature.icon className="h-6 w-6" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.desc}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Products Demo Section */}
      <section id="products" className="py-20 px-6 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">Featured Products</h2>
            <p className="text-xl text-muted-foreground">
              See how your products will look with our beautiful themes
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="group hover-lift cursor-pointer">
                  <CardContent className="p-0">
                    <div className="relative bg-gradient-primary/10 h-48 flex items-center justify-center text-6xl">
                      {product.image}
                      <Button
                        size="sm"
                        variant="secondary"
                        className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <Heart className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold mb-2">{product.name}</h3>
                      <div className="flex items-center justify-between">
                        <span className="text-lg font-bold text-primary">{product.price}</span>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
                          {product.rating} ({product.reviews})
                        </div>
                      </div>
                      <Button className="w-full mt-3" size="sm">
                        <ShoppingCart className="h-4 w-4 mr-2" />
                        Add to Cart
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">What Our Customers Say</h2>
            <p className="text-xl text-muted-foreground">
              Join thousands of successful merchants who trust our platform
            </p>
          </motion.div>

          <div className="relative">
            <Card className="glass">
              <CardContent className="p-8 text-center">
                <div className="text-4xl mb-4">{testimonials[activeTestimonial].avatar}</div>
                <div className="flex justify-center mb-4">
                  {[...Array(testimonials[activeTestimonial].rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-lg mb-6 italic">"{testimonials[activeTestimonial].content}"</p>
                <div>
                  <div className="font-semibold">{testimonials[activeTestimonial].name}</div>
                  <div className="text-muted-foreground">{testimonials[activeTestimonial].role}</div>
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-center mt-6 space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === activeTestimonial ? 'bg-primary' : 'bg-muted'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 px-6 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">Simple, Transparent Pricing</h2>
            <p className="text-xl text-muted-foreground mb-8">
              Choose the perfect plan for your business needs
            </p>
            <div className="flex items-center justify-center">
              <span className="mr-3">Monthly</span>
              <Button variant="outline" size="sm">
                Yearly (Save 20%)
              </Button>
            </div>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {pricingPlans.map((plan, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className={`relative hover-lift ${plan.popular ? 'ring-2 ring-primary' : ''}`}>
                  {/* {plan.popular && (
                    <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                      Most Popular
                    </Badge>
                  )} */}
                  <CardHeader className="text-center pb-4">
                    <h3 className="text-xl font-semibold">{plan.name}</h3>
                    <div className="flex items-baseline justify-center">
                      <span className="text-4xl font-bold">{plan.price}</span>
                      <span className="text-muted-foreground">{plan.period}</span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3 mb-6">
                      {plan.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center">
                          <Check className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Button 
                      className="w-full" 
                      variant={plan.popular ? 'default' : 'outline'}
                      onClick={() => setSelectedPlan(plan.name.toLowerCase())}
                    >
                      Get Started
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Card className="glass">
              <CardContent className="p-8 text-center">
                <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
                <p className="text-muted-foreground mb-6">
                  Get the latest updates, tips, and exclusive offers delivered to your inbox
                </p>
                <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                  <Input 
                    placeholder="Enter your email"
                    type="email"
                    className="flex-1"
                  />
                  <Button>
                    Subscribe
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground mt-4">
                  No spam, unsubscribe at any time
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-muted/50 py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="col-span-1">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-primary rounded-lg"></div>
                <span className="text-xl font-bold">EcommerceX</span>
              </div>
              <p className="text-muted-foreground mb-4">
                The ultimate eCommerce platform for modern businesses
              </p>
              <div className="flex space-x-4">
                <Facebook className="h-5 w-5 text-muted-foreground hover:text-primary cursor-pointer" />
                <Twitter className="h-5 w-5 text-muted-foreground hover:text-primary cursor-pointer" />
                <Instagram className="h-5 w-5 text-muted-foreground hover:text-primary cursor-pointer" />
                <Linkedin className="h-5 w-5 text-muted-foreground hover:text-primary cursor-pointer" />
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li><a href="#" className="hover:text-primary">Features</a></li>
                <li><a href="#" className="hover:text-primary">Pricing</a></li>
                <li><a href="#" className="hover:text-primary">Templates</a></li>
                <li><a href="#" className="hover:text-primary">Integrations</a></li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li><a href="#" className="hover:text-primary">About</a></li>
                <li><a href="#" className="hover:text-primary">Blog</a></li>
                <li><a href="#" className="hover:text-primary">Careers</a></li>
                <li><a href="#" className="hover:text-primary">Press</a></li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Contact</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-center">
                  <Mail className="h-4 w-4 mr-2" />
                  hello@ecommercex.com
                </li>
                <li className="flex items-center">
                  <Phone className="h-4 w-4 mr-2" />
                  +1 (555) 123-4567
                </li>
                <li className="flex items-center">
                  <MapPin className="h-4 w-4 mr-2" />
                  San Francisco, CA
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-border mt-12 pt-8 text-center text-muted-foreground">
            <p>&copy; 2024 EcommerceX. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};