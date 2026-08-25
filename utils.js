/**
 * Utility functions for RexDocs
 */

/**
 * Escapes special HTML characters in a string to prevent Cross-Site Scripting (XSS).
 * @param {*} str - Input value to escape.
 * @returns {string} Escaped HTML string.
 */
export function escapeHtml(str) {
    if (str === null || str === undefined) return '';
    return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}

/**
 * Hides the app loader overlay with a fade-out animation and removes it from DOM.
 */
export function hideLoader() {
    const loader = document.getElementById('app-loader');
    if (loader) {
        loader.classList.add('fade-out');
        setTimeout(() => {
            if (loader && loader.parentNode) loader.parentNode.removeChild(loader);
        }, 350);
    }
}
