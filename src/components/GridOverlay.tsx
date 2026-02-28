import React from 'react';

const GridOverlay: React.FC = () => (
  <div
    className="absolute inset-0 opacity-60 pointer-events-none"
    style={{
      backgroundImage:
        'linear-gradient(rgba(74,158,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(74,158,255,0.08) 1px, transparent 1px)',
      backgroundSize: '40px 40px',
    }}
  />
);

export default GridOverlay;
