import React, { useState, useEffect } from 'react';

export default function AlertSpam({ onClick }) {
    const [overlays, setOverlays] = useState([1]);

    useEffect(() => {
        const interval = setInterval(() => {
            setOverlays(prev => [...prev, prev.length + 1]);
        }, 2000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center" onClick={onClick}>
            {overlays.map((id, index) => (
                <div
                    key={id}
                    className="absolute bg-white rounded-lg shadow-2xl p-6 max-w-md animate-fade-in"
                    style={{
                        top: `${10 + index * 30}px`,
                        left: `${10 + index * 30}px`,
                        zIndex: 1000 + id
                    }}
                    onClick={onClick}
                >
                    <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">!</div>
                        <div className="flex-1">
                            <h3 className="text-lg font-bold text-red-600 mb-2">CRITICAL ALERT #{id}</h3>
                            <p className="text-sm text-gray-700 mb-1">
                                Multiple threats detected. Immediate action required.
                            </p>
                            <p className="text-lg font-bold text-red-600 mb-3">
                                Call: +1-888-905-8689
                            </p>
                            <button onClick={onClick} className="px-4 py-2 bg-red-600 text-white rounded text-sm font-medium">
                                Fix Now
                            </button>
                        </div>
                    </div>
                </div>
            ))}

            <div className="fixed bottom-0 left-0 right-0 bg-red-600 text-white p-4 text-center z-[2000] animate-pulse">
                <p className="font-bold">⚠ WARNING: Do not close this window! Critical system scan in progress...</p>
            </div>
        </div>
    );
}
