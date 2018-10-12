import { Injectable } from '@angular/core';
import { Headers, Http, XHRBackend, RequestOptions } from '@angular/http';
import {BehaviorSubject, Subject} from 'rxjs';

import { User } from './User';
import { WorkoutProgram } from './Workout';
import { Exercise } from './Exercise';
import { environment } from 'src/environments/environment';

@Injectable()

export class FitnessApiService {
  public currentUser : BehaviorSubject<User>;
  public currentWorkout : BehaviorSubject<WorkoutProgram>
  public allWorkouts : BehaviorSubject<WorkoutProgram[]>
  public LoggedIn : BehaviorSubject<Boolean>

  private baseUrl: string;

  private createUserSource = new Subject<User>();
  onCreateUser$ = this.createUserSource.asObservable();


  constructor(private http: Http)
  {
    let workoutArray: WorkoutProgram[] = [];
    let defaultWorkout = new WorkoutProgram();
    let defaultExercise = new Exercise();
    let defaultUser = new User();
    let loggedIn = new Boolean(false);

    defaultUser.username = "firstUser";
    defaultUser._id = "fakeUserId";

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
    this.LoggedIn = new BehaviorSubject<Boolean>(loggedIn);
  }

  Login(username: string): Promise<User>
  {
    let url = this.baseUrl + '/users/Login/' + username;

    return this.http.post(url, null)
      .toPromise()
      .then((response) =>
        {
         this.currentUser.next(response.json().currentUser as User);
         this.LoggedIn.next(response.json().LoggedIn as Boolean);
        })
      .catch(this.handleError);
  }

  GetCurrentUser() : User
  {
    let url = this.baseUrl + '/users/GetCurrentUser';

    return this.currentUser.value;
  }

  CreateUser(username: string) : Promise<User>
  {
    let url = this.baseUrl + '/users/CreateUser';
    const body = JSON.stringify({username: username});

    return this.http.post(url, body)  
      .toPromise()
      .then((response) =>
        {
          this.currentUser.next(response.json().currentUser as User);
        })
      .catch(this.handleError)
      // return this.http.post(`${this.baseUrl}/users/CreateUser`, body, {headers: this.headers})  
      // .subscribe(data =>
      //   {
      //     const token = data['token'];
      //     if(token){
      //     this.currentUser.subscribe(_user => {
      //       localStorage.setItem('_id', _user._id);
      //       localStorage.setItem('username', _user.username);
      //     }
      //     });
      //     this.createUserSource.next(data);
      //   })
  }

  GetAllWorkouts() : Promise<WorkoutProgram[]> 
  {
    let url = this.baseUrl + '/workouts/GetAllWorkouts/';

    return this.http.get(url)
                    .toPromise()
                    .then((response) => {
                      this.allWorkouts.next(response.json().WorkoutProgram as WorkoutProgram[])
                    }).catch(this.handleError);
  }

  createWorkoutProgram(workoutName:string) : Promise<WorkoutProgram>
  {
    let url = this.baseUrl + '/workouts/CreateWorkoutProgram/';
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
    let url = this.baseUrl + '/workouts/removeWorkout/' + workoutId;

    return this.http.delete(url)
      .toPromise()
      .then((response) => this.currentWorkout.next(response.json().WorkoutProgram as WorkoutProgram))
      .catch(this.handleError);
  }

  CreateExercise(workoutId:string, exercise: Exercise) : Promise<WorkoutProgram>
  {
    let url = this.baseUrl + "/exercises/CreateExercise/" + workoutId;

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
    let url = this.baseUrl + '/workouts/selectWorkout/';
    const body = {workoutId: workoutId};

    return this.http.post(url, body)
      .toPromise()
      .then((response) => this.currentWorkout.next(response.json().WorkoutProgram as WorkoutProgram))
      .catch(this.handleError);
  }

  DeleteExercise(workoutId:string, exerciseId: string) : Promise<WorkoutProgram>
  {
    let url = this.baseUrl + "/exercises/DeleteExercise/" + workoutId;
    const body = {exerciseId: exerciseId}

    return this.http.delete(url, {body:body})
      .toPromise()
      .then((response) => this.currentWorkout.next(response.json().WorkoutProgram as WorkoutProgram))
      .catch(this.handleError);
  }

  CreateWorkoutActivity(workoutId: string, activityDescription: string) : Promise<WorkoutProgram>
  {
    let url = this.baseUrl + "/workoutActivities/CreateWorkoutActivity/" + workoutId;

    const body = {
      description: activityDescription
    };

    return this.http.post(url, body, {headers: this.headers})
      .toPromise()
      .then((response) => this.currentWorkout.next(response.json().WorkoutProgram as WorkoutProgram))
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error("Something went wrong with the request", error);
    return Promise.reject(error.message || error);
  }
}
