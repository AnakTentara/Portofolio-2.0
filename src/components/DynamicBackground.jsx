import React, { useEffect, useRef, useState, useMemo } from 'react';

const DynamicBackground = ({ children }) => {
  const canvasRef = useRef(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [devicePerformance, setDevicePerformance] = useState('high'); // high, medium, low
  const [isDark, setIsDark] = useState(() => document.documentElement.classList.contains('dark'));
  
  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsDark(document.documentElement.classList.contains('dark'));
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);
  
  // Detect device performance level on mount
  useEffect(() => {
    // Simple performance detection based on device memory and CPU cores
    const detectPerformance = () => {
      // Check if navigator.deviceMemory is available (Chrome/Edge)
      const memory = navigator.deviceMemory || 4; // Default to 4GB if not available
      const cores = navigator.hardwareConcurrency || 4; // Default to 4 cores if not available
      
      if (memory >= 4 && cores >= 4) {
        return 'high';
      } else if (memory >= 2 && cores >= 2) {
        return 'medium';
      } else {
        return 'low';
      }
    };
    
    setDevicePerformance(detectPerformance());
  }, []);
  
  // Performance config based on device capability
  const config = useMemo(() => {
    const configs = {
      high: {
        particleCount: 30,
        connectionDistance: 150,
        drawEveryNthFrame: 1,
      },
      medium: {
        particleCount: 20,
        connectionDistance: 120,
        drawEveryNthFrame: 2,
      },
      low: {
        particleCount: 10,
        connectionDistance: 100,
        drawEveryNthFrame: 3,
      }
    };
    
    return configs[devicePerformance];
  }, [devicePerformance]);
  
  useEffect(() => {
    const handleScroll = () => {
      // Using requestAnimationFrame to throttle scroll events
      window.requestAnimationFrame(() => {
        setScrollPosition(window.scrollY);
      });
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let frameCount = 0;
    
    // Set canvas dimensions
    const handleResize = () => {
      // Only update if dimensions actually changed to avoid expensive canvas resize operations
      if (canvas.width !== window.innerWidth || canvas.height !== window.innerHeight) {
        canvas.width = window.innerWidth;
        // Use visible window height instead of document height for better performance
        canvas.height = window.innerHeight;
      }
    };
    
    window.addEventListener('resize', handleResize);
    handleResize();
    
    // Particles array
    const particles = [];
    
    // Create particles
    for (let i = 0; i < config.particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 1.5 + 0.5, // Smaller particles for better performance
        color: `rgba(${Math.floor(Math.random() * 100)}, ${Math.floor(Math.random() * 150 + 100)}, ${Math.floor(Math.random() * 255)}, ${Math.random() * 0.4 + 0.1})`,
        speedX: Math.random() * 0.5 - 0.25, // Slower particles
        speedY: Math.random() * 0.5 - 0.25  // Slower particles
      });
    }
    
    // Spatial partitioning grid for more efficient particle connection checks
    const createSpatialGrid = () => {
      const cellSize = config.connectionDistance;
      const gridWidth = Math.ceil(canvas.width / cellSize);
      const gridHeight = Math.ceil(canvas.height / cellSize);
      const grid = Array(gridWidth * gridHeight).fill().map(() => []);
      
      // Add particles to grid cells
      particles.forEach(particle => {
        const cellX = Math.floor(particle.x / cellSize);
        const cellY = Math.floor(particle.y / cellSize);
        const cellIndex = cellY * gridWidth + cellX;
        
        if (grid[cellIndex]) {
          grid[cellIndex].push(particle);
        }
      });
      
      return { grid, cellSize, gridWidth, gridHeight };
    };
    
    // Animation function
    const animate = () => {
      frameCount++;
      
      // Only draw every nth frame based on performance level
      if (frameCount % config.drawEveryNthFrame !== 0) {
        animationFrameId = requestAnimationFrame(animate);
        return;
      }
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Solid background color based on theme
      const isDarkTheme = document.documentElement.classList.contains('dark');
      ctx.fillStyle = isDarkTheme ? 'rgba(6, 8, 20, 0.85)' : 'rgba(248, 250, 252, 0.85)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Update particle positions
      particles.forEach(particle => {
        // Update position
        particle.x += particle.speedX;
        particle.y += particle.speedY;
        
        // Bounce off edges
        if (particle.x < 0 || particle.x > canvas.width) {
          particle.speedX *= -1;
        }
        
        if (particle.y < 0 || particle.y > canvas.height) {
          particle.speedY *= -1;
        }
      });
      
      // Create spatial grid for efficient neighbor finding
      const { grid, cellSize, gridWidth, gridHeight } = createSpatialGrid();
      
      // Draw particles and connections
      particles.forEach(particle => {
        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.fill();
        
        // Find nearby particles using spatial grid
        const cellX = Math.floor(particle.x / cellSize);
        const cellY = Math.floor(particle.y / cellSize);
        
        // Check the current cell and 8 neighboring cells
        for (let nx = Math.max(0, cellX - 1); nx <= Math.min(gridWidth - 1, cellX + 1); nx++) {
          for (let ny = Math.max(0, cellY - 1); ny <= Math.min(gridHeight - 1, cellY + 1); ny++) {
            const cellIndex = ny * gridWidth + nx;
            const cellParticles = grid[cellIndex] || [];
            
            // Connect to particles in this cell
            cellParticles.forEach(otherParticle => {
              // Skip self connections
              if (particle === otherParticle) return;
              
              const dx = particle.x - otherParticle.x;
              const dy = particle.y - otherParticle.y;
              const distance = Math.sqrt(dx * dx + dy * dy);
              
              if (distance < config.connectionDistance) {
                ctx.beginPath();
                ctx.strokeStyle = `rgba(150, 150, 255, ${0.08 * (1 - distance / config.connectionDistance)})`;
                ctx.lineWidth = 0.5;
                ctx.moveTo(particle.x, particle.y);
                ctx.lineTo(otherParticle.x, otherParticle.y);
                ctx.stroke();
              }
            });
          }
        }
      });
      
      animationFrameId = requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [config]);
  
  return (
    <div className="relative dynamic-background-content">
      <canvas 
        ref={canvasRef} 
        className="fixed top-0 left-0 w-full h-full z-[-1]"
        style={{ pointerEvents: 'none' }}
      />
      
      {/* Transition overlay between Hero and About sections - solid color instead of gradient */}
      <div 
        className="fixed top-0 left-0 w-full h-full z-[-1] pointer-events-none section-blend-overlay"
        style={{
          backgroundColor: isDark ? 'rgba(6, 8, 20, 0.75)' : 'rgba(248, 250, 252, 0.75)',
          opacity: Math.min(1, scrollPosition / 300),
          transform: `translateY(${Math.min(scrollPosition * 0.1, 30)}px)`,
          transition: 'background-color 0.5s ease'
        }}
      />
      
      {children}
    </div>
  );
};

export default DynamicBackground; 