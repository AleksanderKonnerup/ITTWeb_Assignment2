import { Injectable } from '@angular/core';
import {BehaviorSubject, Subject, Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http'
import { User } from './User';
import { WorkoutProgram } from './Workout';
import { Exercise } from './Exercise';
import { ActivityLog } from './ActivityLog';
import { environment } from 'src/environments/environment';

@Injectable()

export class FitnessApiService {
  public static currentUser : BehaviorSubject<User>;
  public static currentWorkout : BehaviorSubject<WorkoutProgram>;
  public static allWorkouts : BehaviorSubject<WorkoutProgram[]>;
  public static LoggedIn : BehaviorSubject<Boolean>;

  private baseUrl: string;

  private createUserSource = new Subject<User>();
  onCreateUser$ = this.createUserSource.asObservable();


  constructor(private http: HttpClient)
  {
    let workoutArray: WorkoutProgram[] = [];
    let defaultWorkout = new WorkoutProgram();
    let defaultExercise = new Exercise();
    let defaultUser = new User();

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

    FitnessApiService.currentUser = new BehaviorSubject<User>(defaultUser);
    FitnessApiService.currentWorkout = new BehaviorSubject<WorkoutProgram>(defaultWorkout);
    FitnessApiService.allWorkouts = new BehaviorSubject<WorkoutProgram[]>(workoutArray);
    FitnessApiService.LoggedIn = new BehaviorSubject<Boolean>(false);
  }

  Login(username: string)
  {
    let url = this.baseUrl + '/users/Login/' + username;

    return this.http.post<User>(url, null);
  }

  GetCurrentUser()
  {
    if(FitnessApiService.currentUser.value !== null)
      return FitnessApiService.currentUser;
  }

  CreateUser(username: string)
  {
    let url = this.baseUrl + '/users/CreateUser';
    const body = {username: username};

    return this.http.post<User>(url, body);
  }


  GetAllWorkouts() 
  {
    let url = this.baseUrl + '/workouts/GetAllWorkouts/';
    let array = [];

    return this.http.get<WorkoutProgram[]>(url).subscribe(result => {
      array = result;

      console.log(result);

      FitnessApiService.allWorkouts.next(array);
    });
  }

  createWorkoutProgram(WorkoutProgram: WorkoutProgram)
  {
    let url = this.baseUrl + '/workouts/CreateWorkoutProgram/';
    const body = {workoutName : WorkoutProgram.workoutName};

    return this.http.post<WorkoutProgram>(url, body);
  }

  removeWorkout(workoutId:string)
  {
    let url = this.baseUrl + '/workouts/removeWorkout/' + workoutId;

    return this.http.delete<WorkoutProgram>(url);
  }

  CreateExercise(workoutId:string, exercise: Exercise)
  {
    let url = this.baseUrl + "/exercises/CreateExercise/" + workoutId;

    const body = {
      exercisename: exercise.exerciseName,
      description: exercise.description,
      sets: exercise.sets,
      reps: exercise.reps
    };

    return this.http.post<Exercise>(url, body);
  }

  selectWorkout(workoutId:string)
  {
    let url = this.baseUrl + '/workouts/selectWorkout/';
    const body = {workoutId: workoutId};

    return this.http.post<WorkoutProgram>(url, body)
  }

  DeleteExercise(workoutId:string, exerciseId: string)
  {
    let url = this.baseUrl + "/exercises/DeleteExercise/" + workoutId + "/" + exerciseId;

    return this.http.delete<Exercise>(url)
  }

  CreateWorkoutActivity(workoutId: string, activityDescription: string)
  {
    let url = this.baseUrl + "/workoutActivities/CreateWorkoutActivity/" + workoutId;

    const body = {
      description: activityDescription
    };

    return this.http.post<ActivityLog>(url, body)
  }

  private handleError(error: any): Promise<any> {
    console.error("Something went wrong with the request", error);
    return Promise.reject(error.message || error);
  }
}
