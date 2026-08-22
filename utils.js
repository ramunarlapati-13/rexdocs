/**
 * Utility functions for RexDocs
 */

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
