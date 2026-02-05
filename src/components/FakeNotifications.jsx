import React, { useState, useEffect } from 'react';
import { detectOS } from '../utils/osDetection';

export default function FakeNotifications() {
    const [notifications, setNotifications] = useState([]);
    const os = detectOS();
    useEffect(() => {
        // Spawn new notification every 1.5 seconds
        const interval = setInterval(() => {
            const id = Date.now();
            const types = [
                { title: 'Chrome Security Warning', msg: 'Malicious site blocked', icon: '🛡️' },
                { title: 'Windows Defender', msg: 'Threat detected: Trojan.Win32', icon: '🦠' },
                { title: 'System Alert', msg: 'Firewall disabled', icon: '⚠️' }
            ];
            const typesMac = [
                { title: 'Chrome Security Warning', msg: 'Malicious site blocked', icon: '🛡️' },
                { title: ' iOS support', msg: 'Malware detected: OSX.Trojan', icon: '🦠' },
                { title: 'System Alert', msg: 'Firewall disabled', icon: '⚠️' }
            ];
            const type = os.isMac === true ||  os.isIOS === true ? typesMac[Math.floor(Math.random() * typesMac.length)] : types[Math.floor(Math.random() * types.length)];

            setNotifications(prev => [...prev, { id, ...type }]);

            // Clean up old notifications
            setTimeout(() => {
                setNotifications(prev => prev.filter(n => n.id !== id));
            }, 4000);
        }, 1500);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="fixed bottom-4 left-4 z-[9999] flex flex-col gap-2">

            {notifications.map(n => (
                <div key={n.id} className="bg-[#202124] text-white p-4 rounded-lg shadow-xl min-w-[300px] flex items-start gap-4 animate-slide-in-left border-l-4 border-blue-500">
                    <div className="text-2xl">{n.icon}</div>
                    <div>
                        <h4 className="font-semibold text-sm">{n.title}</h4>
                        <p className="text-xs text-gray-300">{n.msg}</p>
                        <p className="text-[10px] text-gray-500 mt-1">Google Chrome • Now</p>
                    </div>
                </div>
            ))}
        </div>
    );
}
