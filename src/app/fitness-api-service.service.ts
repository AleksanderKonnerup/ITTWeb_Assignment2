import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import {BehaviorSubject} from 'rxjs';
//import 'rxjs/add/operator/toPromise';

import { User } from './User'
import { WorkoutProgram } from './Workout'
import { Exercise } from './Exercise'

@Injectable({
  providedIn: 'root'
})

export class FitnessApiService {
  public currentUser : BehaviorSubject<User>;
  public currentWorkout : BehaviorSubject<WorkoutProgram>
  private sourceUrl = 'https://ittweb-assignment2-gruppe2.herokuapp.com/';

  constructor(private http: Http)
  {
    this.currentUser = new BehaviorSubject<User>(null);
    this.currentWorkout = new BehaviorSubject<WorkoutProgram>(null);
  }

  Login(username: string): Promise<User>
  {
    let url = this.sourceUrl + 'api/users/' + username;

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
    let url = this.sourceUrl + 'api/users';
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

  DeleteUser(user: User) : Promise<User>
  {
    let url = this.sourceUrl + 'api/users/' + user._id;

    return this.http.delete(url)
      .toPromise()
      .catch(this.handleError);
  }

  createWorkoutProgram(user:User, workoutName:string) : Promise<User>
  {
    let url = this.sourceUrl + 'api/users/'+ user._id + '/workouts';
    const body = {workoutName : workoutName};

    return this.http.post(url, body)
      .toPromise()
      .then((response) => 
        {
          this.currentUser.next(response.json().User as User);
        })
      .catch(this.handleError); 
  }

  removeWorkout(user : User, workoutId:string) : Promise<User>
  {
    let url = this.sourceUrl + 'api/users/' + user._id + '/workouts/' + workoutId;

    return this.http.delete(url)
      .toPromise()
      .then((response) => this.currentUser.next(response.json().User as User))
      .catch(this.handleError);
  }

  CreateExercise(user : User, workoutId:string, exercise: Exercise) : Promise<User>
  {
    let url = this.sourceUrl + 'api/users/' + user._id + "/workouts/" + workoutId + "/exercises";

    const body = {
      exercisename: exercise.exerciseName,
      description: exercise.description,
      sets: exercise.sets,
      reps: exercise.reps
    };

    return this.http.post(url, body)
      .toPromise()
      .then((response) => this.currentUser.next(response.json().User as User))
      .catch(this.handleError);
  }

  seletWorkout(workoutId:string) : Promise<User>
  {
    let url = this.sourceUrl + 'api/workouts/';
    
    const body = {workoutId: workoutId}
    return this.http.post(url, body)
      .toPromise()
      .then((response) => this.currentWorkout.next(response.json().WorkoutProgram as WorkoutProgram))
      .catch(this.handleError);
  }

  DeleteExercise(user : User, workoutId:string, exerciseId: string) : Promise<User>
  {
    let url = this.sourceUrl + 'api/users/' + user._id + "/workouts/" + workoutId + "/exercises/" + exerciseId;

    return this.http.delete(url)
      .toPromise()
      .then((response) => this.currentUser.next(response.json().User as User))
      .catch(this.handleError);
  }

  CreateWorkoutActivity(user : User, workoutId: string) : Promise<User>
  {
    let url = this.sourceUrl + 'api/users/' + user._id + "/workouts/" + workoutId + "/workoutActivities";

    return this.http.post(url, {})
      .toPromise()
      .then((response) => this.currentUser.next(response.json().updatedUser as User))
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error("Something went wrong with the request", error);
    
    return Promise.reject(error.message || error);
  }
}
