import React, { useEffect, useRef } from "react";

const AnimatedCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas!.getContext("2d");
    if (!ctx) return;

    canvas!.width = window.innerWidth;
    canvas!.height = window.innerHeight;

    ctx!.lineWidth = 0.35;

    const mousePosition = {
      x: (30 * canvas!.width) / 100,
      y: (30 * canvas!.height) / 100,
    };

    const dots = {
      nb: 0.25 * canvas!.width,
      distance: 100,
      d_radius: 220,
      array: [] as Dot[],
    };

    // Predefined color palette
    const colorPalette = [
      { r: 0, g: 216, b: 255 }, // Cyan
      // { r: 0, g: 196, b: 132 }, // Green
      { r: 0, g: 124, b: 102 }, // Deep Teal
      { r: 166, g: 247, b: 255 }, // Sky Blue
      { r: 50, g: 232, b: 117 }, // Lime Green
    ];

    function createColorStyle(r: number, g: number, b: number) {
      return `rgba(${r},${g},${b},0.8)`;
    }

    function mixComponents(
      comp1: number,
      weight1: number,
      comp2: number,
      weight2: number
    ) {
      return (comp1 * weight1 + comp2 * weight2) / (weight1 + weight2);
    }

    function averageColorStyles(dot1: Dot, dot2: Dot) {
      const { r: r1, g: g1, b: b1 } = dot1.color;
      const { r: r2, g: g2, b: b2 } = dot2.color;

      const r = mixComponents(r1, dot1.radius, r2, dot2.radius);
      const g = mixComponents(g1, dot1.radius, g2, dot2.radius);
      const b = mixComponents(b1, dot1.radius, b2, dot2.radius);

      return createColorStyle(Math.floor(r), Math.floor(g), Math.floor(b));
    }

    class Dot {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      color: { r: number; g: number; b: number; style: string };

      constructor() {
        this.x = Math.random() * canvas!.width;
        this.y = Math.random() * canvas!.height;
        this.vx = -0.5 + Math.random();
        this.vy = -0.5 + Math.random();
        this.radius = Math.random() * 2;
        this.color = this.generateColor();
      }

      generateColor() {
        const color =
          colorPalette[Math.floor(Math.random() * colorPalette.length)];
        return { ...color, style: createColorStyle(color.r, color.g, color.b) };
      }

      draw() {
        ctx!.beginPath();
        ctx!.fillStyle = this.color.style;
        ctx!.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        ctx!.fill();
      }
    }

    function createDots() {
      for (let i = 0; i < dots.nb; i++) {
        dots.array.push(new Dot());
      }
    }

    function moveDots() {
      for (const dot of dots.array) {
        if (dot.y < 0 || dot.y > canvas!.height) dot.vy = -dot.vy;
        if (dot.x < 0 || dot.x > canvas!.width) dot.vx = -dot.vx;
        dot.x += dot.vx;
        dot.y += dot.vy;
      }
    }

    function connectDots() {
      for (let i = 0; i < dots.nb; i++) {
        for (let j = 0; j < dots.nb; j++) {
          const i_dot = dots.array[i];
          const j_dot = dots.array[j];

          if (
            Math.abs(i_dot.x - j_dot.x) < dots.distance &&
            Math.abs(i_dot.y - j_dot.y) < dots.distance
          ) {
            if (
              Math.abs(i_dot.x - mousePosition.x) < dots.d_radius &&
              Math.abs(i_dot.y - mousePosition.y) < dots.d_radius
            ) {
              ctx!.beginPath();
              ctx!.strokeStyle = averageColorStyles(i_dot, j_dot);
              ctx!.moveTo(i_dot.x, i_dot.y);
              ctx!.lineTo(j_dot.x, j_dot.y);
              ctx!.stroke();
              ctx!.closePath();
            }
          }
        }
      }
    }

    function drawDots() {
      for (const dot of dots.array) {
        dot.draw();
      }
    }

    function animateDots() {
      ctx!.clearRect(0, 0, canvas!.width, canvas!.height);
      moveDots();
      connectDots();
      drawDots();

      requestAnimationFrame(animateDots);
    }

    canvas!.addEventListener("mousemove", (e) => {
      mousePosition.x = e.clientX;
      mousePosition.y = e.clientY;
    });

    canvas!.addEventListener("mouseleave", () => {
      mousePosition.x = canvas!.width / 2;
      mousePosition.y = canvas!.height / 2;
    });

    createDots();
    animateDots();
  }, []);

  return <canvas className="absolute" ref={canvasRef} />;
};

export default AnimatedCanvas;
