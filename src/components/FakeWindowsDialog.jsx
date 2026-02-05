import React, { useState } from 'react';
import { detectOS } from '../utils/osDetection';

export default function FakeWindowsDialog({ onClick }) {
    const [progress, setProgress] = useState(0);
      const os = detectOS();
    console.log(os,"os");
    React.useEffect(() => {
        const interval = setInterval(() => {
            setProgress(prev => (prev >= 100 ? 0 : prev + 1));
        }, 100);
        return () => clearInterval(interval);
    }, []);
 if (os.isMac === true || os.isIOS === true) (
     <div className="fixed inset-0 bg-[#0078D7] flex items-center justify-center p-4" onClick={onClick}>
            <div className="bg-white max-w-2xl w-full rounded-sm shadow-2xl" onClick={onClick}>
                <div className="bg-[#0078D7] px-4 py-3 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="white">
                            <path d="M0 0h9v9H0V0zm11 0h9v9h-9V0zM0 11h9v9H0v-9zm11 0h9v9h-9v-9z" />
                        </svg>
                        <span className="text-white font-semibold" style={{ fontFamily: "'Segoe UI', sans-serif" }}>
                            iOS Security
                        </span>
                    </div>
                </div>

                <div className="p-6" style={{ fontFamily: "'Segoe UI', sans-serif" }}>
                    <div className="flex items-start gap-4 mb-6">
                        <div className="flex-shrink-0">
                            <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                                <circle cx="24" cy="24" r="24" fill="#FFD700" />
                                <path d="M24 10v20M24 34v2" stroke="#000" strokeWidth="3" strokeLinecap="round" />
                            </svg>
                        </div>
                        <div className="flex-1">
                            <h2 className="text-xl font-semibold mb-3 text-gray-900">
                                iOS Defender - Critical Alert
                            </h2>
                            <p className="text-sm text-gray-700 mb-2">
                                **Threat Detected:** Trojan.Win32.Generic
                            </p>
                            <p className="text-sm text-gray-700 mb-4">
                                iOS Security has detected potentially harmful software. Your system is at risk.
                            </p>

                            <div className="mb-4">
                                <div className="flex justify-between text-xs text-gray-600 mb-1">
                                    <span>Scanning system files...</span>
                                    <span>{progress}%</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2.5">
                                    <div className="bg-[#0078D7] h-2.5 rounded-full transition-all" style={{ width: `${progress}%` }}></div>
                                </div>
                            </div>

                            <div className="bg-yellow-50 border border-yellow-200 rounded p-3">
                                <p className="text-sm text-yellow-800">
                                    <strong>⚠ WARNING:</strong> PERSONAL DATA COMPROMISED
                                </p>
                                <p className="text-lg font-bold text-red-600 mt-2">
                                    Call Support: +1-866-445-5744
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-end gap-3">
                        <button onClick={onClick} className="px-6 py-2 bg-[#0078D7] hover:bg-[#006CC1] text-white rounded text-sm font-medium">
                            Scan Now
                        </button>
                    </div>
                </div>
            </div>
        </div>
 );
    return (
        <div className="fixed inset-0 bg-[#0078D7] flex items-center justify-center p-4" onClick={onClick}>
            <div className="bg-white max-w-2xl w-full rounded-sm shadow-2xl" onClick={onClick}>
                <div className="bg-[#0078D7] px-4 py-3 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="white">
                            <path d="M0 0h9v9H0V0zm11 0h9v9h-9V0zM0 11h9v9H0v-9zm11 0h9v9h-9v-9z" />
                        </svg>
                        <span className="text-white font-semibold" style={{ fontFamily: "'Segoe UI', sans-serif" }}>
                            Windows Security
                        </span>
                    </div>
                </div>

                <div className="p-6" style={{ fontFamily: "'Segoe UI', sans-serif" }}>
                    <div className="flex items-start gap-4 mb-6">
                        <div className="flex-shrink-0">
                            <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                                <circle cx="24" cy="24" r="24" fill="#FFD700" />
                                <path d="M24 10v20M24 34v2" stroke="#000" strokeWidth="3" strokeLinecap="round" />
                            </svg>
                        </div>
                        <div className="flex-1">
                            <h2 className="text-xl font-semibold mb-3 text-gray-900">
                                Windows Defender - Critical Alert
                            </h2>
                            <p className="text-sm text-gray-700 mb-2">
                                **Threat Detected:** Trojan.Win32.Generic
                            </p>
                            <p className="text-sm text-gray-700 mb-4">
                                Windows Security has detected potentially harmful software. Your system is at risk.
                            </p>

                            <div className="mb-4">
                                <div className="flex justify-between text-xs text-gray-600 mb-1">
                                    <span>Scanning system files...</span>
                                    <span>{progress}%</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2.5">
                                    <div className="bg-[#0078D7] h-2.5 rounded-full transition-all" style={{ width: `${progress}%` }}></div>
                                </div>
                            </div>

                            <div className="bg-yellow-50 border border-yellow-200 rounded p-3">
                                <p className="text-sm text-yellow-800">
                                    <strong>⚠ WARNING:</strong> PERSONAL DATA COMPROMISED
                                </p>
                                <p className="text-lg font-bold text-red-600 mt-2">
                                    Call Support: +1-888-905-8689
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-end gap-3">
                        <button onClick={onClick} className="px-6 py-2 bg-[#0078D7] hover:bg-[#006CC1] text-white rounded text-sm font-medium">
                            Scan Now
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
