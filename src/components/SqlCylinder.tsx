import { useRef, useState, useEffect, MouseEvent } from 'react';
import { motion, useMotionValue, useTransform, useAnimationFrame, MotionValue } from 'framer-motion';

const SQL_KEYWORDS = [
  'SELECT', 'FROM', 'WHERE', 'LEFT JOIN',
  'GROUP BY', 'ORDER BY', 'HAVING', 'LIMIT',
  'DISTINCT', 'INSERT', 'UPDATE', 'WITH',
  'AS', 'ON', 'AND', 'OR',
  'INNER JOIN', 'VALUES', 'SET', 'DELETE'
];

interface CylinderItemProps {
  text: string;
  index: number;
  total: number;
  rotation: MotionValue<number>;
  radius: number;
  setHoveredKeyword: (keyword: string | null) => void;
  hoveredKeyword: string | null;
}

const CylinderItem = ({
  text,
  index,
  total,
  rotation,
  radius,
  setHoveredKeyword,
  hoveredKeyword
}: CylinderItemProps) => {
  const angleStep = (2 * Math.PI) / total;
  const baseAngle = index * angleStep;

  // Distribute vertically to form a cylinder
  const y = (index - total / 2) * 15;

  // Transform rotation into current angle
  const angle = useTransform(rotation, (r) => baseAngle + r);

  // Calculate 3D position based on angle
  const x = useTransform(angle, (a) => Math.cos(a) * radius);
  const z = useTransform(angle, (a) => Math.sin(a) * radius);

  // Calculate depth-based effects
  // z goes from -radius to +radius
  // normalizedZ goes from 0 (back) to 1 (front)
  const normalizedZ = useTransform(z, (currentZ) => (currentZ + radius) / (radius * 2));

  const scale = useTransform(normalizedZ, [0, 1], [0.7, 1.1]);
  const opacity = useTransform(normalizedZ, [0, 0.2, 1], [0.1, 0.4, 1]);
  const blur = useTransform(normalizedZ, [0, 1], [4, 0]);
  const zIndex = useTransform(normalizedZ, (n) => Math.round(n * 100));

  // Create derived values at the top level to avoid hook violations
  const dimmedOpacity = useTransform(opacity, (o) => o * 0.3);
  const blurFilter = useTransform(blur, (b) => `blur(${b}px)`);

  const isHovered = hoveredKeyword === text;
  const isAnyHovered = hoveredKeyword !== null;

  return (
    <motion.div
      className="absolute whitespace-nowrap font-mono cursor-pointer select-none transition-colors duration-200 flex items-center justify-center"
      style={{
        x,
        y,
        z,
        scale,
        opacity: isAnyHovered && !isHovered ? dimmedOpacity : opacity,
        filter: blurFilter,
        zIndex,
        color: isHovered ? '#000000' : '#333333',
        fontWeight: isHovered ? 700 : 500,
      }}
      onMouseEnter={() => setHoveredKeyword(text)}
      onMouseLeave={() => setHoveredKeyword(null)}
    >
      <span className={`px-2 py-1 rounded-md ${isHovered ? 'bg-secondary/20' : ''}`}>
        {text}
      </span>
    </motion.div>
  );
};

export const SqlCylinder = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredKeyword, setHoveredKeyword] = useState<string | null>(null);
  const [radius, setRadius] = useState(200);

  // The rotation value that drives the animation
  const rotation = useMotionValue(0);

  // Mouse interaction for rotation speed/direction
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Responsive radius with fallback
  useEffect(() => {
    const updateRadius = () => {
      const width = window.innerWidth;
      if (width < 640) setRadius(120);
      else if (width < 1024) setRadius(160);
      else setRadius(220); // Increased for larger screens
    };

    // Initial call
    updateRadius();

    window.addEventListener('resize', updateRadius);
    return () => window.removeEventListener('resize', updateRadius);
  }, []);

  // Animation loop
  useAnimationFrame((time, delta) => {
    // Base rotation speed
    let speed = 0.0005;

    // If hovering, slow down
    if (hoveredKeyword) {
      speed = 0.0001;
    }

    rotation.set(rotation.get() + delta * speed);
  });

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full flex items-center justify-center perspective-1000"
      onMouseMove={handleMouseMove}
      style={{ perspective: '1000px' }}
    >
      <div className="relative w-full h-full flex items-center justify-center transform-style-3d">
        {SQL_KEYWORDS.map((text, i) => (
          <CylinderItem
            key={i}
            text={text}
            index={i}
            total={SQL_KEYWORDS.length}
            rotation={rotation}
            radius={radius}
            setHoveredKeyword={setHoveredKeyword}
            hoveredKeyword={hoveredKeyword}
          />
        ))}
      </div>
    </div>
  );
};