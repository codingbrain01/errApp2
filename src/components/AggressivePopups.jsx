import React, { useState, useEffect } from 'react';

export default function AggressivePopups() {
    const [visible, setVisible] = useState(true);
    const [count, setCount] = useState(1);

    useEffect(() => {
        // Toggle visibility rapidly (Open/Close loop)
        const interval = setInterval(() => {
            setVisible(prev => !prev);
            if (!visible) setCount(prev => prev + 1);
        }, 800); // Toggle every 800ms
        return () => clearInterval(interval);
    }, [visible]);

    if (!visible) return null;

    return (
        <div className="fixed top-4 left-4 z-[9999] animate-bounce">
            <div className="bg-white border-2 border-blue-600 shadow-2xl rounded-lg w-72 overflow-hidden">
                {/* Header */}
                <div className="bg-blue-600 text-white px-3 py-1 flex justify-between items-center">
                    <span className="text-xs font-bold">Security Alert #{count}</span>
                    <button className="text-xs hover:text-gray-200">X</button>
                </div>
                {/* Body */}
                <div className="p-4 flex items-center gap-3">
                    <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-2xl">⚠️</span>
                    </div>
                    <div>
                        <p className="text-sm font-bold text-gray-800">Threat Detected!</p>
                        <p className="text-xs text-gray-600">Unusual activity from IP: 192.168.1.{100 + count}</p>
                    </div>
                </div>
                {/* Footer */}
                <div className="bg-gray-50 px-3 py-2 border-t border-gray-100 flex justify-end">
                    <button className="bg-blue-600 text-white text-xs px-3 py-1 rounded">Remove</button>
                </div>
            </div>
        </div>
    );
}
