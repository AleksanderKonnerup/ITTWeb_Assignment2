import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import {BehaviorSubject} from 'rxjs';
//import 'rxjs/add/operator/toPromise';

import { User } from './User'
import { WorkoutProgram } from './Workout'
import { Exercise } from './Exercise'
import { environment } from '../environments/environment.prod';

@Injectable()

export class FitnessApiService {
  public currentUser : BehaviorSubject<User>;
  public currentWorkout : BehaviorSubject<WorkoutProgram>
  public allWorkouts : BehaviorSubject<WorkoutProgram[]>

  //private sourceUrl = 'https://ittweb-assignment2-gruppe2.herokuapp.com/';
  baseUrl: string;

  constructor(private http: Http)
  {
    let workoutArray: WorkoutProgram[] = [];
    let defaultWorkout = new WorkoutProgram();
    let defaultExercise = new Exercise();
    let defaultUser = new User();

    defaultUser.username = null;

    defaultExercise._id = "fakeAF";
    defaultExercise.exerciseName = "My First Exercise";
    defaultExercise.description = "My First Description";
    defaultExercise.sets = 1;
    defaultExercise.reps = "1";
    
    let defaultExerciseArray = [];
    defaultExerciseArray.push(defaultExercise);

    defaultWorkout._id = "fake";
    defaultWorkout.workoutName = "My First Workout";
    defaultWorkout.exercises = defaultExerciseArray;

    workoutArray.push(defaultWorkout);

    this.baseUrl= environment.api;
    this.currentUser = new BehaviorSubject<User>(defaultUser);
    this.currentWorkout = new BehaviorSubject<WorkoutProgram>(defaultWorkout);
    this.allWorkouts = new BehaviorSubject<WorkoutProgram[]>(workoutArray);
  }
  

  Login(username: string): Promise<User>
  {
    let url = this.baseUrl + '/users/' + username;

    return this.http.get(url)
      .toPromise()
      .then((response) =>
        {
          this.currentUser.next(response.json().User as User);
        })
      .catch(this.handleError);
  }

  CreateUser(username: string) : Promise<User>
  {
    let url = this.baseUrl + '/users';
    const body = {"username" : username};

    return this.http.post(url, body)  
      .toPromise()
      .then((response) =>
        {
          console.log(response.json().User as User);
          this.currentUser.next(response.json().User as User);
        })
      .catch(this.handleError)
  }

  createWorkoutProgram(workoutName:string) : Promise<WorkoutProgram>
  {
    let url = this.baseUrl + '/workouts';
    const body = {workoutName : workoutName};

    return this.http.post(url, body)
      .toPromise()
      .then((response) => 
        {
          this.currentWorkout.next(response.json().WorkoutProgram as WorkoutProgram);
        })
      .catch(this.handleError); 
  }

  removeWorkout(workoutId:string) : Promise<WorkoutProgram>
  {
    let url = this.baseUrl + '/workouts/' + workoutId;

    return this.http.delete(url)
      .toPromise()
      .then((response) => this.currentWorkout.next(response.json().WorkoutProgram as WorkoutProgram))
      .catch(this.handleError);
  }

  CreateExercise(workoutId:string, exercise: Exercise) : Promise<WorkoutProgram>
  {
    let url = this.baseUrl + "/workouts/" + workoutId + "/exercises";

    const body = {
      exercisename: exercise.exerciseName,
      description: exercise.description,
      sets: exercise.sets,
      reps: exercise.reps
    };

    return this.http.post(url, body)
      .toPromise()
      .then((response) => this.currentWorkout.next(response.json().WorkoutProgram as WorkoutProgram))
      .catch(this.handleError);
  }

  selectWorkout(workoutId:string) : Promise<WorkoutProgram>
  {
    let url = this.baseUrl + '/workouts/';
    
    const body = {workoutId: workoutId}
    return this.http.post(url, body)
      .toPromise()
      .then((response) => this.currentWorkout.next(response.json().WorkoutProgram as WorkoutProgram))
      .catch(this.handleError);
  }

  DeleteExercise(workoutId:string, exerciseId: string) : Promise<WorkoutProgram>
  {
    let url = this.baseUrl + "/workouts/" + workoutId + "/exercises/" + exerciseId;

    return this.http.delete(url)
      .toPromise()
      .then((response) => this.currentWorkout.next(response.json().WorkoutProgram as WorkoutProgram))
      .catch(this.handleError);
  }

  CreateWorkoutActivity(workoutId: string, activityDescription: string) : Promise<WorkoutProgram>
  {
    let url = this.baseUrl + "/workouts/" + workoutId + "/workoutActivities";

    const body = {
      description: activityDescription
    };

    return this.http.post(url, body)
      .toPromise()
      .then((response) => this.currentWorkout.next(response.json().WorkoutProgram as WorkoutProgram))
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error("Something went wrong with the request", error);
    
    return Promise.reject(error.message || error);
  }
}
