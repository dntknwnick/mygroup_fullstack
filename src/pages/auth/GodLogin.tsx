import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';
import { Crown, Mail, Lock, Shield, Zap, Star, ArrowLeft } from 'lucide-react';
import { motion } from 'motion/react';

export const GodLogin: React.FC = () => {
  const navigate = useNavigate();
  const { groupName = 'default', subGroup = 'default' } = useParams();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    setTimeout(() => {
      if (formData.email && formData.password) {
        navigate('/dashboard/admin');
      } else {
        setError('Invalid credentials');
        setLoading(false);
      }
    }, 1500);
  };

  const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    duration: 3 + Math.random() * 4
  }));

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 flex items-center justify-center p-6 relative overflow-hidden">
      {/* Animated Particles */}
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute w-2 h-2 bg-gradient-gold rounded-full opacity-30"
          initial={{ x: `${particle.x}vw`, y: `${particle.y}vh` }}
          animate={{
            y: [`${particle.y}vh`, `${particle.y - 20}vh`, `${particle.y}vh`],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
        />
      ))}

      {/* Glow Effect */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-yellow-500/20 rounded-full blur-3xl" />
      </div>

      {/* Back Button */}
      <motion.button
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        onClick={() => navigate('/')}
        className="fixed top-8 left-8 z-50 flex items-center gap-2 px-5 py-3 bg-white/10 backdrop-blur-md rounded-xl hover:bg-white/20 transition-all text-white border border-white/20 group"
      >
        <ArrowLeft size={20} className="transform group-hover:-translate-x-1 transition-transform" />
        <span>Back to Home</span>
      </motion.button>

      {/* Login Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative w-full max-w-md z-10"
      >
        <div className="glass-effect-dark rounded-3xl shadow-2xl p-10 border border-yellow-500/30">
          {/* Crown Icon with Glow */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
            className="relative mx-auto w-28 h-28 mb-8"
          >
            <div className="absolute inset-0 bg-gradient-gold rounded-full blur-2xl opacity-60 animate-pulse" />
            <div className="relative w-full h-full bg-gradient-gold rounded-full flex items-center justify-center shadow-2xl">
              <Crown className="text-gray-900" size={56} />
            </div>
          </motion.div>

          {/* Header */}
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-white mb-4 flex items-center justify-center gap-3">
              <Zap className="text-yellow-400" size={28} />
              <span>God Mode Access</span>
            </h2>
            <p className="text-gray-300 text-lg mb-2">{groupName}</p>
            {subGroup !== 'default' && (
              <p className="text-gray-400 text-sm">{subGroup}</p>
            )}
          </div>

          {/* Premium Features */}
          <div className="grid grid-cols-3 gap-4 mb-10">
            {[
              { icon: Shield, label: 'Ultimate Control' },
              { icon: Zap, label: 'Full Access' },
              { icon: Star, label: 'Premium' }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
                className="text-center"
              >
                <div className="w-14 h-14 mx-auto mb-3 rounded-xl bg-yellow-500/10 border border-yellow-500/30 flex items-center justify-center shadow-lg">
                  <item.icon className="text-yellow-400" size={24} />
                </div>
                <p className="text-xs text-gray-400">{item.label}</p>
              </motion.div>
            ))}
          </div>

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8 p-4 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 text-sm"
            >
              {error}
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block mb-3 text-sm font-medium text-gray-300">God Email</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="email"
                  placeholder="god@universe.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full pl-12 pr-4 py-4 bg-white/5 border border-gray-700 rounded-xl text-white text-base placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block mb-3 text-sm font-medium text-gray-300">Master Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="password"
                  placeholder="••••••••••••"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full pl-12 pr-4 py-4 bg-white/5 border border-gray-700 rounded-xl text-white text-base placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all"
                  required
                />
              </div>
            </div>

            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 bg-gradient-gold text-gray-900 font-bold rounded-xl hover:shadow-2xl hover:shadow-yellow-500/50 transition-all duration-300 flex items-center justify-center gap-3 disabled:opacity-50 shadow-xl"
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-gray-900 border-t-transparent rounded-full animate-spin" />
                    <span className="text-base">Authenticating...</span>
                  </>
                ) : (
                  <>
                    <Crown size={22} />
                    <span className="text-base">Enter God Mode</span>
                  </>
                )}
              </button>
            </motion.div>
          </form>

          <div className="mt-8 pt-8 border-t border-gray-700">
            <p className="text-center text-sm text-gray-400 leading-relaxed">
              Need standard access?{' '}
              <button
                onClick={() => navigate('/')}
                className="text-yellow-400 hover:text-yellow-300 font-medium transition-colors"
              >
                View all logins
              </button>
            </p>
          </div>
        </div>

        {/* Warning Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-6 p-5 bg-red-500/10 border border-red-500/30 rounded-2xl text-center"
        >
          <p className="text-red-400 text-sm font-medium flex items-center justify-center gap-2 leading-relaxed">
            <Shield size={18} />
            <span>Unauthorized access is strictly prohibited</span>
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};
