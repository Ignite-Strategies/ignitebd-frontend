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
    // Simple focus management - just remove focus from inputs on route change
    const fixFocus = () => {
      // Only blur if there's an active input element
      const activeElement = document.activeElement;
      if (activeElement && (activeElement.tagName === 'INPUT' || activeElement.tagName === 'TEXTAREA')) {
        activeElement.blur();
      }
    };

    // Fix focus after route change
    const timeoutId = setTimeout(fixFocus, 50);

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
