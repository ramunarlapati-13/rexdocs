/**
 * Utility functions for RexDocs
 */

/**
 * Escapes HTML characters to prevent Cross-Site Scripting (XSS).
 * @param {string} str - The string to escape.
 * @returns {string} - Escaped string safe for HTML insertion.
 */
export function escapeHtml(str) {
    if (str === null || str === undefined) return '';
    return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
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
