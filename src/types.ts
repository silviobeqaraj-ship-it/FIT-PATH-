export interface UserStats {
  steps: number;
  calories: number;
  heartRate: number;
  activeMinutes: number;
}

export interface MacroData {
  protein: number;
  carbs: number;
  fats: number;
  goal: number;
  current: number;
}

export interface Meal {
  id: string;
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
  type: 'Breakfast' | 'Lunch' | 'Dinner' | 'Snack';
}

export interface Exercise {
  id: string;
  name: string;
  sets: number;
  reps: string;
  weight?: string;
  completed: boolean;
}

export interface WorkoutRoutine {
  id: string;
  title: string;
  exercises: Exercise[];
}
