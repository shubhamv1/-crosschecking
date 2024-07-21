import React, { useEffect, useState } from 'react';
import './CursorDot.css'; // Import CSS file for styling

const CursorDot = () => {
  const [cursorStyle, setCursorStyle] = useState({ top: 0, left: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setCursorStyle({
        top: e.clientY,
        left: e.clientX,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className="cursor-container">
      <div className="cursor-dot" style={cursorStyle}>
        <div className="cursor-dot-inner"></div>
      </div>
    </div>
  );
};

export default CursorDot;
