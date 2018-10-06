import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { WorkoutsComponent } from './workouts/workouts.component';
import { ExercisesComponent } from './exercises/exercises.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  declarations: [WorkoutsComponent, ExercisesComponent],
  exports: [
    WorkoutsComponent,
    ExercisesComponent
  ]
})
export class WorkoutModule { }