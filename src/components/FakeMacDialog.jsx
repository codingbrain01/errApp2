import React from 'react';

export default function FakeMacDialog({ onClick }) {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm flex items-center justify-center p-4" onClick={onClick}>
            <div className="bg-white max-w-md w-full rounded-xl shadow-2xl" style={{ fontFamily: "-apple-system, 'SF Pro Display', sans-serif" }}>
                <div className="pt-8 pb-4 flex justify-center">
                    <svg width="64" height="64" viewBox="0 0 64 64">
                        <circle cx="32" cy="32" r="32" fill="#FFB800" />
                        <path d="M32 18v20M32 44v2" stroke="white" strokeWidth="4" strokeLinecap="round" />
                    </svg>
                </div>

                <div className="px-8 pb-6 text-center">
                    <h2 className="text-xl font-semibold mb-3 text-gray-900">Security Alert</h2>
                    <p className="text-sm text-gray-700 mb-2">
                        System Integrity Protection has detected unauthorized access attempts.
                    </p>
                    <p className="text-sm text-gray-700 mb-4">
                        Your Mac may be at risk. Click "Details" to review.
                    </p>

                    <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
                        <p className="text-xs text-red-800">
                            <strong>Critical:</strong> Malware activity detected
                        </p>
                        <p className="text-sm font-bold text-red-700 mt-1">
                            Contact Apple Support: +1-888-905-8689
                        </p>
                    </div>

                    <div className="text-xs text-gray-500 mb-6">Location: /System/Library/CoreServices</div>
                </div>

                <div className="border-t border-gray-200 flex">
                    <button onClick={onClick} className="flex-1 py-3 text-sm font-medium text-[#007AFF] hover:bg-gray-50">
                        Cancel
                    </button>
                    <div className="w-px bg-gray-200"></div>
                    <button onClick={onClick} className="flex-1 py-3 text-sm font-semibold text-[#007AFF] hover:bg-gray-50">
                        Details
                    </button>
                </div>
            </div>
        </div>
    );
}
