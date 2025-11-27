import React from 'react';

// --- PIXEL ART ASSETS FOR PARK ---
// Exported so App.tsx can use them for foreground objects

export const TREE_SVG = (
  <svg width="60" height="80" viewBox="0 0 30 40">
    {/* Trunk */}
    <rect x="12" y="25" width="6" height="15" fill="#8D6E63" />
    {/* Leaves */}
    <rect x="8" y="10" width="14" height="20" fill="#4CAF50" />
    <rect x="5" y="15" width="20" height="10" fill="#4CAF50" />
    <rect x="10" y="5" width="10" height="10" fill="#4CAF50" />
    {/* Shadow */}
    <rect x="10" y="38" width="10" height="2" fill="rgba(0,0,0,0.2)" />
  </svg>
);

export const FLOWER_SVG = (
  <svg width="20" height="20" viewBox="0 0 10 10">
    <rect x="4" y="2" width="2" height="6" fill="#4CAF50" />
    <rect x="3" y="1" width="4" height="4" fill="#E91E63" />
    <rect x="4" y="2" width="2" height="2" fill="#FFEB3B" />
  </svg>
);

export const TechEcosystem: React.FC = () => {
  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-hidden bg-[#C5E1A5]"> {/* Light Green Grass */}
      
      {/* 1. GRASS TEXTURE */}
      <div className="absolute inset-0 opacity-10" 
           style={{ 
             backgroundImage: 'radial-gradient(#558B2F 1px, transparent 1px)', 
             backgroundSize: '20px 20px' 
           }}>
      </div>

      {/* 2. THE POND (Water Area) */}
      <div className="absolute bottom-0 w-full h-[20%] bg-[#4FC3F7] border-t-8 border-[#FFF59D] flex flex-col justify-end">
         {/* Sand Border visually created by border-t */}
         <div className="w-full h-4 bg-[#FFF59D] opacity-50 absolute top-0 -mt-2 blur-sm"></div>
         
         {/* Water Ripples */}
         <div className="w-full h-full opacity-30" 
              style={{ 
                backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, #29B6F6 10px, #29B6F6 20px)' 
              }}>
         </div>
      </div>

      {/* 3. STATIC SCENERY (Background Layer) */}

      {/* Flowers (Decorations) */}
      <div className="absolute bottom-[28%] left-[25%]">{FLOWER_SVG}</div>
      <div className="absolute bottom-[29%] left-[27%] transform scale-75">{FLOWER_SVG}</div>
      <div className="absolute bottom-[32%] right-[18%]">{FLOWER_SVG}</div>
      <div className="absolute top-[50%] left-[50%]">{FLOWER_SVG}</div>
      <div className="absolute top-[55%] left-[52%]">{FLOWER_SVG}</div>

      {/* Sand Patch */}
      <div className="absolute top-[25%] right-[5%] w-20 h-10 bg-[#FFF59D] rounded-full opacity-80 flex items-center justify-center">
        <div className="transform scale-50 -mt-4">{FLOWER_SVG}</div>
      </div>

    </div>
  );
};
