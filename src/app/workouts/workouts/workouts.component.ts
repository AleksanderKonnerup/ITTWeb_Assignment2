import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

import { FitnessApiService } from '../../fitness-api-service.service';
import { Exercise } from '../../Exercise';
import { User } from '../../User';

@Component({
  selector: 'app-workouts',
  templateUrl: './workouts.component.html',
  styleUrls: ['./workouts.component.css'],
})

export class WorkoutsComponent implements OnInit {
  currentWorkout = this.apiService.currentWorkout.value;
  currentUser = this.apiService.currentUser.value;

  workoutId = new FormControl();
  workoutName = new FormControl();

  exerciseId = new FormControl();
  exerciseName = new FormControl();
  exerciseDescription = new FormControl();
  exerciseSet = new FormControl();
  exerciseReps = new FormControl();

  constructor(private apiService : FitnessApiService) { }

  ngOnInit() {
  }

  removeExerciseClick() {
    this.apiService.DeleteExercise(this.workoutId.value, this.exerciseId.value);
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
    this.apiService.selectWorkout(this.workoutId.value);
  }

  removeWorkOutClick() {
    this.apiService.removeWorkout(this.workoutId.value);
  }

  createWorkoutProgramClick(){
    this.apiService.createWorkoutProgram(this.workoutName.value);
    this.apiService.selectWorkout(this.currentWorkout._id);
  }

}
