import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

import { WorkoutModule } from './workouts/workout.module';
import { LoginModule } from './login/login.module';

import { AppComponent } from './app.component';

import { FitnessApiService } from './fitness-api-service.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    WorkoutModule,
    LoginModule
  ],
  providers: [FitnessApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
