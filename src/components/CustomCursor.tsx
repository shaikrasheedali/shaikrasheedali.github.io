import { useEffect, useState } from 'react';
import { Mail, Code2, ExternalLink, User } from 'lucide-react';
import { motion, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';

type CursorMode = 'default' | 'link' | 'data' | 'mail' | 'profile';

export const CustomCursor = () => {
  const [mode, setMode] = useState<CursorMode>('default');
  const [isVisible, setIsVisible] = useState(false);
  const [isPointer, setIsPointer] = useState(false);

  // Mouse position
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth spring animation for the ring
  // stiff: 150, damping: 15, mass: 0.1 gives a snappy but smooth feel
  const springConfig = { damping: 20, stiffness: 300, mass: 0.5 };
  const ringX = useSpring(mouseX, springConfig);
  const ringY = useSpring(mouseY, springConfig);

  useEffect(() => {
    // Don't show custom cursor on touch devices
    if (window.matchMedia('(pointer: coarse)').matches) {
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);

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

    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [mouseX, mouseY]);

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
      {/* Outer ring - smooth spring follow */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference"
        style={{
          x: ringX,
          y: ringY,
          translateX: '-50%',
          translateY: '-50%',
        }}
      >
        <motion.div
          layoutId="cursor-ring"
          className={`
            rounded-full border-2 border-canvas
            transition-colors duration-200
          `}
          animate={{
            width: isPointer ? 48 : 36,
            height: isPointer ? 48 : 36,
            borderColor: isPointer ? 'hsl(var(--canvas))' : 'hsl(var(--canvas))',
            opacity: isPointer ? 1 : 0.5,
          }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          style={{
            boxShadow: '0 0 20px hsl(var(--canvas) / 0.3)',
          }}
        />
      </motion.div>

      {/* Inner dot/icon - instant follow */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference"
        style={{
          x: mouseX,
          y: mouseY,
          translateX: '-50%',
          translateY: '-50%',
        }}
      >
        <motion.div
          className={`
            flex items-center justify-center
            text-canvas
          `}
          animate={{
            scale: isPointer ? 1 : 0.5,
          }}
          transition={{ type: 'spring', stiffness: 400, damping: 25 }}
        >
          <AnimatePresence mode="wait">
            {mode !== 'default' && (
              <motion.div
                key={mode}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0 }}
                transition={{ duration: 0.15 }}
              >
                {getIcon()}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </>
  );
};
