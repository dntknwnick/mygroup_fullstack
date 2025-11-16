import React, { useState } from 'react';
import { Sidebar } from '../../components/Sidebar';
import { StatsCard } from '../../components/StatsCard';
import { Users, Grid3x3, DollarSign, UserPlus, Search, Bell, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import {
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

// Mock Data
const statsData = [
  { title: 'Total Users', value: '12,483', icon: Users, change: 12.5, color: 'from-blue-500 to-blue-600' },
  { title: 'Active Groups', value: '23', icon: Grid3x3, change: 0, color: 'from-purple-500 to-purple-600' },
  { title: 'Revenue', value: '$48,652', icon: DollarSign, change: 23.8, color: 'from-green-500 to-green-600' },
  { title: 'New Registrations', value: '342', icon: UserPlus, change: -5.2, color: 'from-orange-500 to-orange-600' }
];

const userGrowthData = [
  { month: 'Jan', users: 4000 },
  { month: 'Feb', users: 5200 },
  { month: 'Mar', users: 6100 },
  { month: 'Apr', users: 7500 },
  { month: 'May', users: 9200 },
  { month: 'Jun', users: 12483 }
];

const groupActivityData = [
  { name: 'Corporate', value: 3200 },
  { name: 'Franchise', value: 2800 },
  { name: 'Services', value: 2400 },
  { name: 'Media', value: 1900 },
  { name: 'Education', value: 1200 },
  { name: 'Others', value: 983 }
];

const userDistributionData = [
  { name: 'Admin', value: 45, color: '#3b82f6' },
  { name: 'Client', value: 6200, color: '#8b5cf6' },
  { name: 'Corporate', value: 1800, color: '#10b981' },
  { name: 'Labor', value: 3200, color: '#f59e0b' },
  { name: 'Partner', value: 800, color: '#ef4444' },
  { name: 'Reporter', value: 438, color: '#06b6d4' }
];

const recentActivities = [
  { user: 'John Doe', action: 'Registered', group: 'Corporate Hub', time: '5 min ago', avatar: 'JD' },
  { user: 'Jane Smith', action: 'Updated Profile', group: 'Franchise Manager', time: '12 min ago', avatar: 'JS' },
  { user: 'Mike Johnson', action: 'Logged In', group: 'Service Provider', time: '23 min ago', avatar: 'MJ' },
  { user: 'Sarah Williams', action: 'Uploaded Media', group: 'News Portal', time: '1 hour ago', avatar: 'SW' },
  { user: 'Tom Brown', action: 'Created Event', group: 'Events', time: '2 hours ago', avatar: 'TB' }
];

export const AdminDashboard: React.FC = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Desktop Sidebar */}
      <div className="hidden lg:block">
        <Sidebar collapsed={sidebarCollapsed} onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} />
      </div>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {mobileSidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileSidebarOpen(false)}
              className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            />
            <motion.div
              initial={{ x: -240 }}
              animate={{ x: 0 }}
              exit={{ x: -240 }}
              className="fixed left-0 top-0 bottom-0 z-50 lg:hidden"
            >
              <Sidebar />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="flex-1 overflow-auto flex flex-col">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 sticky top-0 z-30 shadow-sm">
          <div className="px-6 lg:px-8 py-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
                  className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  {mobileSidebarOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 leading-tight">Dashboard</h2>
                  <p className="text-sm text-gray-600 mt-1 leading-relaxed">Welcome back, Admin</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                {/* Search */}
                <div className="hidden md:flex relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="text"
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-11 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent w-64 transition-all"
                  />
                </div>

                {/* Notifications */}
                <button className="relative p-2.5 rounded-lg hover:bg-gray-100 transition-colors">
                  <Bell size={22} className="text-gray-600" />
                  <span className="absolute top-2 right-2 w-2 h-2 bg-error-500 rounded-full" />
                </button>

                {/* User Avatar */}
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center text-white shadow-md">
                  A
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="flex-1 p-6 lg:p-8">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {statsData.map((stat, index) => (
              <StatsCard key={stat.title} {...stat} delay={index * 0.1} />
            ))}
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* User Growth Chart */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white rounded-2xl p-6 shadow-lg"
            >
              <h4 className="text-xl font-semibold text-gray-900 mb-6 leading-tight">User Growth</h4>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={userGrowthData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="month" stroke="#6b7280" />
                  <YAxis stroke="#6b7280" />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="users" stroke="#0ea5e9" strokeWidth={3} dot={{ r: 4 }} />
                </LineChart>
              </ResponsiveContainer>
            </motion.div>

            {/* Group Activity Chart */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-white rounded-2xl p-6 shadow-lg"
            >
              <h4 className="text-xl font-semibold text-gray-900 mb-6 leading-tight">Group Activity</h4>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={groupActivityData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="name" stroke="#6b7280" />
                  <YAxis stroke="#6b7280" />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="value" fill="#8b5cf6" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* User Distribution Pie Chart */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="bg-white rounded-2xl p-6 shadow-lg"
            >
              <h4 className="text-xl font-semibold text-gray-900 mb-6 leading-tight">User Distribution</h4>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={userDistributionData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={(entry) => entry.name}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {userDistributionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </motion.div>

            {/* Recent Activity */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-lg"
            >
              <h4 className="text-xl font-semibold text-gray-900 mb-6 leading-tight">Recent Activity</h4>
              <div className="space-y-3">
                {recentActivities.map((activity, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.8 + index * 0.1 }}
                    className="flex items-center gap-4 p-4 rounded-xl hover:bg-gray-50 transition-colors"
                  >
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center text-white flex-shrink-0 text-sm shadow-md">
                      {activity.avatar}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-gray-900 truncate">
                        <span className="font-medium">{activity.user}</span>
                        <span className="text-gray-600"> {activity.action}</span>
                      </p>
                      <p className="text-xs text-gray-500 mt-0.5">{activity.group}</p>
                    </div>
                    <span className="text-xs text-gray-500 whitespace-nowrap">{activity.time}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </main>
      </div>
    </div>
  );
};