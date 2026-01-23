// d:\NotesHunter\frontend\src\app\self-component\Admin\NoteForm.jsx
'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiUpload, FiX } from 'react-icons/fi';
import { toast } from 'react-hot-toast';
// In NoteForm.jsx
import axios from 'axios';

const NoteForm = () => {
    const [formData, setFormData] = useState({
        title: '',
        subject: '',
        category: '',
        subcategory: '',
        description: '',
        pages: '',
        type: '',
        file: null,
    });
    const [filePreview, setFilePreview] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const handleChange = (e) => {
        const { name, value, files } = e.target;

        if (name === 'file') {
            const file = files[0];
            setFormData(prev => ({ ...prev, file }));
            setFilePreview(URL.createObjectURL(file));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const formDataToSend = new FormData();

            // Append all form fields except file
            const { file, ...otherFields } = formData;
            Object.entries(otherFields).forEach(([key, value]) => {
                if (value !== null) {
                    formDataToSend.append(key, value);
                }
            });

            // Append file if exists
            if (file) {
                formDataToSend.append('file', file);
            }

            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_API_URL}/notes/upload`,
                formDataToSend,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                    withCredentials: true
                }
            );

            toast.success('Note uploaded successfully!');
            // Reset form
            setFormData({
                title: '',
                subject: '',
                category: '',
                subcategory: '',
                description: '',
                pages: '',
                type: '',
                file: null,
            });
            setFilePreview(null);

        } catch (error) {
            console.error('Upload error:', error);
            toast.error(error.response?.data?.message || 'Failed to upload note. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };


    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-1">
                    <label className="block text-sm font-medium text-gray-300">Title *</label>
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 text-white placeholder-gray-400"
                    />
                </div>

                <div className="space-y-1">
                    <label className="block text-sm font-medium text-gray-300">Subject *</label>
                    <input
                        type="text"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 text-white placeholder-gray-400"
                    />
                </div>

                <div className="space-y-1">
                    <label className="block text-sm font-medium text-gray-300">Category *</label>
                    <input
                        type="text"
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 text-white placeholder-gray-400"
                    />
                </div>

                <div className="space-y-1">
                    <label className="block text-sm font-medium text-gray-300">Subcategory *</label>
                    <input
                        type="text"
                        name="subcategory"
                        value={formData.subcategory}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 text-white placeholder-gray-400"
                    />
                </div>

                <div className="md:col-span-2 space-y-1">
                    <label className="block text-sm font-medium text-gray-300">Description</label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        rows="3"
                        className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 text-white placeholder-gray-400"
                    />
                </div>

                <div className="space-y-1">
                    <label className="block text-sm font-medium text-gray-300">Number of Pages</label>
                    <input
                        type="number"
                        name="pages"
                        value={formData.pages}
                        onChange={handleChange}
                        min="1"
                        className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 text-white"
                    />
                </div>

                <div className="space-y-1">
                    <label className="block text-sm font-medium text-gray-300">Type</label>
                    <select
                        name="type"
                        value={formData.type}
                        onChange={handleChange}
                        className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 text-white"
                    >
                        <option value="" className="bg-gray-800">Select Type</option>
                        <option value="handwritten" className="bg-gray-800">Handwritten</option>
                        <option value="typed" className="bg-gray-800">Typed</option>
                        <option value="summary" className="bg-gray-800">Summary</option>
                    </select>
                </div>

                <div className="md:col-span-2 space-y-1">
                    <label className="block text-sm font-medium text-gray-300">Note File *</label>
                    <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-600 border-dashed rounded-lg">
                        <div className="space-y-1 text-center">
                            <div className="flex text-sm text-gray-400 justify-center">
                                <label
                                    htmlFor="file-upload"
                                    className="relative cursor-pointer rounded-md font-medium text-teal-400 hover:text-teal-300 focus-within:outline-none"
                                >
                                    <span className='hover:underline'>Upload a file</span>
                                    <input
                                        id="file-upload"
                                        name="file"
                                        type="file"
                                        className="sr-only"
                                        onChange={handleChange}
                                        accept=".pdf,.doc,.docx"
                                        required
                                    /> save
                                </label>
                                <p className="pl-1 text-gray-400">or drag and drop</p>
                            </div>
                            <p className="text-xs text-gray-500">PDF, DOC, DOCX up to 100 MB</p>
                            {filePreview && (
                                <div className="mt-2">
                                    <p className="text-sm text-gray-300">Selected file: {formData.file?.name}</p>
                                    {formData.file?.type.startsWith('image/') && (
                                        <img
                                            src={filePreview}
                                            alt="Preview"
                                            className="mt-2 max-h-40 mx-auto rounded"
                                        />
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex justify-end space-x-3 pt-4">
                <button
                    type="button"
                    onClick={() => {
                        setFormData({
                            title: '',
                            subject: '',
                            category: '',
                            subcategory: '',
                            description: '',
                            pages: '',
                            type: '',
                            file: null,
                        });
                        setFilePreview(null);
                    }}
                    className="px-4 py-2 border border-gray-600 rounded-lg text-gray-300 hover:bg-gray-700 transition-colors"
                >
                    Clear
                </button>
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`px-6 py-2.5 rounded-lg text-white font-medium transition-all ${isSubmitting
                            ? 'bg-gray-600 cursor-not-allowed'
                            : 'bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 shadow-md'
                        }`}
                >
                    {isSubmitting ? (
                        <span className="flex items-center">
                            <svg
                                className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                <circle
                                    className="opacity-25"
                                    cx="12"
                                    cy="12"
                                    r="10"
                                    stroke="currentColor"
                                    strokeWidth="4"
                                ></circle>
                                <path
                                    className="opacity-75"
                                    fill="currentColor"
                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                ></path>
                            </svg>
                            Uploading...
                        </span>
                    ) : (
                        <>
                            <FiUpload className="inline-block mr-2" />
                            Upload Note
                        </>
                    )}
                </button>
            </div>
        </form>
    );
};

export default NoteForm;