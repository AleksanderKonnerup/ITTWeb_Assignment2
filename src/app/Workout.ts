import { Exercise } from './Exercise'
import { ActivityLog } from './ActivityLog'

export class WorkoutProgram {
    public _id: string;
    public workoutName: string;
    public activities: ActivityLog[];
    public exercises: Exercise[];
}