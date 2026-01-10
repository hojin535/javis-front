/**
 * Cookie utility functions for managing login information
 */

// Cookie options
const DEFAULT_OPTIONS = {
    path: '/',
    maxAge: 60 * 60 * 24 * 7, // 7 days in seconds
    sameSite: 'Lax',
    secure: window.location.protocol === 'https:',
};

/**
 * Set a cookie
 * @param {string} name - Cookie name
 * @param {string} value - Cookie value
 * @param {object} options - Cookie options
 */
export const setCookie = (name, value, options = {}) => {
    const opts = { ...DEFAULT_OPTIONS, ...options };

    let cookieString = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`;

    if (opts.maxAge) {
        cookieString += `; max-age=${opts.maxAge}`;
    }
    if (opts.path) {
        cookieString += `; path=${opts.path}`;
    }
    if (opts.sameSite) {
        cookieString += `; samesite=${opts.sameSite}`;
    }
    if (opts.secure) {
        cookieString += '; secure';
    }

    document.cookie = cookieString;
};

/**
 * Get a cookie value
 * @param {string} name - Cookie name
 * @returns {string|null} - Cookie value or null if not found
 */
export const getCookie = (name) => {
    const cookies = document.cookie.split(';');

    for (let cookie of cookies) {
        const [cookieName, cookieValue] = cookie.trim().split('=');
        if (decodeURIComponent(cookieName) === name) {
            return decodeURIComponent(cookieValue);
        }
    }

    return null;
};

/**
 * Remove a cookie
 * @param {string} name - Cookie name
 * @param {object} options - Cookie options (path should match the original)
 */
export const removeCookie = (name, options = {}) => {
    const opts = { ...options, path: options.path || '/' };
    document.cookie = `${encodeURIComponent(name)}=; max-age=0; path=${opts.path}`;
};

/**
 * Check if a cookie exists
 * @param {string} name - Cookie name
 * @returns {boolean}
 */
export const hasCookie = (name) => {
    return getCookie(name) !== null;
};
