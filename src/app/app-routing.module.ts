import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";

import { LoginComponent } from "./login/login/login.component";
import { WorkoutsComponent } from "./workouts/workouts/workouts.component";

@NgModule({
    imports: [
        RouterModule.forChild([
            {path: '', redirectTo: '/index', pathMatch: 'full'},
            {path: 'Login', component: LoginComponent},
            {path: 'Workouts', component: WorkoutsComponent}
        ])
    ]
})

export class AppRoutingModule { }