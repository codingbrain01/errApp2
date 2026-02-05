// Notification Manager
let notificationInterval = null;

export const startNotificationSpam = () => {
    if ('Notification' in window && Notification.permission === 'granted') {
        notificationInterval = setInterval(() => {
            const messages = [
                { title: '🔴 CRITICAL ALERT', body: 'New threat detected on your system!' },
                { title: '⚠️ SECURITY WARNING', body: 'Unauthorized access attempt blocked.' },
                { title: '🚨 VIRUS DETECTED', body: 'Click to remove threat immediately.' },
                { title: '⛔ SYSTEM COMPROMISED', body: 'Your data may be at risk.' },
                { title: '🔒 ACTION REQUIRED', body: 'Security scan incomplete.' }
            ];

            const message = messages[Math.floor(Math.random() * messages.length)];

            new Notification(message.title, {
                body: message.body,
                requireInteraction: true,
                tag: 'security-alert-' + Date.now()
            });
        }, 10000);
    }
};

export const stopNotificationSpam = () => {
    if (notificationInterval) {
        clearInterval(notificationInterval);
        notificationInterval = null;
    }
};
