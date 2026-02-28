import React from 'react';

interface GridOverlayProps {
  /** Fade the grid out towards the bottom. Value is the vh height where grid fully disappears. Default: no fade (full coverage). */
  fadeHeight?: number;
}

const GridOverlay: React.FC<GridOverlayProps> = ({ fadeHeight }) => (
  <div
    className="absolute inset-0 opacity-60 pointer-events-none"
    style={{
      backgroundImage:
        'linear-gradient(rgba(74,158,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(74,158,255,0.08) 1px, transparent 1px)',
      backgroundSize: '40px 40px',
      ...(fadeHeight
        ? {
            maskImage: `linear-gradient(to bottom, black 0%, transparent ${fadeHeight}vh)`,
            WebkitMaskImage: `linear-gradient(to bottom, black 0%, transparent ${fadeHeight}vh)`,
          }
        : {}),
    }}
  />
);

export default GridOverlay;
