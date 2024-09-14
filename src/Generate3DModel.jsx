import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'tailwindcss/tailwind.css'; // Ensure Tailwind CSS is included

const API_URL = "https://api.meshy.ai/v1/image-to-3d";
const API_KEY = "msy_W4m91Z6SBe6kh8oBdRwygnVaj3NMD4iyOEGf";

const Generate3DModel = () => {
    const [imageUrl, setImageUrl] = useState('');
    const [modelUrl, setModelUrl] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [taskId, setTaskId] = useState(null);
    const [uploadedModel, setUploadedModel] = useState(null);

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
                enable_pbr: true,
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
        setLoading(true);
        setError('');
        setModelUrl('');
        setTaskId(null);
        setUploadedModel(null);

        try {
            const taskData = await create3DModelFromImage();
            if (taskData && taskData.result) {
                setTaskId(taskData.result);
                pollTaskStatus(taskData.result);
            } else {
                throw new Error("Task creation failed or 'result' field is missing.");
            }
        } catch (err) {
            setError(`An error occurred: ${err.message}`);
        } finally {
            setLoading(false);
        }
    };

    const pollTaskStatus = (taskId) => {
        const intervalId = setInterval(async () => {
            try {
                const statusData = await checkTaskStatus(taskId);
                if (statusData.status === "SUCCEEDED") {
                    setModelUrl(statusData.model_urls.glb);
                    clearInterval(intervalId);
                } else if (statusData.status === "FAILED") {
                    setError('Task failed.');
                    clearInterval(intervalId);
                }
            } catch (err) {
                setError(`An error occurred while checking task status: ${err.message}`);
                clearInterval(intervalId);
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
        <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
            <h1 className="text-3xl font-bold mb-6 text-gray-800">Generate 3D Model</h1>
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
                <label className="block mb-4">
                    <span className="text-gray-700">Image URL:</span>
                    <input
                        type="text"
                        value={imageUrl}
                        onChange={(e) => setImageUrl(e.target.value)}
                        required
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-opacity-50"
                    />
                </label>
                <button
                    type="submit"
                    disabled={loading}
                    className={`w-full py-2 px-4 rounded-md text-white ${loading ? 'bg-gray-500' : 'bg-blue-500 hover:bg-blue-600'} transition duration-300`}
                >
                    {loading ? 'Generating...' : 'Generate 3D Model'}
                </button>
            </form>
            {error && <p className="mt-4 text-red-600">{error}</p>}
            {modelUrl && (
                <div className="mt-6 bg-white p-6 rounded-lg shadow-lg w-full max-w-md text-center">
                    <h2 className="text-xl font-semibold mb-4">3D Model</h2>
                    <p className="mb-4">Your 3D model is ready. Please download it and then upload it to view.</p>
                    <a
                        href={modelUrl}
                        download="model.glb"
                        className="inline-block py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300"
                    >
                        Download 3D Model
                    </a>
                    <input
                        type="file"
                        accept=".glb"
                        onChange={handleFileUpload}
                        className="mt-4 block w-full"
                    />
                </div>
            )}
            {uploadedModel && (
                <div className="mt-6 w-full max-w-md">
                    <h2 className="text-xl font-semibold mb-4">Uploaded 3D Model</h2>
                    <model-viewer
                        src={uploadedModel}
                        alt="3D Model"
                        auto-rotate
                        camera-controls
                        shadow-intensity="1"
                        style={{ width: '100%', height: '500px' }}
                    ></model-viewer>
                </div>
            )}
        </div>
    );
};

export default Generate3DModel;
