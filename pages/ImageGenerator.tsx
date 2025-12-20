
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { GoogleGenAI } from '@google/genai';
import { Sparkles, Image as ImageIcon, Loader, AlertCircle, Key } from 'lucide-react';

const PageWrapper = ({ children }: { children: React.ReactNode }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8"
    >
        {children}
    </motion.div>
);

type ImageSize = "1K" | "2K" | "4K";

const ImageGenerator = () => {
    const [apiKeyReady, setApiKeyReady] = useState(false);
    const [prompt, setPrompt] = useState('');
    const [imageSize, setImageSize] = useState<ImageSize>('1K');
    const [generatedImage, setGeneratedImage] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const checkKey = async () => {
            if (window.aistudio) {
                const hasKey = await window.aistudio.hasSelectedApiKey();
                setApiKeyReady(hasKey);
            }
        };
        checkKey();
    }, []);
    
    const handleSelectKey = async () => {
        if (window.aistudio) {
            await window.aistudio.openSelectKey();
            // Assume success and update UI immediately as per guidelines
            setApiKeyReady(true);
        }
    };

    const handleGenerateImage = async () => {
        if (!prompt.trim()) {
            setError("Please enter a prompt.");
            return;
        }

        setLoading(true);
        setError(null);
        setGeneratedImage(null);

        try {
            // Create a new instance right before the call
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });
            
            const response = await ai.models.generateContent({
                model: 'gemini-3-pro-image-preview',
                contents: {
                    parts: [{ text: prompt }],
                },
                config: {
                    imageConfig: {
                        imageSize: imageSize,
                        aspectRatio: "1:1"
                    },
                },
            });

            let imageFound = false;
            if (response.candidates && response.candidates.length > 0) {
                for (const part of response.candidates[0].content.parts) {
                    if (part.inlineData) {
                        const base64EncodeString = part.inlineData.data;
                        const imageUrl = `data:image/png;base64,${base64EncodeString}`;
                        setGeneratedImage(imageUrl);
                        imageFound = true;
                        break;
                    }
                }
            }

            if (!imageFound) {
                setError("Image generation failed. The model did not return an image.");
            }

        } catch (e: any) {
            console.error(e);
            if (e.message?.includes("Requested entity was not found")) {
                setError("Your API Key is invalid or not configured for this model. Please select a valid key.");
                setApiKeyReady(false);
            } else {
                setError(`An error occurred: ${e.message}`);
            }
        } finally {
            setLoading(false);
        }
    };

    if (!apiKeyReady) {
        return (
            <PageWrapper>
                <div className="text-center max-w-lg mx-auto bg-white p-8 rounded-2xl shadow-lg">
                    <Key className="w-12 h-12 mx-auto text-emerald-500 mb-4" />
                    <h2 className="text-2xl font-bold text-gray-800">API Key Required</h2>
                    <p className="text-gray-600 mt-2 mb-6">
                        The Nano Banana Pro model requires a paid API key. Please select one from a paid GCP project to continue.
                    </p>
                    <motion.button
                        onClick={handleSelectKey}
                        className="px-6 py-3 bg-emerald-600 text-white font-bold rounded-xl shadow-lg hover:bg-emerald-700 transition-all"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        Select API Key
                    </motion.button>
                     <p className="text-xs text-gray-500 mt-4">
                        For more information, see the <a href="https://ai.google.dev/gemini-api/docs/billing" target="_blank" rel="noopener noreferrer" className="underline hover:text-emerald-600">billing documentation</a>.
                    </p>
                </div>
            </PageWrapper>
        );
    }

    return (
        <PageWrapper>
            <div className="text-center mb-12">
                <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">AI Image Generator</h1>
                <p className="mt-4 text-lg text-gray-600">Bring your ideas to life with Gemini.</p>
            </div>
            
            <div className="max-w-2xl mx-auto bg-white p-8 rounded-2xl shadow-xl">
                <div className="space-y-6">
                    <div>
                        <label htmlFor="prompt" className="block text-sm font-medium text-gray-700 mb-1">Your Prompt</label>
                        <textarea
                            id="prompt"
                            rows={3}
                            value={prompt}
                            onChange={(e) => setPrompt(e.target.value)}
                            className="w-full p-3 border-2 border-gray-200 rounded-lg focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                            placeholder="e.g., A 3D illustration of a robot recycling a laptop"
                        />
                    </div>
                    
                    <div>
                         <label className="block text-sm font-medium text-gray-700 mb-2">Image Size</label>
                         <div className="flex justify-center gap-4">
                            {(['1K', '2K', '4K'] as ImageSize[]).map((size) => (
                                <motion.button
                                    key={size}
                                    onClick={() => setImageSize(size)}
                                    className={`px-6 py-2 rounded-full font-semibold text-sm transition-all border-2 ${imageSize === size ? 'bg-emerald-600 text-white border-emerald-600' : 'bg-white text-gray-700 border-gray-300 hover:border-emerald-500'}`}
                                    whileHover={{scale: 1.05}}
                                    whileTap={{scale: 0.95}}
                                >
                                    {size}
                                </motion.button>
                            ))}
                         </div>
                    </div>
                    
                    <motion.button
                        onClick={handleGenerateImage}
                        disabled={loading}
                        className="w-full flex items-center justify-center gap-2 py-4 px-4 bg-emerald-600 text-white rounded-xl font-semibold text-lg shadow-lg hover:bg-emerald-700 transition-all disabled:bg-gray-400"
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                    >
                        {loading ? (
                            <>
                                <Loader className="w-5 h-5 animate-spin" />
                                Generating...
                            </>
                        ) : (
                             <>
                                <Sparkles className="w-5 h-5" />
                                Generate Image
                            </>
                        )}
                    </motion.button>
                </div>
            </div>

            {error && (
                <motion.div 
                    initial={{opacity: 0, y: 10}}
                    animate={{opacity: 1, y: 0}}
                    className="max-w-2xl mx-auto mt-6 bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-lg flex items-center gap-3"
                >
                    <AlertCircle className="w-5 h-5"/>
                    <p>{error}</p>
                </motion.div>
            )}

            <div className="mt-8 max-w-2xl mx-auto">
                {loading && (
                     <motion.div 
                        initial={{opacity: 0}}
                        animate={{opacity: 1}}
                        className="aspect-square w-full bg-gray-200 rounded-2xl animate-pulse flex items-center justify-center"
                     >
                        <ImageIcon className="w-16 h-16 text-gray-400"/>
                     </motion.div>
                )}
                {generatedImage && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                    >
                        <img src={generatedImage} alt="Generated by AI" className="w-full h-auto rounded-2xl shadow-2xl" />
                    </motion.div>
                )}
            </div>
        </PageWrapper>
    );
};

export default ImageGenerator;
