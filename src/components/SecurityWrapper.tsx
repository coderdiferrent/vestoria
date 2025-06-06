
import { useEffect, ReactNode } from 'react';
import { useSecureAuth } from '@/hooks/useSecureAuth';
import { getCSPHeaders } from '@/utils/security';

interface SecurityWrapperProps {
  children: ReactNode;
  requireAuth?: boolean;
}

const SecurityWrapper = ({ children, requireAuth = false }: SecurityWrapperProps) => {
  const { user, loading, isValidSession } = useSecureAuth();

  useEffect(() => {
    // Set security headers
    const headers = getCSPHeaders();
    Object.entries(headers).forEach(([key, value]) => {
      const meta = document.createElement('meta');
      meta.httpEquiv = key;
      meta.content = value;
      document.head.appendChild(meta);
    });

    // Disable right-click context menu in production
    const handleContextMenu = (e: MouseEvent) => {
      if (process.env.NODE_ENV === 'production') {
        e.preventDefault();
      }
    };

    // Disable F12 and other dev tools shortcuts in production
    const handleKeyDown = (e: KeyboardEvent) => {
      if (process.env.NODE_ENV === 'production') {
        if (
          e.key === 'F12' ||
          (e.ctrlKey && e.shiftKey && e.key === 'I') ||
          (e.ctrlKey && e.shiftKey && e.key === 'C') ||
          (e.ctrlKey && e.key === 'U')
        ) {
          e.preventDefault();
        }
      }
    };

    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (requireAuth && (!user || !isValidSession)) {
    window.location.href = '/login';
    return null;
  }

  return <>{children}</>;
};

export default SecurityWrapper;
