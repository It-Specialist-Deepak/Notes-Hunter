// src/app/(admin)/admindashboard/page.jsx
'use client';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FiRefreshCw } from 'react-icons/fi';
import { fetchAdminStats } from '@/app/redux/slices/adminSlice';
import StatsCard from '@/app/self-component/Admin/StatsCard';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const { stats, loading, error } = useSelector((state) => {
    console.log('Redux State:', state.admin);
    return state.admin;
  });

  useEffect(() => {
    console.log('Component mounted, loading stats...');
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      console.log('Dispatching fetchAdminStats...');
      const result = await dispatch(fetchAdminStats()).unwrap();
      console.log('API Result:', result);
    } catch (error) {
      console.error('Error loading stats:', error);
      toast.error(error || 'Failed to load stats');
    }
  };

  if (loading && !stats) {
    return (
      <motion.div 
        className="flex items-center justify-center h-64"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div 
          className="h-12 w-12 rounded-full border-2 border-teal-400 border-t-transparent"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
      </motion.div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <motion.div 
          className="text-center py-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <p className="text-red-400 mb-4">{error}</p>
          <motion.button
            onClick={loadStats}
            className="px-5 py-2.5 bg-linear-to-r from-teal-600 to-emerald-600 hover:from-teal-500 hover:to-emerald-500 text-white rounded-lg transition-all duration-300 shadow-md hover:shadow-teal-500/20"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
          >
            Retry
          </motion.button>
        </motion.div>
      </div>
    );
  }

  return (
    <motion.div 
      className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-900 to-gray-800 p-6 pt-24"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <h1 className="text-3xl font-bold bg-linear-to-r from-teal-300 to-emerald-400 bg-clip-text text-transparent">
              Admin Dashboard
            </h1>
            <p className="text-teal-200/80">Welcome back, Admin</p>
          </motion.div>
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
          >
            <button
              onClick={loadStats}
              disabled={loading}
              className="flex items-center gap-2 px-4 py-2.5 bg-linear-to-r from-teal-600 to-emerald-600 hover:from-teal-500 hover:to-emerald-500 text-white rounded-lg transition-all duration-300 shadow-lg hover:shadow-teal-500/30"
            >
              {loading ? (
                <FiRefreshCw className={`text-white ${loading ? 'animate-spin' : ''}`} />
              ) : (
                <FiRefreshCw className="text-white" />
              )}
              <span>Refresh</span>
            </button>
          </motion.div>
        </div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          {/* Users Card */}
          <StatsCard
            title="Total Users"
            value={stats?.users?.total || 0}
            icon="users"
            subItems={[
              { label: 'Admins', value: stats?.users?.admins || 0 },
              { label: 'Regular Users', value: stats?.users?.Users || 0 }
            ]}
          />

          {/* Notes Card */}
          <StatsCard
            title="Total Notes"
            value={stats?.notes?.total || 0}
            icon="notes"
            subItems={[
              { label: 'Downloads', value: stats?.notes?.totalDownloads || 0 },
              { label: 'Likes', value: stats?.notes?.totalLikes || 0 }
            ]}
          />

          {/* Papers Card */}
          <StatsCard
            title="Total Papers"
            value={stats?.papers?.total || 0}
            icon="papers"
            subItems={[
              { label: 'Downloads', value: stats?.papers?.totalDownloads || 0 },
              { label: 'Likes', value: stats?.papers?.totalLikes || 0 }
            ]}
          />
        </motion.div>
      </div>
    </motion.div>
  );
};

export default AdminDashboard;