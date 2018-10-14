import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { User } from './User';
import { WorkoutProgram } from './Workout';
import { FitnessApiService } from './fitness-api-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  currentUser = FitnessApiService.currentUser;
  LoggedIn = FitnessApiService.LoggedIn;
  currentWorkout = FitnessApiService.currentWorkout;
  allWorkouts = FitnessApiService.allWorkouts;

  workoutId: string;
  workoutName: string;

  username: string;
  exerciseId: string;
  exerciseName: string;
  exerciseDescription: string;
  exerciseSet: number;
  exerciseReps: string;
 
  constructor(private apiService : FitnessApiService){
    FitnessApiService.currentUser.subscribe();
    FitnessApiService.LoggedIn.subscribe();
    FitnessApiService.currentWorkout.subscribe();
    FitnessApiService.allWorkouts.subscribe();
  }
  title = 'ITWeb Assignment 2';
}
