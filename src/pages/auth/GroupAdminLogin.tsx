import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';
import { Mail, Lock, ArrowLeft } from 'lucide-react';
import { motion } from 'motion/react';

const groupData: Record<string, any> = {
  corporate: {
    name: 'Corporate Hub',
    logo: '🏢',
    tagline: 'Enterprise Management Platform',
    primaryColor: 'from-indigo-500 to-indigo-700',
    bgColor: 'from-indigo-50 to-purple-50'
  },
  franchise: {
    name: 'Franchise Manager',
    logo: '🏭',
    tagline: 'Regional Operations Control',
    primaryColor: 'from-purple-500 to-purple-700',
    bgColor: 'from-purple-50 to-pink-50'
  },
  services: {
    name: 'Service Provider',
    logo: '💼',
    tagline: 'Professional Services Hub',
    primaryColor: 'from-teal-500 to-teal-700',
    bgColor: 'from-teal-50 to-cyan-50'
  },
  labor: {
    name: 'Labor Portal',
    logo: '🔧',
    tagline: 'Workforce Management',
    primaryColor: 'from-orange-500 to-orange-700',
    bgColor: 'from-orange-50 to-red-50'
  },
  education: {
    name: 'Education Center',
    logo: '🎓',
    tagline: 'Learning & Development',
    primaryColor: 'from-green-500 to-green-700',
    bgColor: 'from-green-50 to-emerald-50'
  }
};

export const GroupAdminLogin: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const { groupName = 'corporate' } = useParams();
  const [formData, setFormData] = useState({ username: '', password: '', rememberMe: false });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const group = groupData[groupName] || groupData.corporate;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login('group-admin', {
        username: formData.username,
        password: formData.password,
        rememberMe: formData.rememberMe
      }, {
        groupName
      });
      navigate('/dashboard/admin');
    } catch (err: any) {
      setError(err.message || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`min-h-screen bg-gradient-to-br ${group.bgColor} flex items-center justify-center p-6 relative overflow-hidden`}>
      {/* Background Pattern */}
      <div className="absolute inset-0 overflow-hidden opacity-30">
        <div className="absolute -top-1/2 -right-1/2 w-full h-full bg-gradient-to-br from-primary-500 to-transparent rounded-full blur-3xl" />
        <div className="absolute -bottom-1/2 -left-1/2 w-full h-full bg-gradient-to-tr from-secondary-500 to-transparent rounded-full blur-3xl" />
      </div>

      {/* Back Button */}
      <motion.button
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        onClick={() => navigate('/')}
        className="fixed top-8 left-8 z-50 flex items-center gap-2 px-5 py-3 bg-white/90 backdrop-blur-md rounded-xl hover:bg-white transition-all shadow-lg hover:shadow-xl group"
      >
        <ArrowLeft size={20} className="transform group-hover:-translate-x-1 transition-transform" />
        <span>Back to Home</span>
      </motion.button>

      {/* Login Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="relative w-full max-w-md z-10"
      >
        <div className="glass-effect rounded-3xl shadow-2xl p-10 border border-white/20">
          {/* Group Branding */}
          <div className="text-center mb-10">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
              className={`w-24 h-24 mx-auto mb-6 rounded-3xl bg-gradient-to-br ${group.primaryColor} flex items-center justify-center text-5xl shadow-2xl`}
            >
              {group.logo}
            </motion.div>
            <h2 className="text-3xl font-bold text-gray-900 mb-3" style={{ lineHeight: '1.25' }}>{group.name}</h2>
            <p className="text-base text-gray-600" style={{ lineHeight: '1.6' }}>{group.tagline}</p>
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

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={formData.rememberMe}
                  onChange={(e) => setFormData({ ...formData, rememberMe: e.target.checked })}
                  className="w-4 h-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500 cursor-pointer"
                />
                <span className="text-gray-700 group-hover:text-gray-900">Remember me</span>
              </label>

              <button
                type="button"
                onClick={() => navigate('/auth/forgot-password')}
                className="text-primary-600 hover:text-primary-700 font-medium"
              >
                Forgot?
              </button>
            </div>

            <Button type="submit" variant="gradient" size="lg" fullWidth loading={loading}>
              Sign In to {group.name}
            </Button>
          </form>

          <div className="mt-8 pt-8 border-t border-gray-200">
            <p className="text-center text-sm text-gray-600">
              Don't have an account?{' '}
              <button
                onClick={() => navigate(`/register-form/${groupName}`)}
                className="text-primary-600 hover:text-primary-700 font-medium"
              >
                Register here
              </button>
            </p>
          </div>

          {/* Other Login Types */}
          <div className="mt-8">
            <p className="text-xs text-center text-gray-500 mb-4">Other login options</p>
            <div className="grid grid-cols-3 gap-3">
              <button
                onClick={() => navigate('/auth/login')}
                className="p-3 text-xs bg-white border border-gray-200 rounded-xl hover:border-primary-300 hover:bg-primary-50 transition-all font-medium"
              >
                Admin
              </button>
              <button
                onClick={() => navigate('/partner/login')}
                className="p-3 text-xs bg-white border border-gray-200 rounded-xl hover:border-primary-300 hover:bg-primary-50 transition-all font-medium"
              >
                Partner
              </button>
              <button
                onClick={() => navigate('/reporter/login')}
                className="p-3 text-xs bg-white border border-gray-200 rounded-xl hover:border-primary-300 hover:bg-primary-50 transition-all font-medium"
              >
                Reporter
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
