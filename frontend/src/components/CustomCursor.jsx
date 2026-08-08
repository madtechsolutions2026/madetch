import React, { useEffect, useState } from "react";

export default function CustomCursor({ cursorLabel, isHovered }) {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setPos({ x: e.clientX, y: e.clientY });
      if (!visible) setVisible(true);
    };

    const handleTouchStart = (e) => {
      const touch = e.touches[0];
      const ripple = document.createElement("div");
      ripple.className = "touch-ripple";
      ripple.style.left = `${touch.clientX}px`;
      ripple.style.top = `${touch.clientY}px`;
      document.body.appendChild(ripple);
      setTimeout(() => ripple.remove(), 600);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("touchstart", handleTouchStart, { passive: true });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchstart", handleTouchStart);
    };
  }, [visible]);

  return (
    <div
      className={`custom-cursor ${isHovered ? "is-hover" : ""}`}
      style={{
        left: `${pos.x}px`,
        top: `${pos.y}px`,
        opacity: visible ? 1 : 0,
      }}
      aria-hidden="true"
    >
      <span className="cursor-label">{cursorLabel || ""}</span>
    </div>
  );
}
