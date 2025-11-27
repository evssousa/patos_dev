import React, { useMemo, useState, useEffect } from 'react';
import { DuckAction, DuckState } from '../types';

interface DuckProps {
  duck: DuckState;
  onMouseDown: (id: string, e: React.MouseEvent) => void;
}

// --- PIXEL ART DATA ---

const SPRITE_IDLE = [
  "................",
  "................",
  "................",
  "................",
  ".....YYYY.......", 
  ".....YYYY.......",
  ".....YYYYB......",
  "....YYYYYYO.....", 
  "....YYYYYY......",
  "....YYYYYY......",
  ".....YYYY.......",
  "......O.O.......", 
  "................",
  "................",
  "................",
  "................"
];

const SPRITE_WALK_1 = [
  "................",
  "................",
  "................",
  "................",
  ".....YYYY.......",
  ".....YYYY.......",
  ".....YYYYB......",
  "....YYYYYYO.....",
  "....YYYYYY......",
  "....YYYYYY......",
  ".....YYYY.......",
  ".....O.O........", 
  "................",
  "................",
  "................",
  "................"
];

const SPRITE_WALK_2 = [
  "................",
  "................",
  "................",
  "................",
  "................", 
  ".....YYYY.......",
  ".....YYYY.......",
  ".....YYYYB......",
  "....YYYYYYO.....",
  "....YYYYYY......",
  "....YYYYYY......",
  ".....YYYY.......",
  "......OO........", 
  "................",
  "................",
  "................"
];

const SPRITE_SLEEP = [
  "................",
  "................",
  "................",
  "................",
  "................",
  "................",
  "................",
  "................",
  "......YYYY......", 
  ".....YYYYYY.....",
  ".....YYYYYY.....",
  "......YYYY......",
  "................",
  "................",
  "................",
  "................"
];

const SPRITE_CRY = [
  "................",
  "................",
  ".........T......",
  "........T.......",
  "...T.YYYY.......",
  ".....YYYY.......",
  ".....YYYYB......",
  "....YYYYYY......", 
  "....YYYYYY......",
  "....YYYYYY......",
  ".....YYYY.......",
  "......O.O.......", 
  ".....O...O......",
  "................",
  "................",
  "................"
];

const SPRITE_FLY_1 = [
  "................",
  "................",
  "................",
  ".....YYYY.......",
  ".....YYYY.......",
  ".....YYYYB......",
  "..YY.YYYYYO.....", 
  ".YY.YYYYYY......",
  "....YYYYYY......",
  "....YYYYYY......",
  ".....YYYY.......",
  "......O.O.......",
  "................",
  "................",
  "................",
  "................"
];

const SPRITE_FLY_2 = [
  "................",
  "................",
  "................",
  ".....YYYY.......",
  ".....YYYY.......",
  ".....YYYYB......",
  "....YYYYYYO.....",
  "....YYYYYY......",
  "....YYYYYY......",
  ".....YYYY.YY....", 
  "......O.O..YY...",
  "................",
  "................",
  "................",
  "................"
];

const SPRITE_SWIM_1 = [
  "................",
  "................",
  "................",
  "................",
  ".....YYYY.......",
  ".....YYYY.......",
  ".....YYYYB......",
  "....YYYYYYO.....",
  "....YYYYYY......",
  "....YYYYYY......",
  "................", 
  "................",
  "................",
  "................",
  "................",
  "................"
];

const SPRITE_SWIM_2 = [
  "................",
  "................",
  "................",
  "................",
  "................", 
  ".....YYYY.......",
  ".....YYYY.......",
  ".....YYYYB......",
  "....YYYYYYO.....",
  "....YYYYYY......",
  "....YYYYYY......",
  "................",
  "................",
  "................",
  "................",
  "................"
];

const SPRITE_ATTACK = [
  "................",
  "................",
  "................",
  "................",
  ".....YYYY.......",
  ".....YYYY.......",
  ".....YYYYB......",
  "....YYYYYYO.....", 
  "....YYYYYYO.....", 
  "....YYYYYY......",
  ".....YYYY.......",
  "......O.O.......",
  "................",
  "................",
  "................",
  "................"
];


// --- UTILS ---

const PALETTE: Record<string, string> = {
  Y: '#FCD34D', // Yellow 300
  O: '#F97316', // Orange 500
  B: '#000000', // Black
  W: '#FFFFFF', // White
  T: '#3B82F6', // Blue 500
};

const renderSprite = (spriteMap: string[]) => {
  const pixelSize = 1;
  const rects: React.ReactElement[] = [];

  spriteMap.forEach((row, y) => {
    row.split('').forEach((char, x) => {
      if (PALETTE[char]) {
        rects.push(
          <rect
            key={`${x}-${y}`}
            x={x * pixelSize}
            y={y * pixelSize}
            width={pixelSize}
            height={pixelSize}
            fill={PALETTE[char]}
            shapeRendering="crispEdges"
          />
        );
      }
    });
  });
  return rects;
};

export const Duck: React.FC<DuckProps> = ({ duck, onMouseDown }) => {
  const [frame, setFrame] = useState(0);

  // Animation Loop
  useEffect(() => {
    let intervalMs = 200;
    if (duck.action === DuckAction.RUN) intervalMs = 100;
    if (duck.action === DuckAction.FLY) intervalMs = 100;
    if (duck.action === DuckAction.SWIM) intervalMs = 500;

    const timer = setInterval(() => {
      setFrame(f => (f + 1) % 2);
    }, intervalMs);
    return () => clearInterval(timer);
  }, [duck.action]);

  // Select Sprite
  const currentSprite = useMemo(() => {
    switch (duck.action) {
      case DuckAction.SLEEP: return SPRITE_SLEEP;
      case DuckAction.DRAG: return SPRITE_CRY;
      case DuckAction.ATTACK: return SPRITE_ATTACK;
      
      case DuckAction.WALK:
      case DuckAction.RUN:
        return frame === 0 ? SPRITE_WALK_1 : SPRITE_WALK_2;
      
      case DuckAction.FLY:
        return frame === 0 ? SPRITE_FLY_1 : SPRITE_FLY_2;
        
      case DuckAction.SWIM:
        return frame === 0 ? SPRITE_SWIM_1 : SPRITE_SWIM_2;
        
      case DuckAction.IDLE:
      default:
        return SPRITE_IDLE;
    }
  }, [duck.action, frame]);

  const getDisplayText = () => {
    if (duck.speech) return duck.speech;

    switch (duck.action) {
      case DuckAction.SLEEP: return "Zzzz...";
      case DuckAction.ATTACK: return "Grrr! (Bug)";
      case DuckAction.DRAG: return "SOLTA MEU CÓDIGO!";
      case DuckAction.FLY: return "Migrando pra Nuvem...";
      case DuckAction.SWIM: return "Navegando no StackOverflow...";
      case DuckAction.RUN: return "Deploy na Sexta!";
      default: return "Quack.";
    }
  };

  const displayText = getDisplayText();
  const scaleX = duck.direction === 1 ? 1 : -1;

  return (
    <div
      className="absolute select-none flex flex-col items-center group will-change-transform"
      style={{
        transform: `translate3d(${duck.x}px, ${duck.y}px, 0) scale(${duck.scale})`,
        zIndex: duck.action === DuckAction.FLY ? 9999 : duck.zIndex,
        transition: duck.action === DuckAction.DRAG ? 'none' : 'transform 0.05s linear',
        cursor: duck.action === DuckAction.DRAG ? 'grabbing' : 'grab',
        top: 0,
        left: 0,
      }}
      onMouseDown={(e) => onMouseDown(duck.id, e)}
    >
      {/* Speech Bubble - Always show on hover */}
      <div className="absolute bottom-[60px] opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-[10000]">
        <div className="bg-white border border-black p-2 px-3 rounded shadow-sm whitespace-nowrap relative">
          <p className="font-bold text-gray-800 text-[12px] leading-tight">{displayText}</p>
          <div className="absolute left-1/2 -translate-x-1/2 bottom-[-4px] w-2 h-2 bg-white border-b border-r border-black transform rotate-45"></div>
        </div>
      </div>

      {/* Name Tag */}
      <div className="absolute bottom-[24px] opacity-0 group-hover:opacity-100 bg-black/80 text-white text-[10px] px-2 py-1 rounded pointer-events-none transition-opacity whitespace-nowrap z-50 flex flex-col items-center leading-tight">
        <span className="font-bold text-yellow-300">{duck.name}</span>
        <span className="text-gray-300 text-[9px]">Dono: {duck.owner}</span>
      </div>
        
      {/* VISUALS WRAPPER */}
      <div className="flex flex-col items-center">
        {/* PIXEL ART SVG RENDERING */}
        <svg 
          width="32" 
          height="32" 
          viewBox="0 0 16 16" 
          style={{
            transform: `scaleX(${scaleX})`,
            imageRendering: 'pixelated'
          }}
          className="drop-shadow-sm"
        >
          {renderSprite(currentSprite)}
        </svg>
        
        {/* Water Ripple Effect */}
        {duck.action === DuckAction.SWIM && (
          <div className="absolute bottom-3 w-6 h-1 bg-blue-300/50 rounded-full animate-pulse"></div>
        )}

        {/* Shadow */}
        {duck.action !== DuckAction.FLY && duck.action !== DuckAction.SWIM && (
          <div className="absolute bottom-[4px] w-5 h-1 bg-black/20 rounded-full blur-[0.5px]"></div>
        )}
      </div>
    </div>
  );
};
