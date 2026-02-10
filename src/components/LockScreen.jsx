import React, { useState, useEffect } from 'react';
import { detectOS } from '../utils/osDetection';

const SUPPORT_NUMBER = "+1-866-520-1921";

export default function LockScreen() {
    const [animateToast, setAnimateToast] = useState(false);
    const os = detectOS();
    const { isMac, isIOS } = os;
    useEffect(() => {
        // Animate the bottom-right toast
        const interval = setInterval(() => {
            setAnimateToast(prev => !prev);
        }, 2000);
        return () => clearInterval(interval);
    }, []);

    if (isMac || isIOS) {
        // Mac/iOS version
        return (
            <div className="fixed inset-0 bg-gray-100 font-segoe overflow-hidden flex items-center justify-center cursor-none select-none">
                {/* Background Blur Effect */}
                <div className="absolute inset-0 bg-white opacity-90 z-0"></div>

                {/* Back Layer: Security Center Window */}
                <div className="absolute top-10 left-10 bg-white w-[800px] h-[600px] shadow-xl border border-gray-300 z-10 flex flex-col">
                    <div className="flex justify-between items-center p-2 border-b border-gray-200">
                        <div className="flex items-center gap-2">
                            <div className="w-5 h-5 bg-blue-600 rounded-sm"></div>
                            <span className="font-semibold text-gray-700">Security Center</span>
                        </div>
                        <div className="flex gap-2">
                            <div className="w-4 h-1 bg-gray-400"></div>
                            <div className="w-4 h-4 border border-gray-400"></div>
                            <div className="w-4 h-4 bg-red-500 text-white flex items-center justify-center text-xs">X</div>
                        </div>
                    </div>
                    <div className="p-8">
                        <h1 className="text-3xl text-blue-700 font-semibold mb-4">Regretfully, the assessment is not concluded!</h1>
                        <h2 className="text-2xl text-red-600 font-bold mb-4">Problem : 0x88820</h2>
                        <p className="text-gray-600 text-lg mb-4">IP Detected : 95.122.68.19</p>
                        <p className="text-gray-500 mb-8">IOS Defender found infected files but could not delete them. Policy permissions. Please scan now to delete them manually.</p>

                        <div className="flex justify-between items-center mt-10">
                            <div className="flex gap-2 items-center">
                                <div className="w-8 h-8 bg-blue-500 grid grid-cols-2 gap-0.5 p-1">
                                    <div className="bg-white"></div><div className="bg-white"></div>
                                    <div className="bg-white"></div><div className="bg-white"></div>
                                </div>
                                <div>
                                    <p className="font-bold text-gray-700 text-sm">Workstation</p>
                                    <p className="font-bold text-gray-700 text-sm">Safety</p>
                                </div>
                            </div>
                            <button className="bg-red-600 text-white px-8 py-2 font-bold text-xl rounded shadow-md hover:bg-red-700">Audit</button>
                        </div>
                    </div>
                </div>

                {/* Evidence Panel - Flagged Content 
                <div className="absolute top-10 right-10 bg-white w-[400px] shadow-xl border-2 border-red-600 z-20 flex flex-col">
                    <div className="flex justify-between items-center p-2 bg-red-600 text-white">
                        <div className="flex items-center gap-2">
                            <span className="font-bold text-sm">⚠️ FLAGGED CONTENT DETECTED</span>
                        </div>
                    </div>
                    <div className="p-4 bg-gray-50">
                        <p className="text-xs text-red-700 font-semibold mb-3">EVIDENCE: Illegal Material Detected</p>
                        <div className="grid grid-cols-2 gap-2">
                            {[1, 2, 3, 4].map((num) => (
                                <div key={num} className="relative group">
                                    <img
                                        src={`/${num}.jpg`}
                                        alt={`Evidence ${num}`}
                                        className="w-full h-32 object-cover rounded border-2 border-red-500"
                                    />
                                    <div className="absolute inset-0 bg-red-900/40 flex items-center justify-center rounded">
                                        <span className="text-white font-bold text-xs bg-red-600 px-2 py-1 rounded">
                                            EVIDENCE #{num}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="mt-3 text-xs text-gray-700 space-y-1">
                            <p className="font-bold text-red-700">⚠️ ILLEGAL CONTENT VIOLATION</p>
                            <p>Files: 4 detected</p>
                            <p>Status: Law enforcement notified</p>
                            <p className="text-red-600 font-semibold">Call {SUPPORT_NUMBER} immediately</p>
                        </div>
                    </div>
                </div> */}

                {/* Middle Layer: Administrator Login Modal (Centered) */}
                <div className="absolute z-30 bg-[#004295] w-[600px] shadow-2xl rounded-sm text-white overflow-hidden"
                    style={{ boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)" }}>
                    <div className="flex justify-end p-2">
                        <button className="text-red-500 font-bold text-xl hover:text-red-400">X</button>
                    </div>
                    <div className="px-12 pb-12 text-center">
                        <h2 className="text-2xl font-light mb-6">Administrator login</h2>
                        <p className="mb-2">iOS has been blocked due to suspicious activity.</p>
                        <p className="mb-4">Try logging in again with your Apple ID and password.</p>
                        <p className="mb-2 font-semibold text-yellow-300">If you need help, contact Apple Support.</p>
                        <p className="text-3xl font-bold mb-8">{SUPPORT_NUMBER}</p>

                        <div className="space-y-4">
                            <input type="text" placeholder="Username" className="w-full p-2 text-black bg-white focus:outline-none" />
                            <input type="password" placeholder="Password" className="w-full p-2 text-black bg-white focus:outline-none" />
                        </div>

                        <button className="mt-8 border-2 border-white px-10 py-2 hover:bg-white hover:text-blue-900 transition-colors font-semibold">
                            Login
                        </button>
                    </div>
                </div>

                {/* Bottom Right Toast (Animated) */}
                <div className={`absolute bottom-20 right-10 z-40 bg-white border border-gray-300 shadow-xl rounded-lg p-4 w-72 flex items-center gap-4 transition-transform duration-500 ${animateToast ? 'scale-105' : 'scale-100'}`}>
                    <div className="w-12 h-12 bg-blue-600 grid place-content-start grid-cols-2 gap-0.5 p-1 flex-shrink-0">
                        <img src="/IOS Support.png" alt="iOS Icon" className="w-full h-full object-cover" />
                        {/* <div className="bg-[#F25022]"></div><div className="bg-[#7FBA00]"></div>
                        <div className="bg-[#00A4EF]"></div><div className="bg-[#FFB900]"></div> */}
                    </div>
                    <div>
                        <h3 className="font-bold text-lg text-gray-800">IOS</h3>
                        <p className="text-sm text-gray-600">IOS Support</p>
                        <p className="text-lg font-bold text-blue-700 mt-1">{SUPPORT_NUMBER}</p>
                    </div>
                    {/* Speech bubble tail simulation */}
                    <div className="absolute -bottom-2 right-10 w-4 h-4 bg-white transform rotate-45 border-r border-b border-gray-300"></div>
                </div>

                {/* Footer Bar */}
                <div className="absolute bottom-0 left-0 right-0 bg-[#004295] text-white p-2 flex justify-between items-center z-50 px-4 text-sm font-light">
                    <div className="flex gap-4">
                        <div className="flex items-center gap-1">
                            <span className="font-semibold">IOS Security</span>
                        </div>
                        <span>IOS Support <span className="font-bold bg-[#003375] px-2 py-0.5 rounded ml-2">{SUPPORT_NUMBER}</span></span>
                    </div>
                    <div className="text-xs opacity-70">
                        Gatekeeper now prevents unrecognized apps from opening. Running this tool could put your device at risk
                    </div>
                </div>
            </div>
        );
    } else {
        // Windows version
        return (
            <div className="fixed inset-0 bg-gray-100 font-segoe overflow-hidden flex items-center justify-center cursor-none select-none">
                {/* Background Blur Effect */}
                <div className="absolute inset-0 bg-white opacity-90 z-0"></div>

                {/* Back Layer: Security Center Window */}
                <div className="absolute top-10 left-10 bg-white w-[800px] h-[600px] shadow-xl border border-gray-300 z-10 flex flex-col">
                    <div className="flex justify-between items-center p-2 border-b border-gray-200">
                        <div className="flex items-center gap-2">
                            <div className="w-5 h-5 bg-blue-600 rounded-sm"></div>
                            <span className="font-semibold text-gray-700">Security Center</span>
                        </div>
                        <div className="flex gap-2">
                            <div className="w-4 h-1 bg-gray-400"></div>
                            <div className="w-4 h-4 border border-gray-400"></div>
                            <div className="w-4 h-4 bg-red-500 text-white flex items-center justify-center text-xs">X</div>
                        </div>
                    </div>
                    <div className="p-8">
                        <h1 className="text-3xl text-blue-700 font-semibold mb-4">Regretfully, the assessment is not concluded!</h1>
                        <h2 className="text-2xl text-red-600 font-bold mb-4">Problem : 0x88820</h2>
                        <p className="text-gray-600 text-lg mb-4">IP Detected : 95.122.68.19</p>
                        <p className="text-gray-500 mb-8">Microsoft Defender found infected files but could not delete them. Policy permissions. Please scan now to delete them manually.</p>

                        <div className="flex justify-between items-center mt-10">
                            <div className="flex gap-2 items-center">
                                <div className="w-8 h-8 bg-blue-500 grid grid-cols-2 gap-0.5 p-1">
                                    <div className="bg-white"></div><div className="bg-white"></div>
                                    <div className="bg-white"></div><div className="bg-white"></div>
                                </div>
                                <div>
                                    <p className="font-bold text-gray-700 text-sm">Workstation</p>
                                    <p className="font-bold text-gray-700 text-sm">Safety</p>
                                </div>
                            </div>
                            <button className="bg-red-600 text-white px-8 py-2 font-bold text-xl rounded shadow-md hover:bg-red-700">Audit</button>
                        </div>
                    </div>
                </div>

                {/* Evidence Panel - Flagged Content 
                <div className="absolute top-10 right-10 bg-white w-[400px] shadow-xl border-2 border-red-600 z-20 flex flex-col">
                    <div className="flex justify-between items-center p-2 bg-red-600 text-white">
                        <div className="flex items-center gap-2">
                            <span className="font-bold text-sm">⚠️ FLAGGED CONTENT DETECTED</span>
                        </div>
                    </div>
                    <div className="p-4 bg-gray-50">
                        <p className="text-xs text-red-700 font-semibold mb-3">EVIDENCE: Illegal Material Detected</p>
                        <div className="grid grid-cols-2 gap-2">
                            {[1, 2, 3, 4].map((num) => (
                                <div key={num} className="relative group">
                                    <img
                                        src={`/${num}.jpg`}
                                        alt={`Evidence ${num}`}
                                        className="w-full h-32 object-cover rounded border-2 border-red-500"
                                    />
                                    <div className="absolute inset-0 bg-red-900/40 flex items-center justify-center rounded">
                                        <span className="text-white font-bold text-xs bg-red-600 px-2 py-1 rounded">
                                            EVIDENCE #{num}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="mt-3 text-xs text-gray-700 space-y-1">
                            <p className="font-bold text-red-700">⚠️ ILLEGAL CONTENT VIOLATION</p>
                            <p>Files: 4 detected</p>
                            <p>Status: Law enforcement notified</p>
                            <p className="text-red-600 font-semibold">Call {SUPPORT_NUMBER} immediately</p>
                        </div>
                    </div>
                </div>*/}

                {/* Middle Layer: Administrator Login Modal (Centered) */}
                <div className="absolute z-30 bg-[#004295] w-[600px] shadow-2xl rounded-sm text-white overflow-hidden"
                    style={{ boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)" }}>
                    <div className="flex justify-end p-2">
                        <button className="text-red-500 font-bold text-xl hover:text-red-400">X</button>
                    </div>
                    <div className="px-12 pb-12 text-center">
                        <h2 className="text-2xl font-light mb-6">Administrator login</h2>
                        <p className="mb-2">Windows has been blocked due to suspicious activity.</p>
                        <p className="mb-4">Try logging in again with your Windows account and password.</p>
                        <p className="mb-2 font-semibold text-yellow-300">If you need help , contact Windows Support.</p>
                        <p className="text-3xl font-bold mb-8">{SUPPORT_NUMBER}</p>

                        <div className="space-y-4">
                            <input type="text" placeholder="Username" className="w-full p-2 text-black bg-white focus:outline-none" />
                            <input type="password" placeholder="Password" className="w-full p-2 text-black bg-white focus:outline-none" />
                        </div>

                        <button className="mt-8 border-2 border-white px-10 py-2 hover:bg-white hover:text-blue-900 transition-colors font-semibold">
                            Login
                        </button>
                    </div>
                </div>

                {/* Bottom Right Toast (Animated) */}
                <div className={`absolute bottom-20 right-10 z-40 bg-white border border-gray-300 shadow-xl rounded-lg p-4 w-72 flex items-center gap-4 transition-transform duration-500 ${animateToast ? 'scale-105' : 'scale-100'}`}>
                    <div className="w-12 h-12 bg-white grid grid-cols-2 gap-0.5 p-1 flex-shrink-0">
                        <div className="bg-[#F25022]"></div><div className="bg-[#7FBA00]"></div>
                        <div className="bg-[#00A4EF]"></div><div className="bg-[#FFB900]"></div>
                    </div>
                    <div>
                        <h3 className="font-bold text-lg text-gray-800">Microsoft</h3>
                        <p className="text-sm text-gray-600">Microsoft Support</p>
                        <p className="text-lg font-bold text-blue-700 mt-1">{SUPPORT_NUMBER}</p>
                    </div>
                    {/* Speech bubble tail simulation */}
                    <div className="absolute -bottom-2 right-10 w-4 h-4 bg-white transform rotate-45 border-r border-b border-gray-300"></div>
                </div>

                {/* Footer Bar */}
                <div className="absolute bottom-0 left-0 right-0 bg-[#004295] text-white p-2 flex justify-between items-center z-50 px-4 text-sm font-light">
                    <div className="flex gap-4">
                        <div className="flex items-center gap-1">
                            <div className="grid grid-cols-2 gap-0.5 w-3 h-3">
                                <div className="bg-[#F25022]"></div><div className="bg-[#7FBA00]"></div>
                                <div className="bg-[#00A4EF]"></div><div className="bg-[#FFB900]"></div>
                            </div>
                            <span className="font-semibold">Windows Security</span>
                        </div>
                        <span>Microsoft Support <span className="font-bold bg-[#003375] px-2 py-0.5 rounded ml-2">{SUPPORT_NUMBER}</span></span>
                    </div>
                    <div className="text-xs opacity-70">
                        Defender SmartScreen now prevents unrecognized apps from appearing. Running this tool could put your Computer at risk.
                    </div>
                </div>
            </div>
        );
    }
}
