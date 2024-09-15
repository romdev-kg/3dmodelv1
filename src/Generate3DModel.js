import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ChevronDown, Upload, Download, RefreshCw, Crop } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';


const API_URL = "https://api.meshy.ai/v1/image-to-3d";
const API_KEY = "msy_W4m91Z6SBe6kh8oBdRwygnVaj3NMD4iyOEGf";

const Generate3DModel = () => {
    const [imageUrl, setImageUrl] = useState('');
    const [modelUrl, setModelUrl] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [, setTaskId] = useState(null);
    const [uploadedModel, setUploadedModel] = useState(null);
    const [isExpanded, setIsExpanded] = useState(false);

    const headers = { 
        "Authorization": `Bearer ${API_KEY}`,
        "Accept": "application/json",
    };

    useEffect(() => {
        const script = document.createElement('script');
        script.src = 'https://unpkg.com/@google/model-viewer/dist/model-viewer.min.js';
        script.type = 'module';
        script.async = true;
        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, []);

    const create3DModelFromImage = async () => {
        try {
            const payload = {
                image_url: imageUrl,
                enable_pbr: true, // Enables physically based rendering for more realistic lighting/material
            };
            const response = await axios.post(API_URL, payload, { headers, timeout: 60000 });
            return response.data;
        } catch (err) {
            throw new Error(err.response?.data?.error || err.message);
        }
    };
    

    const checkTaskStatus = async (taskId) => {
        try {
            const statusUrl = `${API_URL}/${taskId}`;
            const response = await axios.get(statusUrl, { headers, timeout: 60000 });
            return response.data;
        } catch (err) {
            throw new Error(err.response?.data?.error || err.message);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);  // Keep loading true until task completion
        setError('');
        setModelUrl('');
        setTaskId(null);
        setUploadedModel(null);
    
        try {
            const taskData = await create3DModelFromImage();
            if (taskData && taskData.result) {
                setTaskId(taskData.result);
                pollTaskStatus(taskData.result); // This will maintain loading state until process finishes
            } else {
                throw new Error("Task creation failed or 'result' field is missing.");
            }
        } catch (err) {
            setError(`An error occurred: ${err.message}`);
            setLoading(false); // Stop loading if there is an error
        }
    };
    
    const pollTaskStatus = (taskId) => {
        const intervalId = setInterval(async () => {
            try {
                const statusData = await checkTaskStatus(taskId);
                if (statusData.status === "SUCCEEDED") {
                    setModelUrl(statusData.model_urls.glb);
                    clearInterval(intervalId);
                    setLoading(false); // Stop loading when the task succeeds
                } else if (statusData.status === "FAILED") {
                    setError('Task failed.');
                    clearInterval(intervalId);
                    setLoading(false); // Stop loading if the task fails
                }
            } catch (err) {
                setError(`An error occurred while checking task status: ${err.message}`);
                clearInterval(intervalId);
                setLoading(false); // Stop loading on error
            }
        }, 5000);
    };
    

    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const objectUrl = URL.createObjectURL(file);
            setUploadedModel(objectUrl);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br  from-gray-900 via-blue-900 to-purple-900 text-white flex flex-col items-center p-6 font-sans">
        <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center mb-12"
        >
            <h1 className="text-5xl font-extrabold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
                3D Model Generator
            </h1>
            <p className="text-lg text-blue-200 opacity-80">Transform your images into stunning 3D models</p>
        </motion.div>

        <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg p-8 rounded-2xl shadow-2xl w-full max-w-md border border-white border-opacity-20"
        >
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="relative">
                    <input
                        type="text"
                        value={imageUrl}
                        onChange={(e) => setImageUrl(e.target.value)}
                        required
                        className="w-full px-4 py-3 bg-white bg-opacity-20 border border-white border-opacity-30 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-blue-200 placeholder-opacity-70 transition duration-300"
                        placeholder="Enter image URL"
                    />
                    <Upload className="absolute right-3 top-3 text-blue-300" size={20} />
                </div>
                <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    disabled={loading}
                    className={`w-full py-3 px-4 rounded-lg text-white font-semibold flex items-center justify-center ${
                        loading 
                            ? 'bg-gray-500 cursor-not-allowed' 
                            : 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700'
                    } transition duration-300 shadow-lg`}
                >
                    {loading ? <RefreshCw className="animate-spin mr-2" size={20} /> : <Crop className="mr-2" size={20} />}
                    {loading ? 'Generating...' : 'Generate 3D Model'}
                </motion.button>
            </form>
        </motion.div>
        
        <AnimatePresence>
            {error && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5 }}
                    className="mt-6 w-full max-w-md bg-red-500 bg-opacity-90 text-white p-4 rounded-lg shadow-lg"
                >
                    {error}
                </motion.div>
            )}
        </AnimatePresence>

        <AnimatePresence>
            {modelUrl && (
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5 }}
                    className="mt-8 bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg p-6 rounded-2xl shadow-2xl w-full max-w-md border border-white border-opacity-20 text-center"
                >
                    <h2 className="text-2xl font-bold mb-4 text-blue-300">3D Model Ready</h2>
                    <p className="mb-6 text-blue-100 opacity-80">Your 3D model is ready. Download and upload to view.</p>
                    <motion.a
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        href={modelUrl}
                        download="model.glb"
                        className=" py-3 px-6 bg-gradient-to-r from-green-400 to-blue-500 text-white rounded-lg hover:from-green-500 hover:to-blue-600 transition duration-300 shadow-md flex items-center justify-center"
                    >
                        <Download className="mr-2" size={20} />
                        Download 3D Model
                    </motion.a>
                    <div className="mt-6 relative">
                        <input
                            type="file"
                            accept=".glb"
                            onChange={handleFileUpload}
                            className="opacity-0 absolute inset-0 w-full h-full cursor-pointer"
                        />
                        <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 px-6 rounded-lg hover:from-purple-600 hover:to-pink-600 transition duration-300 shadow-md flex items-center justify-center cursor-pointer">
                            <Upload className="mr-2" size={20} />
                            Upload 3D Model
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
        
        <AnimatePresence>
            {uploadedModel && (
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5 }}
                    className="mt-8 w-full max-w-md"
                >
                    <div className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg p-6 rounded-2xl shadow-2xl border border-white border-opacity-20">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-2xl font-bold text-blue-300">Uploaded 3D Model</h2>
                            <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => setIsExpanded(!isExpanded)}
                                className="text-blue-300 hover:text-white transition-colors duration-200"
                            >
                                <ChevronDown 
                                    size={24}
                                    style={{ transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.3s ease-in-out' }}
                                />
                            </motion.button>
                        </div>
                        <motion.div
                            initial={false}
                            animate={{ height: isExpanded ? 'auto' : 0, opacity: isExpanded ? 1 : 0 }}
                            transition={{ duration: 0.3 }}
                            style={{ overflow: 'hidden' }}
                        >
                            <model-viewer
                                src={uploadedModel}
                                alt="3D Model"
                                auto-rotate
                                camera-controls
                                shadow-intensity="1"
                                style={{ width: '100%', height: '400px', backgroundColor: 'rgba(30, 41, 59, 0.8)', borderRadius: '0.5rem' }}
                            ></model-viewer>
                        </motion.div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    </div>
    );
};

export default Generate3DModel;
