import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { applications, Application } from '../data/applications';
import { ApplicationCard } from '../components/ApplicationCard';
import { Search, Grid3x3, Building2, Radio as RadioIcon, Sparkles, ArrowRight, Shield } from 'lucide-react';
import { motion } from 'motion/react';

type CategoryFilter = 'all' | 'admin' | 'company' | 'media';

export const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>('all');

  const categories = [
    { id: 'all' as CategoryFilter, label: 'All Applications', icon: Grid3x3 },
    { id: 'admin' as CategoryFilter, label: 'Admin Apps', icon: Shield },
    { id: 'company' as CategoryFilter, label: 'Company Apps', icon: Building2 },
    { id: 'media' as CategoryFilter, label: 'Media Apps', icon: RadioIcon }
  ];

  const filteredApplications = applications.filter((app: Application) => {
    const matchesSearch = app.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         app.tagline.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === 'all' || app.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const handleAppClick = (app: Application) => {
    navigate(app.loginPath);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Premium Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-primary-900 to-purple-900">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-1/2 -right-1/2 w-full h-full bg-gradient-to-br from-primary-500/20 to-transparent rounded-full blur-3xl animate-pulse" />
          <div className="absolute -bottom-1/2 -left-1/2 w-full h-full bg-gradient-to-tr from-purple-500/20 to-transparent rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="text-center">
            {/* Logo & Brand */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex items-center justify-center gap-4 mb-8"
            >
              <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center shadow-2xl">
                <Shield className="text-white" size={40} />
              </div>
              <div className="text-left">
                <h1 className="text-4xl font-bold text-white mb-1 leading-tight">My Group</h1>
                <p className="text-base text-primary-200 leading-relaxed">Multi-Tenant Platform</p>
              </div>
            </motion.div>

            {/* Hero Text */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-12"
            >
              <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6 max-w-4xl mx-auto" style={{ lineHeight: '1.2' }}>
                One Platform, Infinite Possibilities
              </h2>
              <p className="text-xl text-primary-100 max-w-2xl mx-auto mb-8" style={{ lineHeight: '1.6' }}>
                Access 23+ premium applications with enterprise-grade security,
                seamless authentication, and powerful management tools.
              </p>

              {/* Stats */}
              <div className="flex flex-wrap items-center justify-center gap-8 mb-12">
                {[
                  { value: '23+', label: 'Applications' },
                  { value: '9', label: 'User Roles' },
                  { value: '6', label: 'Login Types' },
                  { value: '12K+', label: 'Active Users' }
                ].map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                    className="text-center"
                  >
                    <div className="text-3xl lg:text-4xl font-bold text-white mb-1" style={{ lineHeight: '1.2' }}>{stat.value}</div>
                    <div className="text-sm text-primary-200" style={{ lineHeight: '1.4' }}>{stat.label}</div>
                  </motion.div>
                ))}
              </div>

              {/* Search Bar */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="max-w-2xl mx-auto"
              >
                <div className="relative">
                  <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400" size={24} />
                  <input
                    type="text"
                    placeholder="Search applications..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-16 pr-6 py-5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent text-lg shadow-2xl"
                  />
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Wave Divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
            <path d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="white"/>
          </svg>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        {/* Category Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mb-12"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2" style={{ lineHeight: '1.3' }}>Browse Applications</h3>
              <p className="text-base text-gray-600" style={{ lineHeight: '1.6' }}>
                {filteredApplications.length} {filteredApplications.length === 1 ? 'application' : 'applications'} available
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <motion.button
                  key={category.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setActiveCategory(category.id)}
                  className={`
                    flex items-center gap-3 px-6 py-4 rounded-xl transition-all duration-300 shadow-sm
                    ${activeCategory === category.id
                      ? 'bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-lg shadow-primary-500/30'
                      : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
                    }
                  `}
                >
                  <Icon size={20} />
                  <span>{category.label}</span>
                </motion.button>
              );
            })}
          </div>
        </motion.div>

        {/* Applications Grid */}
        {filteredApplications.length > 0 ? (
          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {filteredApplications.map((app, index) => (
              <motion.div
                key={app.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.9 + index * 0.05 }}
              >
                <ApplicationCard application={app} onClick={() => handleAppClick(app)} />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <div className="inline-flex items-center justify-center w-24 h-24 rounded-3xl bg-gray-100 mb-6">
              <Search size={48} className="text-gray-400" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3" style={{ lineHeight: '1.3' }}>No applications found</h3>
            <p className="text-base text-gray-600 mb-6" style={{ lineHeight: '1.6' }}>Try adjusting your search or filter criteria</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setActiveCategory('all');
              }}
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary-600 text-white rounded-xl hover:bg-primary-700 transition-colors"
            >
              <span>Clear Filters</span>
              <ArrowRight size={20} />
            </button>
          </motion.div>
        )}

        {/* Premium Features Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          className="mt-24 bg-gradient-to-br from-gray-50 to-primary-50 rounded-3xl p-8 lg:p-12"
        >
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm mb-6">
              <Sparkles className="text-primary-600" size={20} />
              <span className="text-sm text-gray-700">Premium Platform Features</span>
            </div>
            <h3 className="text-3xl font-bold text-gray-900 mb-4 leading-tight">Why Choose My Group?</h3>
            <p className="text-base text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Experience enterprise-grade features designed for scalability, security, and seamless user experience
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Shield,
                title: 'Enterprise Security',
                description: 'Multi-layered authentication with role-based access control and data encryption'
              },
              {
                icon: Grid3x3,
                title: 'Unified Platform',
                description: 'Access all applications from a single dashboard with seamless navigation'
              },
              {
                icon: Sparkles,
                title: 'Modern Experience',
                description: 'Beautiful, responsive design with smooth animations and intuitive workflows'
              }
            ].map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 1.4 + index * 0.1 }}
                  className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center mb-4">
                    <Icon className="text-white" size={28} />
                  </div>
                  <h4 className="text-xl font-semibold text-gray-900 mb-3 leading-tight">{feature.title}</h4>
                  <p className="text-sm text-gray-600 leading-relaxed">{feature.description}</p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </main>

      {/* Premium Footer */}
      <footer className="bg-gray-900 text-white mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center">
                  <Shield className="text-white" size={20} />
                </div>
                <span className="text-xl">My Group</span>
              </div>
              <p className="text-gray-400 mb-4 max-w-md">
                Premium multi-tenant platform providing seamless access to 23+ enterprise applications with advanced security and modern user experience.
              </p>
            </div>
            <div>
              <h5 className="text-lg font-semibold mb-4 leading-tight">Quick Links</h5>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Documentation</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Support</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
            <div>
              <h5 className="text-lg font-semibold mb-4 leading-tight">Legal</h5>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Cookie Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Compliance</a></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-gray-800 text-center text-gray-400">
            <p>&copy; 2025 My Group Platform. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};
