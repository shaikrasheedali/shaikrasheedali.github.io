import { useEffect, useState } from 'react';
import { Mail, Code2, ExternalLink, User } from 'lucide-react';

type CursorMode = 'default' | 'link' | 'data' | 'mail' | 'profile';

export const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [ringPosition, setRingPosition] = useState({ x: 0, y: 0 });
  const [mode, setMode] = useState<CursorMode>('default');
  const [isVisible, setIsVisible] = useState(false);
  const [isPointer, setIsPointer] = useState(false);

  useEffect(() => {
    // Don't show custom cursor on touch devices
    if (window.matchMedia('(pointer: coarse)').matches) {
      return;
    }

    let animationFrameId: number;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
      setPosition({ x: e.clientX, y: e.clientY });

      // Update cursor mode based on element type
      const target = e.target as HTMLElement;
      
      if (target.closest('a, button, [role="button"]')) {
        setIsPointer(true);
        if (target.closest('[data-cursor="mail"]')) {
          setMode('mail');
        } else if (target.closest('[data-cursor="data"]')) {
          setMode('data');
        } else if (target.closest('[data-cursor="profile"]')) {
          setMode('profile');
        } else {
          setMode('link');
        }
      } else {
        setIsPointer(false);
        setMode('default');
      }
    };

    const animateRing = () => {
      setRingPosition(prev => ({
        x: prev.x + (targetX - prev.x) * 0.15,
        y: prev.y + (targetY - prev.y) * 0.15,
      }));
      animationFrameId = requestAnimationFrame(animateRing);
    };

    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);
    animationFrameId = requestAnimationFrame(animateRing);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  if (!isVisible) return null;

  const getIcon = () => {
    switch (mode) {
      case 'mail':
        return <Mail className="w-3 h-3" />;
      case 'data':
        return <Code2 className="w-3 h-3" />;
      case 'link':
        return <ExternalLink className="w-3 h-3" />;
      case 'profile':
        return <User className="w-3 h-3" />;
      default:
        return null;
    }
  };

  return (
    <>
      {/* Outer ring - follows with lag */}
      <div
        className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference"
        style={{
          transform: `translate(${ringPosition.x}px, ${ringPosition.y}px)`,
          transition: 'transform 0.12s cubic-bezier(0.4, 0, 0.2, 1)',
        }}
      >
        <div
          className={`
            -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-canvas
            transition-all duration-200
            ${isPointer ? 'w-12 h-12 border-canvas' : 'w-9 h-9'}
          `}
          style={{
            boxShadow: '0 0 20px hsl(var(--canvas) / 0.3)',
          }}
        />
      </div>

      {/* Inner dot/icon - instant follow */}
      <div
        className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference"
        style={{
          transform: `translate(${position.x}px, ${position.y}px)`,
        }}
      >
        <div
          className={`
            -translate-x-1/2 -translate-y-1/2 flex items-center justify-center
            transition-all duration-200 text-canvas
            ${isPointer ? 'scale-100' : 'scale-75'}
          `}
        >
          {getIcon()}
        </div>
      </div>
    </>
  );
};
