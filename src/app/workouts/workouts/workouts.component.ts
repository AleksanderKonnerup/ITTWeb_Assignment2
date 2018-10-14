import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

import { FitnessApiService } from '../../fitness-api-service.service';
import { Exercise } from '../../Exercise';
import { WorkoutProgram } from '../../Workout';

@Component({
  selector: 'app-workouts',
  templateUrl: './workouts.component.html',
  styleUrls: ['./workouts.component.css'],
})

export class WorkoutsComponent implements OnInit {
  currentWorkout = FitnessApiService.currentWorkout;
  currentUser = FitnessApiService.currentUser;
  allWorkouts = FitnessApiService.allWorkouts;
  LoggedIn = FitnessApiService.LoggedIn;

  workoutId = new FormControl();
  workoutName = new FormControl();

  exerciseId = new FormControl();
  exerciseName = new FormControl();
  exerciseDescription = new FormControl();
  exerciseSet = new FormControl();
  exerciseReps = new FormControl();

  constructor(private apiService : FitnessApiService) { 
  }

  ngOnInit() {
  }

  removeExerciseClick() {
    this.apiService.DeleteExercise(this.workoutId.value, this.exerciseId.value).subscribe();
  }
  
  createExerciseClick(){
    var newExercise = new Exercise();
    newExercise.exerciseName = this.exerciseName.value;
    newExercise.description = this.exerciseDescription.value;
    newExercise.sets = this.exerciseSet.value;
    newExercise.reps = this.exerciseReps.value;

    this.apiService.CreateExercise(this.workoutId.value, newExercise);
  }

  selectWorkOutClick() {
    this.apiService.selectWorkout(this.workoutId.value).subscribe(WorkoutProgram => {
      this.currentWorkout.next(WorkoutProgram);
    });
  }

  removeWorkOutClick() {
    this.apiService.removeWorkout(this.workoutId.value).subscribe(() => {
      this.apiService.GetAllWorkouts();
    });
  }

  createWorkoutProgramClick(){
    // var newExercise = new Exercise();
    // newExercise.exerciseName = this.exerciseName.value;
    // newExercise.description = this.exerciseDescription.value;
    // newExercise.sets = this.exerciseSet.value;
    // newExercise.reps = this.exerciseReps.value;

    var workoutProgram = new WorkoutProgram();
    workoutProgram.exercises = [];//.push(newExercise);
    workoutProgram.workoutName = this.workoutName.value;

    this.apiService.createWorkoutProgram(workoutProgram).subscribe(WorkoutProgram =>
      {
          this.currentWorkout.next(WorkoutProgram);
          this.apiService.GetAllWorkouts();
        });

    /*.subscribe(workoutProgram =>
      {
        console.log(workoutProgram);

        this.allWorkouts.next(workoutProgram);
      });*/
  }

}
