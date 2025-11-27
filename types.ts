
export enum DuckAction {
  IDLE = 'IDLE',
  WALK = 'WALK',
  RUN = 'RUN',
  JUMP = 'JUMP',
  HONK = 'HONK',
  ATTACK = 'ATTACK',
  SLEEP = 'SLEEP',
  FLY = 'FLY',
  SWIM = 'SWIM',
  DRAG = 'DRAG' // Being dragged by mouse
}

export interface DuckState {
  id: string;
  name: string;
  owner: string; // Name of the student who owns the duck
  x: number;
  y: number;
  vx: number;
  vy: number;
  direction: 1 | -1;
  action: DuckAction;
  scale: number;
  zIndex: number;
  speech?: string | null; // For programming quotes
  speechTimer?: number;
}
