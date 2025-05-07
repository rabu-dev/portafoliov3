"use client";
import { useEffect, useRef } from "react";

const Background = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    // Configurar el tamaño del canvas para que ocupe toda la pantalla
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    window.addEventListener("resize", handleResize);
    handleResize();

    // Variables para interactividad con el mouse
    const mouse = {
      x: undefined as number | undefined,
      y: undefined as number | undefined,
      radius: 120
    };

    // Optimización: Throttle del evento mousemove
    let lastMouseMoveTime = 0;
    window.addEventListener('mousemove', function(event) {
      const now = Date.now();
      if (now - lastMouseMoveTime > 16) { // Limitar a ~60fps
        mouse.x = event.x;
        mouse.y = event.y;
        lastMouseMoveTime = now;
      }
    });

    // Crear partículas - REDUCIDO el número para mejor rendimiento
    const particles: Particle[] = [];
    const particleCount = 60; // Reducido a la mitad
    
    // Degradado de colores de rojo a negro
    const colors = ['#ff0000', '#cc0000', '#990000', '#660000', '#330000', '#110000'];
    
    // Movemos la clase Particle aquí dentro, donde canvas ya está verificado
    class Particle {
      x: number;
      y: number;
      size: number;
      baseSize: number;
      speedX: number;
      speedY: number;
      color: string;
      density: number;
      originalX: number;
      originalY: number;
      glowIntensity: number;
      glowDirection: number;
      
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.baseSize = Math.random() * 3 + 1;
        this.size = this.baseSize;
        this.speedX = (Math.random() - 0.5) * 1;
        this.speedY = (Math.random() - 0.5) * 1;
        this.originalX = this.x;
        this.originalY = this.y;
        this.density = (Math.random() * 20) + 1;
        
        this.color = colors[Math.floor(Math.random() * colors.length)];
        
        // Efecto de brillo pulsante
        this.glowIntensity = Math.random() * 0.5;
        this.glowDirection = Math.random() > 0.5 ? 0.5 : -0.5; // Reducida la velocidad de cambio
      }
      
      update() {
        // Movimiento normal
        this.x += this.speedX;
        this.y += this.speedY;
        
        // Rebote en los bordes
        if (this.x > canvas.width || this.x < 0) {
          this.speedX = -this.speedX;
        }
        
        if (this.y > canvas.height || this.y < 0) {
          this.speedY = -this.speedY;
        }
        
        // Interactividad con el mouse - solo si está definido
        if (mouse.x !== undefined && mouse.y !== undefined) {
          const dx = mouse.x - this.x;
          const dy = mouse.y - this.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < mouse.radius) {
            // Efecto de repulsión simplificado
            const forceDirectionX = dx / distance;
            const forceDirectionY = dy / distance;
            const force = (mouse.radius - distance) / mouse.radius;
            
            this.x -= forceDirectionX * force * 2;
            this.y -= forceDirectionY * force * 2;
            
            // Aumentar tamaño cuando está cerca del cursor
            this.size = this.baseSize + (force * 2);
          } else {
            // Efecto de brillo pulsante - menos frecuente
            if (Math.random() > 0.9) {
              this.glowIntensity += 0.005 * this.glowDirection;
              if (this.glowIntensity >= 0.5 || this.glowIntensity <= 0.1) {
                this.glowDirection *= -1;
              }
            }
            
            // Volver gradualmente al tamaño original
            if (this.size > this.baseSize) {
              this.size -= 0.1;
            }
          }
        }
      }
      
      draw() {
        if (!ctx) return;
        
        // Dibujo simplificado para mejor rendimiento
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }
    
    // Inicializar partículas
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }
    
    // Conectar partículas cercanas con líneas - OPTIMIZADO
    function connectParticles() {
      if (!ctx) return;
      const maxDistance = 150; // Reducida la distancia máxima
      const maxDistanceSquared = maxDistance * maxDistance; // Evitar cálculos de raíz cuadrada
      
      ctx.strokeStyle = 'rgba(255, 0, 0, 0.15)'; // Cambiado a rojo con baja opacidad
      ctx.lineWidth = 0.5;
      
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distanceSquared = dx * dx + dy * dy;
          
          // Usar distancia al cuadrado para evitar cálculo de raíz cuadrada
          if (distanceSquared < maxDistanceSquared) {
            // Opacidad basada en la distancia - simplificada
            // const opacity = 1 - (Math.sqrt(distanceSquared) / maxDistance);
            
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
    }
    
    // Optimización: Limitar la tasa de frames
    let lastFrameTime = 0;
    const targetFPS = 30; // Reducir a 30 FPS para mejor rendimiento
    const frameInterval = 1000 / targetFPS;
    
    // Función de animación optimizada
    function animate(timestamp: number) {
      // Control de FPS
      if (timestamp - lastFrameTime < frameInterval) {
        requestAnimationFrame(animate);
        return;
      }
      lastFrameTime = timestamp;
      
      if (!ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Fondo negro
      ctx.fillStyle = '#000000';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Actualizar y dibujar partículas
      for (const particle of particles) {
        particle.update();
        particle.draw();
      }
      
      connectParticles();
      requestAnimationFrame(animate);
    }
    
    requestAnimationFrame(animate);
    
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", function(event) {
        mouse.x = event.x;
        mouse.y = event.y;
      });
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full -z-10"
    />
  );
};

export default Background;