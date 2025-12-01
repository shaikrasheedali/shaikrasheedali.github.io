import { useEffect, useRef, useState, useMemo } from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';

interface KeywordItem {
  text: string;
  angle: number;
  x: number;
  y: number;
  z: number;
  scale: number;
  opacity: number;
  blur: number;
  zIndex: number;
}

const SQL_KEYWORDS = [
  'SELECT', 'FROM', 'WHERE', 'LEFT JOIN',
  'GROUP BY', 'ORDER BY', 'HAVING', 'LIMIT',
  'DISTINCT', 'INSERT', 'UPDATE', 'WITH',
  'AS', 'ON', 'AND', 'OR'
];

export const SqlCylinder = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredKeyword, setHoveredKeyword] = useState<string | null>(null);
  const [isHovering, setIsHovering] = useState(false);
  const rotationRef = useRef(0);
  const frameRef = useRef<number>();

  // Mouse tracking for parallax
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  // Smooth spring physics for mouse movement
  const springConfig = { damping: 20, stiffness: 100 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [5, -5]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-5, 5]), springConfig);

  // Responsive radius
  const [radius, setRadius] = useState(200);

  useEffect(() => {
    const updateRadius = () => {
      if (window.innerWidth < 640) {
        setRadius(120);
      } else if (window.innerWidth < 1024) {
        setRadius(160);
      } else {
        setRadius(200);
      }
    };
    
    updateRadius();
    window.addEventListener('resize', updateRadius);
    return () => window.removeEventListener('resize', updateRadius);
  }, []);

  // Calculate keyword positions
  const keywords = useMemo<KeywordItem[]>(() => {
    const angleStep = (2 * Math.PI) / SQL_KEYWORDS.length;
    
    return SQL_KEYWORDS.map((text, i) => {
      const angle = i * angleStep + rotationRef.current;
      const x = Math.cos(angle) * radius;
      const z = Math.sin(angle) * radius;
      
      // Calculate depth-based effects
      const normalizedZ = (z + radius) / (radius * 2); // 0 to 1
      const scale = 0.8 + normalizedZ * 0.3; // 0.8 to 1.1
      const opacity = 0.3 + normalizedZ * 0.7; // 0.3 to 1.0
      const blur = (1 - normalizedZ) * 3; // 0 to 3px
      const zIndex = Math.round(normalizedZ * 100);
      
      return {
        text,
        angle,
        x,
        y: 0,
        z,
        scale,
        opacity,
        blur,
        zIndex,
      };
    });
  }, [radius, rotationRef.current]);

  // Continuous rotation animation
  useEffect(() => {
    let lastTime = Date.now();
    
    const animate = () => {
      const currentTime = Date.now();
      const deltaTime = (currentTime - lastTime) / 1000;
      lastTime = currentTime;
      
      // Adjust rotation speed based on hover state
      const baseSpeed = isHovering ? 0.15 : 0.3;
      rotationRef.current += baseSpeed * deltaTime;
      
      frameRef.current = requestAnimationFrame(animate);
    };
    
    frameRef.current = requestAnimationFrame(animate);
    
    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, [isHovering]);

  // Mouse tracking
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const x = (e.clientX - centerX) / (rect.width / 2);
    const y = (e.clientY - centerY) / (rect.height / 2);
    
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
    mouseX.set(0);
    mouseY.set(0);
  };

  // Sort keywords by z-index for proper layering
  const sortedKeywords = useMemo(() => {
    return [...keywords].sort((a, b) => a.zIndex - b.zIndex);
  }, [keywords]);

  return (
    <motion.div
      ref={containerRef}
      className="relative w-full h-full flex items-center justify-center perspective-1000"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        perspective: '1000px',
      }}
    >
      <motion.div
        className="relative"
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
      >
        {sortedKeywords.map((keyword, index) => (
          <motion.div
            key={`${keyword.text}-${index}`}
            className="absolute whitespace-nowrap font-mono text-ink cursor-pointer select-none"
            style={{
              transform: `translate3d(${keyword.x}px, ${keyword.y}px, ${keyword.z}px)`,
              opacity: hoveredKeyword && hoveredKeyword !== keyword.text ? keyword.opacity * 0.5 : keyword.opacity,
              scale: keyword.scale,
              filter: `blur(${keyword.blur}px)`,
              zIndex: keyword.zIndex,
              fontSize: window.innerWidth < 640 ? '0.75rem' : window.innerWidth < 1024 ? '0.875rem' : '1rem',
              fontWeight: hoveredKeyword === keyword.text ? 700 : 500,
              color: hoveredKeyword === keyword.text ? '#000000' : `hsl(0 0% ${20 + keyword.opacity * 30}%)`,
              transition: 'font-weight 0.2s ease, color 0.2s ease',
            }}
            onMouseEnter={() => setHoveredKeyword(keyword.text)}
            onMouseLeave={() => setHoveredKeyword(null)}
          >
            {keyword.text}
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};