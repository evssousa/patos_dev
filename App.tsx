import React, { useEffect, useState, useRef, useCallback } from 'react';
import { Duck } from './components/Duck';
import { TechEcosystem, TREE_SVG } from './components/TechEcosystem';
import { DuckAction, DuckState } from './types';
import { 
  STUDENT_DUCKS,
  PROGRAMMER_QUOTES,
  DRAG_QUOTES,
  ATTACK_QUOTES,
  RUN_QUOTES,
  INTERVAL_MS, 
  SPEECH_DURATION_TICKS,
  WALK_SPEED, 
  RUN_SPEED, 
  FLY_SPEED,
  PARK_LAYOUT
} from './constants';

const App: React.FC = () => {
  const [ducks, setDucks] = useState<DuckState[]>([]);
  const [draggedDuckId, setDraggedDuckId] = useState<string | null>(null);
  const mousePos = useRef({ x: 0, y: 0 });
  const tickRef = useRef<number>(0);

  // Initialize ducks from STUDENT_DUCKS array
  useEffect(() => {
    const initialDucks: DuckState[] = STUDENT_DUCKS.map((studentDuck, i) => ({
      id: `duck-${i}`,
      name: studentDuck.duckName,
      owner: studentDuck.owner,
      x: Math.random() * (window.innerWidth - 50),
      y: Math.random() * (window.innerHeight - 50),
      vx: (Math.random() - 0.5) * WALK_SPEED,
      vy: (Math.random() - 0.5) * WALK_SPEED,
      direction: Math.random() > 0.5 ? 1 : -1,
      action: DuckAction.IDLE,
      scale: 1, // Default small scale
      zIndex: 1,
      speech: null,
      speechTimer: 0
    }));
    setDucks(initialDucks);
  }, []);

  // --- Mouse Event Handlers ---

  const handleMouseMove = useCallback((e: MouseEvent) => {
    mousePos.current = { x: e.clientX, y: e.clientY };
    
    if (draggedDuckId) {
      setDucks(prev => prev.map(d => {
        if (d.id === draggedDuckId) {
          return {
            ...d,
            x: e.clientX - 10, // Adjusted offset
            y: e.clientY - 10,
            vx: 0,
            vy: 0,
            action: DuckAction.DRAG,
            zIndex: 99999 // Always on top when dragging
          };
        }
        return d;
      }));
    }
  }, [draggedDuckId]);

  const handleMouseUp = useCallback(() => {
    if (draggedDuckId) {
      setDucks(prev => prev.map(d => {
        if (d.id === draggedDuckId) {
          // Drop physics
          return {
            ...d,
            action: DuckAction.FLY, // They fly for a bit after being dropped
            vx: (Math.random() - 0.5) * 10,
            vy: -5, // Pop up a bit
            speech: "Me solta!", 
            speechTimer: SPEECH_DURATION_TICKS
          };
        }
        return d;
      }));
      setDraggedDuckId(null);
    }
  }, [draggedDuckId]);

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [handleMouseMove, handleMouseUp]);

  const startDrag = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    setDraggedDuckId(id);
    
    // Set angry speech immediately when drag starts
    setDucks(prev => prev.map(d => {
      if (d.id === id) {
        return {
          ...d,
          speech: DRAG_QUOTES[Math.floor(Math.random() * DRAG_QUOTES.length)],
          speechTimer: SPEECH_DURATION_TICKS,
          action: DuckAction.DRAG
        };
      }
      return d;
    }));
  };

  // --- The Duck Brain (Game Loop) ---
  useEffect(() => {
    const interval = setInterval(() => {
      const { innerWidth, innerHeight } = window;
      const PADDING = 30;
      const POND_Y_START = innerHeight * 0.8; // 80% down is water
      tickRef.current += 1;

      setDucks(currentDucks => {
        return currentDucks.map((duck) => {
          // If being dragged, do nothing (handled by mouse move)
          if (duck.action === DuckAction.DRAG) return duck;

          let { x, y, vx, vy, direction, action, speech, speechTimer } = duck;

          // 0. Update Timers
          if (speechTimer && speechTimer > 0) {
            speechTimer--;
          } else {
            speech = null;
          }

          // 1. BEHAVIOR DECISIONS (Brain)
          const roll = Math.random();
          
          // Randomly think about programming (If not already speaking)
          if (!speech && roll < 0.001) { 
             speech = PROGRAMMER_QUOTES[Math.floor(Math.random() * PROGRAMMER_QUOTES.length)];
             speechTimer = SPEECH_DURATION_TICKS;
          }

          // Mouse Aggression/Reaction
          const dxMouse = mousePos.current.x - x;
          const dyMouse = mousePos.current.y - y;
          const distMouse = Math.sqrt(dxMouse*dxMouse + dyMouse*dyMouse);
          
          if (distMouse < 100 && action !== DuckAction.SLEEP && action !== DuckAction.FLY) {
             // Roll for reaction
             if (roll < 0.05) {
               if (!speech) {
                   speech = ATTACK_QUOTES[Math.floor(Math.random() * ATTACK_QUOTES.length)];
                   speechTimer = SPEECH_DURATION_TICKS;
               }
               action = DuckAction.ATTACK;
               direction = dxMouse > 0 ? 1 : -1;
               vx = (dxMouse / distMouse) * RUN_SPEED;
               vy = (dyMouse / distMouse) * RUN_SPEED;
             } else if (roll > 0.95) {
               if (!speech) {
                   speech = RUN_QUOTES[Math.floor(Math.random() * RUN_QUOTES.length)];
                   speechTimer = SPEECH_DURATION_TICKS;
               }
               action = DuckAction.RUN;
               vx = -(dxMouse / distMouse) * RUN_SPEED;
               vy = -(dyMouse / distMouse) * RUN_SPEED;
               direction = vx > 0 ? 1 : -1;
             }
          }

          // Regular State Transitions
          if (tickRef.current % 30 === 0) {
            // General state machine
            if (action === DuckAction.WALK && roll < 0.1) action = DuckAction.IDLE;
            else if (action === DuckAction.IDLE && roll < 0.1) action = DuckAction.SLEEP;
            else if (action === DuckAction.SLEEP && roll < 0.05) action = DuckAction.IDLE;
            else if (action === DuckAction.FLY && roll < 0.05) action = DuckAction.WALK;
            else if (action !== DuckAction.FLY && action !== DuckAction.SLEEP && action !== DuckAction.SWIM && roll < 0.01) action = DuckAction.FLY;
            
            // Random movement changes
            if (action === DuckAction.WALK || action === DuckAction.SWIM) {
              const angle = Math.random() * Math.PI * 2;
              vx = Math.cos(angle) * WALK_SPEED;
              vy = Math.sin(angle) * WALK_SPEED;
            }
          }

          // 2. PHYSICS & MOVEMENT
          
          if (action === DuckAction.FLY) {
             x += vx * 1.5;
             y += vy * 1.5;
          } else if (action !== DuckAction.SLEEP && action !== DuckAction.IDLE) {
             x += vx;
             y += vy;
          }

          // Direction Facing
          if (Math.abs(vx) > 0.1) {
            direction = vx > 0 ? 1 : -1;
          }

          // 3. BOUNDARIES
          if (x > innerWidth - PADDING) { x = innerWidth - PADDING; vx *= -1; }
          if (x < 0) { x = 0; vx *= -1; }
          if (y > innerHeight - PADDING) { y = innerHeight - PADDING; vy *= -1; }
          if (y < 0) { y = 0; vy *= -1; }

          // 4. ENVIRONMENT INTERACTIONS (The Park Rules)
          
          // A. Pond Logic (Strict)
          // If in the bottom 20% of screen, MUST be swimming.
          // This overrides walking/running/attacking.
          if (y > POND_Y_START && action !== DuckAction.FLY) {
             action = DuckAction.SWIM;
          } else if (action === DuckAction.SWIM && y <= POND_Y_START) {
             // If leaving water, stop swimming
             action = DuckAction.WALK;
          }

          return {
            ...duck,
            x,
            y,
            vx,
            vy,
            direction,
            action,
            speech,
            speechTimer,
            // Z-Index Logic: 
            // Fly = Top.
            // Walk/Idle = Based on Y.
            zIndex: action === DuckAction.FLY ? 99999 : Math.floor(y)
          };
        });
      });
    }, INTERVAL_MS);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-screen bg-gray-50 overflow-hidden font-sans select-none cursor-default">
      
      {/* Background Layer (Grass) */}
      <TechEcosystem />

      {/* Header */}
      <div className="absolute top-6 left-6 z-[100] pointer-events-none opacity-50 hover:opacity-100 transition-opacity">
        <h1 className="text-2xl font-black text-gray-800 tracking-tighter bg-white/50 px-2 rounded backdrop-blur-sm" style={{ fontFamily: 'monospace' }}>
          &lt;PATOS_DEV /&gt;
        </h1>
        <p className="text-xs text-gray-600 font-mono bg-white/50 px-2 mt-1 rounded inline-block">
          Arraste. Irrite. Observe. {ducks.length} Patos.
        </p>
      </div>

      {/* Render Ducks */}
      {ducks.map(duck => (
        <Duck 
          key={duck.id} 
          duck={duck} 
          onMouseDown={startDrag} 
        />
      ))}

      {/* Foreground Objects: Trees */}
      {/* Rendered here to participate in visual Z-sorting logic implicitly or explicitly if needed.
          Since Ducks use zIndex = Math.floor(y), we set Tree zIndex based on their Y base. 
      */}
      {PARK_LAYOUT.TREES.map((tree, i) => {
        const top = (tree.y / 100) * window.innerHeight;
        const left = (tree.x / 100) * window.innerWidth;
        // Tree height is approx 80px. The "base" is at top + 80.
        // We set zIndex to base Y.
        const baseZ = Math.floor(top + 70); 

        return (
          <div 
            key={`tree-${i}`} 
            className="absolute pointer-events-none"
            style={{ 
              left, 
              top, 
              transform: `scale(${tree.scale})`,
              zIndex: baseZ
            }}
          >
            {TREE_SVG}
          </div>
        );
      })}

    </div>
  );
};

export default App;
