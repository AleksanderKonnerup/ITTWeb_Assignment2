import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Component } from '@angular/core';
import { HttpModule } from '@angular/http';

import { WorkoutModule } from './workouts/workout.module';
import { HttpClientModule} from '@angular/common/http'
import { LoginModule } from './login/login.module';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { FitnessApiService } from './fitness-api-service.service';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    WorkoutModule,
    LoginModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [FitnessApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
