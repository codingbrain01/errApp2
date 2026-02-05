// OS Detection Utility
export const detectOS = () => {
    const userAgent = navigator.userAgent.toLowerCase();
    const platform = navigator.platform.toLowerCase();

    const isWindows = platform.includes('win') || userAgent.includes('windows');
    const isMac = platform.includes('mac') || userAgent.includes('mac os');
    const isLinux = platform.includes('linux') && !userAgent.includes('android');
    const isAndroid = userAgent.includes('android');
    const isIOS = /iphone|ipad|ipod/.test(userAgent);

    let osName = 'Unknown';
    if (isWindows) osName = 'Windows';
    else if (isMac) osName = 'macOS';
    else if (isIOS) osName = 'iOS';
    else if (isAndroid) osName = 'Android';
    else if (isLinux) osName = 'Linux';

    return {
        isWindows,
        isMac,
        isLinux,
        isAndroid,
        isIOS,
        isMobile: isAndroid || isIOS,
        isDesktop: isWindows || isMac || isLinux,
        name: osName
    };
};
