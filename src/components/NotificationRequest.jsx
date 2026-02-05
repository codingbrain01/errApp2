import React, { useEffect, useState } from 'react';

export default function NotificationRequest({ onClick, onPermissionGranted }) {
    const [permission, setPermission] = useState(Notification.permission);

    const requestNotification = async () => {
        if ('Notification' in window) {
            const result = await Notification.requestPermission();
            setPermission(result);

            if (result === 'granted') {
                onPermissionGranted?.();
                new Notification('🔴 SECURITY ALERT', {
                    body: 'Critical threat detected. Click to view details.',
                    requireInteraction: true
                });
            }
        }
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            if (permission === 'default') requestNotification();
        }, 1000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="fixed inset-0 bg-black bg-opacity-70 backdrop-blur-sm flex items-center justify-center p-4" onClick={onClick}>
            <div className="bg-white rounded-lg shadow-2xl max-w-md w-full p-6">
                <div className="text-center">
                    <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                        <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                        </svg>
                    </div>

                    <h2 className="text-xl font-bold text-gray-900 mb-2">Enable Security Notifications</h2>
                    <p className="text-sm text-gray-600 mb-6">
                        Stay informed about critical security threats on your system.
                    </p>

                    {permission === 'default' && (
                        <button onClick={requestNotification} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-md mb-2">
                            Enable Notifications
                        </button>
                    )}

                    {permission === 'granted' && (
                        <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-4">
                            <p className="text-sm text-green-800 font-medium">✓ Notifications enabled</p>
                        </div>
                    )}

                    <button onClick={onClick} className="w-full bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-3 px-4 rounded-md">
                        Continue
                    </button>
                </div>
            </div>
        </div>
    );
}
