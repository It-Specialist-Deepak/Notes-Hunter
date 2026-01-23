// d:\NotesHunter\frontend\src\app\(admin)\upload\page.jsx
'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import NoteForm from '../../self-component/Admin/NoteForm';
import PaperForm from '../../self-component/Admin/paperForm';
import { FiFileText, FiBookOpen } from 'react-icons/fi';

const UploadPage = () => {
  const [activeTab, setActiveTab] = useState('notes');

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-900 to-gray-800 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <motion.h1 
          className="text-3xl font-bold text-white mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Upload {activeTab === 'notes' ? 'Notes' : 'Previous Year Papers'}
        </motion.h1>

        {/* Toggle Tabs */}
        <div className="flex mb-8 bg-gray-800 rounded-xl p-1 shadow-sm border border-gray-700">
          <button
            onClick={() => setActiveTab('notes')}
            className={`flex-1 py-3 px-4 rounded-lg text-center font-medium transition-all ${
              activeTab === 'notes'
                ? 'bg-gradient-to-r from-teal-600 to-emerald-600 text-white shadow-md'
                : 'text-gray-400 hover:bg-gray-700'
            }`}
          >
            <FiFileText className="inline-block mr-2" />
            Upload Notes
          </button>
          <button
            onClick={() => setActiveTab('papers')}
            className={`flex-1 py-3 px-4 rounded-lg text-center font-medium transition-all ${
              activeTab === 'papers'
                ? 'bg-gradient-to-r from-teal-600 to-emerald-600 text-white shadow-md'
                : 'text-gray-400 hover:bg-gray-700'
            }`}
          >
            <FiBookOpen className="inline-block mr-2" />
            Upload Papers
          </button>
        </div>

        <motion.div
          key={activeTab}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-700"
        >
          {activeTab === 'notes' ? <NoteForm /> : <PaperForm />}
        </motion.div>
      </div>
    </div>
  );
};

export default UploadPage;