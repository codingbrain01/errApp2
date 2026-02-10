import React, { useState, useEffect } from 'react';
import { detectOS } from '../utils/osDetection';

const NUMBER = "+1-866-520-1921";

export default function ProfessionalOverlay() {
    // We will cycle through these visual states
    const [visible, setVisible] = useState(true);
      const os = detectOS();
     
    useEffect(() => {
        const interval = setInterval(() => {
            setVisible(v => !v);
        }, 1500); // Slower, more deliberate loop
        return () => clearInterval(interval);
    }, []);

    if (!visible) return null;

    // Common styles for a "Windows 11" style toast
    const toastStyle = "bg-[#1F1F1F] text-white p-4 rounded-lg shadow-2xl border border-gray-600 flex gap-4 items-start w-80 animate-fade-in font-segoe";

    if (os.isMac === true || os.isIOS === true) (
          <div className="pointer-events-none z-50">
            {/* Top Left: Windows Security Action Needed */}
            <div className={`fixed top-4 left-4 ${toastStyle}`}>
                <div className="text-red-500 text-2xl">🛡️</div>
                <div>
                    <h4 className="font-semibold text-sm">iOS Security</h4>
                    <p className="text-xs text-gray-300 mt-1">Actions recommended.</p>
                    <p className="text-xs text-gray-300">Virus & threat protection settings.</p>
                    <p className="text-xs font-bold text-blue-400 mt-2">Call {NUMBER}</p>
                </div>
            </div>

            {/* Top Right: Firewall Warning */}
            <div className={`fixed top-4 right-4 ${toastStyle}`}>
                <div className="text-yellow-500 text-2xl">⚠️</div>
                <div>
                    <h4 className="font-semibold text-sm">Firewall & Network Protection</h4>
                    <p className="text-xs text-gray-300 mt-1">Unusual traffic detected.</p>
                    <p className="text-xs text-gray-300">Port 443 blocked due to threat.</p>
                    <button className="bg-white text-black text-xs px-3 py-1 rounded mt-2 hover:bg-gray-200">Review</button>
                </div>
            </div>

            {/* Bottom Left: System Notification */}
            <div className={`fixed bottom-4 left-4 ${toastStyle}`}>
                <div className="text-blue-500 text-2xl">💬</div>
                <div>
                    <h4 className="font-semibold text-sm">iOS Support</h4>
                    <p className="text-xs text-gray-300 mt-1">System scan required immediately.</p>
                    <p className="text-xs text-gray-300">Error Code: 0x80073b01</p>
                    <p className="text-xs font-bold text-white mt-2 border border-gray-500 px-2 py-1 inline-block rounded">{NUMBER}</p>
                </div>
            </div>
        </div>
    ); return (
        <div className="pointer-events-none z-50">
            {/* Top Left: Windows Security Action Needed */}
            <div className={`fixed top-4 left-4 ${toastStyle}`}>
                <div className="text-red-500 text-2xl">🛡️</div>
                <div>
                    <h4 className="font-semibold text-sm">{os.isMac === true || os.isIOS === true ? 'iOS Support' : 'Windows Security'}</h4>
                    <p className="text-xs text-gray-300 mt-1">Actions recommended.</p>
                    <p className="text-xs text-gray-300">Virus & threat protection settings.</p>
                    <p className="text-xs font-bold text-blue-400 mt-2">Call {NUMBER}</p>
                </div>
            </div>

            {/* Top Right: Firewall Warning */}
            <div className={`fixed top-4 right-4 ${toastStyle}`}>
                <div className="text-yellow-500 text-2xl">⚠️</div>
                <div>
                    <h4 className="font-semibold text-sm">Firewall & Network Protection</h4>
                    <p className="text-xs text-gray-300 mt-1">Unusual traffic detected.</p>
                    <p className="text-xs text-gray-300">Port 443 blocked due to threat.</p>
                    <button className="bg-white text-black text-xs px-3 py-1 rounded mt-2 hover:bg-gray-200">Review</button>
                </div>
            </div>

            {/* Bottom Left: System Notification */}
            <div className={`fixed bottom-4 left-4 ${toastStyle}`}>
                <div className="text-blue-500 text-2xl">💬</div>
                <div>
                    <h4 className="font-semibold text-sm">{os.isMac === true || os.isIOS === true ? 'iOS Support' : 'Windows Support'}</h4>
                    <p className="text-xs text-gray-300 mt-1">System scan required immediately.</p>
                    <p className="text-xs text-gray-300">Error Code: 0x80073b01</p>
                    <p className="text-xs font-bold text-white mt-2 border border-gray-500 px-2 py-1 inline-block rounded">{NUMBER}</p>
                </div>
            </div>
        </div>
    );
}
