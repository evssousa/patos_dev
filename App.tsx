
import React, { useEffect, useState, useRef, useCallback } from 'react';
import { Duck } from './components/Duck';
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
  FLY_SPEED
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
            action: DuckAction.DRAG
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
            speech: "Me solta!", // Translated
            speechTimer: SPEECH_DURATION_TICKS // 1 minute
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
          speechTimer: SPEECH_DURATION_TICKS, // 1 minute
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
          // Uses !speech to prevent overwriting existing thoughts
          if (!speech && roll < 0.001) { // Lower chance due to high duck count
             speech = PROGRAMMER_QUOTES[Math.floor(Math.random() * PROGRAMMER_QUOTES.length)];
             speechTimer = SPEECH_DURATION_TICKS; // 1 minute
          }

          // Mouse Aggression/Reaction
          const dxMouse = mousePos.current.x - x;
          const dyMouse = mousePos.current.y - y;
          const distMouse = Math.sqrt(dxMouse*dxMouse + dyMouse*dyMouse);
          
          if (distMouse < 100 && action !== DuckAction.SLEEP && action !== DuckAction.FLY) {
             // Roll for reaction
             if (roll < 0.05) {
               // Attack mouse
               // Only set speech if not already speaking to avoid flickering/resetting timer
               if (!speech) {
                   speech = ATTACK_QUOTES[Math.floor(Math.random() * ATTACK_QUOTES.length)];
                   speechTimer = SPEECH_DURATION_TICKS; // 1 minute
               }
               action = DuckAction.ATTACK;
               direction = dxMouse > 0 ? 1 : -1;
               vx = (dxMouse / distMouse) * RUN_SPEED; // Chase mouse
               vy = (dyMouse / distMouse) * RUN_SPEED;
             } else if (roll > 0.95) {
               // Run away from mouse
               if (!speech) {
                   speech = RUN_QUOTES[Math.floor(Math.random() * RUN_QUOTES.length)];
                   speechTimer = SPEECH_DURATION_TICKS; // 1 minute
               }
               action = DuckAction.RUN;
               vx = -(dxMouse / distMouse) * RUN_SPEED;
               vy = -(dyMouse / distMouse) * RUN_SPEED;
               direction = vx > 0 ? 1 : -1;
             }
          }

          // Regular State Transitions
          // Optimized for many ducks: don't change state too often
          if (tickRef.current % 30 === 0) {
            if (action === DuckAction.WALK && roll < 0.1) action = DuckAction.IDLE;
            else if (action === DuckAction.IDLE && roll < 0.1) action = DuckAction.SLEEP;
            else if (action === DuckAction.SLEEP && roll < 0.05) action = DuckAction.IDLE; // Wake up
            else if (action === DuckAction.FLY && roll < 0.05) action = DuckAction.WALK; // Land
            else if (action !== DuckAction.FLY && action !== DuckAction.SLEEP && roll < 0.01) action = DuckAction.FLY; // Take off
            
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

          // 4. SPECIAL CONTEXTS
          // Bottom of screen = "Water" area logic
          if (y > innerHeight * 0.8 && action !== DuckAction.FLY) {
            if (action !== DuckAction.SWIM) {
              action = DuckAction.SWIM;
            }
          } else if (action === DuckAction.SWIM && y <= innerHeight * 0.8) {
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
            zIndex: action === DuckAction.FLY ? 9999 : Math.floor(y)
          };
        });
      });
    }, INTERVAL_MS);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-screen bg-white overflow-hidden font-sans select-none cursor-default">
      
      {/* Background Grid for Retro Feel */}
      <div className="absolute inset-0 pointer-events-none" 
           style={{ 
             backgroundImage: 'radial-gradient(#e5e7eb 1px, transparent 1px)', 
             backgroundSize: '20px 20px' 
           }}>
      </div>

      {/* Water Area */}
      <div className="absolute bottom-0 w-full h-[20%] bg-blue-50 border-t-2 border-blue-100 pointer-events-none"></div>

      {/* Header */}
      <div className="absolute top-6 left-6 z-[100] pointer-events-none opacity-50 hover:opacity-100 transition-opacity">
        <h1 className="text-2xl font-black text-gray-800 tracking-tighter" style={{ fontFamily: 'monospace' }}>
          &lt;PATOS_DEV /&gt;
        </h1>
        <p className="text-xs text-gray-500 font-mono">
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
    </div>
  );
};

export default App;
