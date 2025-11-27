
import React from 'react';
import { DuckAction, DuckState } from '../types';

interface DuckProps {
  duck: DuckState;
  onMouseDown: (id: string, e: React.MouseEvent) => void;
}

export const Duck: React.FC<DuckProps> = ({ duck, onMouseDown }) => {
  
  // Determine text to show. Priority: Specific Speech > Action Fallback
  const getDisplayText = () => {
    if (duck.speech) return duck.speech;

    switch (duck.action) {
      case DuckAction.SLEEP: return "Zzzz (Compilando)...";
      case DuckAction.ATTACK: return "Grrr! (Bug)";
      case DuckAction.DRAG: return "SOLTA MEU CÓDIGO!";
      case DuckAction.FLY: return "Migrando pra Nuvem...";
      case DuckAction.SWIM: return "Navegando no StackOverflow...";
      case DuckAction.RUN: return "Deploy na Sexta!";
      default: return "Quack.";
    }
  };

  const displayText = getDisplayText();

  return (
    <div
      className="absolute select-none flex flex-col items-center group will-change-transform"
      style={{
        // Use translate3d for GPU acceleration
        transform: `translate3d(${duck.x}px, ${duck.y}px, 0) scale(${duck.scale})`,
        zIndex: duck.action === DuckAction.FLY ? 9999 : duck.zIndex,
        transition: duck.action === DuckAction.DRAG ? 'none' : 'transform 0.05s linear',
        cursor: duck.action === DuckAction.DRAG ? 'grabbing' : 'grab',
        top: 0,
        left: 0,
      }}
      onMouseDown={(e) => onMouseDown(duck.id, e)}
    >
      {/* Speech Bubble - Moved higher to bottom-[80px] to clear the 2-line name tag */}
      <div className="absolute bottom-[80px] opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-[10000]">
        <div className="bg-white border border-black p-2 px-3 rounded shadow-sm whitespace-nowrap relative">
          <p className="font-bold text-gray-800 text-[12px] leading-tight">{displayText}</p>
          {/* Bubble triangle - Extended to reach down */}
          <div className="absolute left-1/2 -translate-x-1/2 bottom-[-4px] w-2 h-2 bg-white border-b border-r border-black transform rotate-45"></div>
        </div>
      </div>

      {/* Name Tag (With Owner) - Positioned just above the duck */}
      <div className="absolute bottom-[24px] opacity-0 group-hover:opacity-100 bg-black/80 text-white text-[10px] px-2 py-1 rounded pointer-events-none transition-opacity whitespace-nowrap z-50 flex flex-col items-center leading-tight">
        <span className="font-bold text-yellow-300">{duck.name}</span>
        <span className="text-gray-300 text-[9px]">Dono: {duck.owner}</span>
      </div>
        
      {/* Simple Square Duck */}
      <div 
        className="w-4 h-4 shadow-sm border border-black/10 transition-colors duration-300"
        style={{ 
          backgroundColor: duck.action === DuckAction.ATTACK ? '#ef4444' : '#facc15', // Red if angry, Yellow otherwise
          borderRadius: '2px'
        }}
      />
    </div>
  );
};
