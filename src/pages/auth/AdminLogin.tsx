import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';
import { Mail, Lock, Shield, Check, TrendingUp, Users, Globe, ArrowLeft } from 'lucide-react';
import { motion } from 'motion/react';

export const AdminLogin: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    rememberMe: false
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login('admin', {
        username: formData.username,
        password: formData.password,
        rememberMe: formData.rememberMe
      });
      // Navigation will be handled by AuthContext
      navigate('/dashboard/admin');
    } catch (err: any) {
      setError(err.message || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  const features = [
    { icon: Users, text: 'Manage 1000+ users across 23 applications' },
    { icon: TrendingUp, text: 'Real-time analytics and insights' },
    { icon: Shield, text: 'Enterprise-grade security' },
    { icon: Globe, text: 'Multi-tenant architecture' }
  ];

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Left Side - Brand & Features */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        className="lg:w-1/2 bg-gradient-to-br from-primary-600 via-primary-700 to-primary-900 flex flex-col justify-center relative overflow-hidden"
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.2),transparent_50%)]" />
          <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_70%_80%,rgba(255,255,255,0.15),transparent_50%)]" />
        </div>

        <div className="relative z-10 px-8 py-16 lg:px-16 lg:py-20 max-w-2xl mx-auto w-full">
          {/* Back to Home */}
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-primary-100 hover:text-white transition-colors mb-12 group"
          >
            <ArrowLeft size={20} className="transform group-hover:-translate-x-1 transition-transform" />
            <span>Back to Home</span>
          </motion.button>

          {/* Logo */}
          <div className="flex items-center gap-4 mb-12">
            <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-2xl">
              <Shield className="text-white" size={32} />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white" style={{ lineHeight: '1.25' }}>My Group</h2>
              <p className="text-base text-primary-200 mt-1" style={{ lineHeight: '1.5' }}>Admin Portal</p>
            </div>
          </div>

          {/* Tagline */}
          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-6" style={{ lineHeight: '1.2' }}>Manage Your Empire</h1>
          <p className="text-lg text-primary-100 mb-16" style={{ lineHeight: '1.6' }}>
            Centralized control for your entire multi-tenant ecosystem
          </p>

          {/* Features */}
          <div className="space-y-6 mb-16">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 + 0.4 }}
                className="flex items-start gap-4"
              >
                <div className="w-12 h-12 rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center flex-shrink-0 shadow-lg">
                  <feature.icon size={24} className="text-white" />
                </div>
                <p className="text-base text-primary-100 pt-2" style={{ lineHeight: '1.6' }}>{feature.text}</p>
              </motion.div>
            ))}
          </div>

          {/* Stats */}
          <div className="pt-12 border-t border-white/20">
            <div className="grid grid-cols-3 gap-8">
              <div>
                <div className="text-4xl font-bold text-white mb-2" style={{ lineHeight: '1' }}>23+</div>
                <div className="text-sm text-primary-200" style={{ lineHeight: '1.5' }}>Applications</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-white mb-2" style={{ lineHeight: '1' }}>9</div>
                <div className="text-sm text-primary-200" style={{ lineHeight: '1.5' }}>User Roles</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-white mb-2" style={{ lineHeight: '1' }}>6</div>
                <div className="text-sm text-primary-200" style={{ lineHeight: '1.5' }}>Login Types</div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Right Side - Login Form */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        className="lg:w-1/2 bg-gray-50 flex flex-col justify-center"
      >
        <div className="px-8 py-16 lg:px-16 lg:py-20 max-w-md mx-auto w-full">
          <div className="mb-10">
            <h2 className="text-3xl font-bold text-gray-900 mb-3 leading-tight">Welcome Back, Admin</h2>
            <p className="text-base text-gray-600 leading-relaxed">Sign in to access your dashboard</p>
          </div>

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8 p-4 bg-error-50 border border-error-200 rounded-xl text-error-700 text-sm"
            >
              {error}
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <Input
              label="Username"
              type="text"
              placeholder="Enter your username"
              leftIcon={<Mail size={20} />}
              value={formData.username}
              onChange={(e) => setFormData({ ...formData, username: e.target.value })}
              required
            />

            <Input
              label="Password"
              type="password"
              placeholder="Enter your password"
              leftIcon={<Lock size={20} />}
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              required
            />

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={formData.rememberMe}
                  onChange={(e) => setFormData({ ...formData, rememberMe: e.target.checked })}
                  className="w-4 h-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500 cursor-pointer"
                />
                <span className="text-sm text-gray-700 group-hover:text-gray-900">Remember me</span>
              </label>

              <button
                type="button"
                onClick={() => navigate('/auth/forgot-password')}
                className="text-sm text-primary-600 hover:text-primary-700 font-medium"
              >
                Forgot Password?
              </button>
            </div>

            <Button type="submit" variant="gradient" size="lg" fullWidth loading={loading}>
              Sign In to Dashboard
            </Button>
          </form>

          <div className="mt-10 pt-10 border-t border-gray-200">
            <p className="text-center text-sm text-gray-600 mb-6">
              Need different access?{' '}
              <button
                onClick={() => navigate('/')}
                className="text-primary-600 hover:text-primary-700 font-medium"
              >
                View all login types
              </button>
            </p>

            {/* Quick Links */}
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => navigate('/partner/login')}
                className="p-4 bg-white border border-gray-200 rounded-xl hover:border-primary-300 hover:bg-primary-50 transition-all text-sm text-gray-700 hover:text-primary-700 font-medium"
              >
                Partner Login
              </button>
              <button
                onClick={() => navigate('/reporter/login')}
                className="p-4 bg-white border border-gray-200 rounded-xl hover:border-primary-300 hover:bg-primary-50 transition-all text-sm text-gray-700 hover:text-primary-700 font-medium"
              >
                Reporter Login
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
