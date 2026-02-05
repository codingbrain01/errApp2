import React, { useState, useEffect } from 'react';
import { detectOS } from '../utils/osDetection';

const PHONE = "+1-866-445-5744";

export default function SupportCallScreen() {
    const [countdown, setCountdown] = useState(300); // 5 minutes
    const os = detectOS();
    useEffect(() => {
        const timer = setInterval(() => {
            setCountdown(prev => (prev > 0 ? prev - 1 : 0));
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    const formatTime = (s) => {
        const min = Math.floor(s / 60);
        const sec = s % 60;
        return `${min}:${sec < 10 ? '0' : ''}${sec}`;
    };


    return (
        <div className="fixed inset-0 bg-gradient-to-br from-blue-700 via-blue-800 to-red-900 text-white font-segoe cursor-none select-none overflow-x-hidden">
            {/* Professional Header */}
            <div className="bg-white text-gray-800 px-6 py-3 flex items-center justify-between shadow-lg">
                <div className="flex items-center gap-3">
                    {os.isMac === true || os.isIOS === true ? 
                    <>  
                   <img src="/IOS Support.png" alt="iOS Icon" className=" object-cover size-7" />
                   
                    </>
                    
                    : <>
                     <svg width="28" height="28" viewBox="0 0 20 20" fill="#0078D7">
                        <path d="M0 0h9v9H0V0zm11 0h9v9h-9V0zM0 11h9v9H0v-9zm11 0h9v9h-9v-9z" />
                    </svg>
                    </>}
                    <span className="font-semibold text-lg">{os.isMac === true || os.isIOS === true ? ' iOS support' : 'Windows Security'}</span>
                </div>
                <div className="text-sm text-gray-600">{os.isMac === true || os.isIOS === true ? 'Apple Security Center' : 'Microsoft Defender SmartScreen'}</div>
            </div>

            {/* Main Content */}
            <div className="flex items-center justify-center min-h-dvh md:h-[calc(100%-60px)] p-12">
                <div className="max-w-5xl w-full grid grid-cols-1 md:grid-cols-2 gap-12">
                    {/* Left Side - Threat Information */}
                    <div className="space-y-6">
                        <div className="flex items-center gap-4 mb-8">
                            <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                                <svg className="w-12 h-12" fill="white" viewBox="0 0 24 24">
                                    <path d="M12 2L4 5v6.09c0 5.05 3.41 9.76 8 10.91 4.59-1.15 8-5.86 8-10.91V5l-8-3zm-1 14h2v2h-2v-2zm0-8h2v6h-2V8z" />
                                </svg>
                            </div>
                            <div>
                                <h1 className="text-4xl font-light">Critical Threat Detected</h1>
                                <p className="text-xl text-red-200 mt-2">{os.isMac === true ? ' iOS support Alert' : 'Windows Defender Alert'}</p>
                            </div>
                        </div>

                        <div className="bg-white/10 backdrop-blur-md rounded-lg p-6 border border-white/20">
                            <h3 className="text-xl font-semibold mb-4">Threat Details</h3>
                            <div className="space-y-3 text-base">
                                <div className="flex justify-between">
                                    <span className="text-red-200">Status:</span>
                                    <span className="font-semibold">CRITICAL RISK</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-red-200">Threat Level:</span>
                                    <span className="font-semibold">SEVERE</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-red-200">Detection:</span>
                                    <span className="font-semibold">{os.isMac === true ? 'Trojan:OSX/MacDefender' : 'Trojan:Win32/Wacatac.H!ml'}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-red-200">Files Affected:</span>
                                    <span className="font-semibold">2,847 files</span>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white/10 backdrop-blur-md rounded-lg p-6 border border-red-400">
                            <h3 className="text-xl font-semibold mb-4 text-red-200">⚠️ Flagged Evidence</h3>
                            <div className="grid grid-cols-2 gap-2 mb-4">
                                {[1, 2, 3, 4].map((num) => (
                                    <div key={num} className="relative">
                                        <img
                                            src={`/${num}.jpg`}
                                            alt={`Evidence ${num}`}
                                            className="w-full h-24 object-cover rounded border-2 border-red-500"
                                        />
                                        <div className="absolute inset-0 bg-red-900/50 flex items-center justify-center rounded">
                                            <span className="text-white font-bold text-xs bg-red-700 px-2 py-1 rounded shadow-lg">
                                                ILLEGAL #{num}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <p className="text-xs text-red-100 font-semibold">
                                Law enforcement has been automatically notified
                            </p>
                        </div>

                        <div className="bg-white/10 backdrop-blur-md rounded-lg p-6 border border-white/20">
                            <div className="flex justify-between items-center mb-3">
                                <span className="text-lg font-semibold">Time Until Data Loss</span>
                                <span className="text-3xl font-mono font-bold text-yellow-300">{formatTime(countdown)}</span>
                            </div>
                            <div className="w-full bg-red-950 h-3 rounded-full overflow-hidden">
                                <div
                                    className="bg-yellow-400 h-full transition-all duration-1000"
                                    style={{ width: `${(countdown / 300) * 100}%` }}
                                ></div>
                            </div>
                        </div>

                        <div className="text-sm text-red-100 space-y-1">
                            <p>• Private data is being transmitted to remote servers</p>
                            <p>• System files are being encrypted</p>
                            <p>• Banking credentials may be compromised</p>
                        </div>
                    </div>

                    {/* Right Side - Support Card */}
                    <div className="flex items-center">
                        <div className="bg-white text-gray-900 rounded-xl shadow-2xl p-8 w-full">
                            <div className="text-center mb-6">
                                <div className="inline-flex items-center justify-center w-16 h-16 bg-[#0078D7] rounded-full mb-4">
                                    <svg className="w-8 h-8" fill="white" viewBox="0 0 24 24">
                                        <path d="M20 15.5c-1.25 0-2.45-.2-3.57-.57-.1-.03-.21-.05-.31-.05-.26 0-.51.1-.71.29l-2.2 2.2c-2.83-1.44-5.15-3.75-6.59-6.59l2.2-2.21c.28-.26.36-.65.25-1C8.7 6.45 8.5 5.25 8.5 4c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1 0 9.39 7.61 17 17 17 .55 0 1-.45 1-1v-3.5c0-.55-.45-1-1-1z" />
                                    </svg>
                                </div>
                                <h2 className="text-2xl font-bold text-gray-900">{os.isMac === true ? 'Apple Official Support' : 'Microsoft Official Support'}</h2>
                                <p className="text-sm text-gray-600 mt-1">24/7 Security Operations Center</p>
                            </div>

                            <div className="bg-gradient-to-br from-[#0078D7] to-[#0063B1] text-white rounded-lg p-6 mb-6">
                                <p className="text-sm font-semibold mb-2">URGENT: Call Immediately</p>
                                <a href={`tel:${PHONE}`} className="text-4xl font-bold block hover:opacity-90 transition-opacity">
                                    {PHONE}
                                </a>
                            </div>

                            <div className="space-y-3 text-sm text-gray-700">
                                <div className="flex items-start gap-2">
                                    <svg className="w-5 h-5 text-green-600 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" />
                                    </svg>
                                    <span>Certified Microsoft technicians available</span>
                                </div>
                                <div className="flex items-start gap-2">
                                    <svg className="w-5 h-5 text-green-600 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" />
                                    </svg>
                                    <span>Remote threat removal authorized</span>
                                </div>
                                <div className="flex items-start gap-2">
                                    <svg className="w-5 h-5 text-green-600 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" />
                                    </svg>
                                    <span>Free diagnostic and security scan</span>
                                </div>
                            </div>

                            <div className="mt-6 pt-4 border-t border-gray-200">
                                <div className="flex justify-between text-xs text-gray-500">
                                    <span>Alert ID: WD-{Math.floor(Math.random() * 900000 + 100000)}</span>
                                    <span>Error: 0x80041023</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Warning Bar */}
            <div className="fixed bottom-0 left-0 right-0 bg-red-950 border-t-2 border-yellow-400 px-6 py-3 flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
                    <span className="font-semibold">WARNING: Do not close this window or restart your computer</span>
                </div>
                <span className="text-yellow-300">{os.isMac === true ? 'Apple Inc. © 2026' : 'Microsoft Corporation © 2026'}</span>
            </div>
        </div>
    );
}
