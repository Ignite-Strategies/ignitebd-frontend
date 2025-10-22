import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Global Focus Manager Component
 * Fixes cursor jumping issues across all pages
 */
export default function FocusManager({ children }) {
  const location = useLocation();
  const pageRef = useRef(null);

  useEffect(() => {
    // Fix cursor jumping on every route change
    const fixFocus = () => {
      // Remove focus from any active input elements
      const activeElement = document.activeElement;
      if (activeElement && activeElement.blur) {
        activeElement.blur();
      }

      // Clear any text selection that might cause cursor issues
      if (window.getSelection) {
        window.getSelection().removeAllRanges();
      }

      // Set focus to the page container to establish proper focus context
      if (pageRef.current) {
        pageRef.current.focus();
      }

      // Prevent any input from auto-focusing
      const inputs = document.querySelectorAll('input, textarea, select');
      inputs.forEach(input => {
        input.setAttribute('readonly', 'true');
        setTimeout(() => {
          input.removeAttribute('readonly');
        }, 100);
      });
    };

    // Fix focus immediately on route change
    fixFocus();

    // Also fix focus after a short delay to catch any late-rendering elements
    const timeoutId = setTimeout(fixFocus, 100);

    return () => clearTimeout(timeoutId);
  }, [location.pathname]);

  return (
    <div 
      ref={pageRef} 
      tabIndex={-1} 
      className="focus-manager"
      style={{ outline: 'none' }}
    >
      {children}
    </div>
  );
}
