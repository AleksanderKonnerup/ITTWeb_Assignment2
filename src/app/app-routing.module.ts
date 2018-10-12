import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { LoginComponent } from "./login/login/login.component";
import { WorkoutsComponent } from "./workouts/workouts/workouts.component";

const routes : Routes = [
    {path: '', redirectTo: '/', pathMatch: 'full'},
    {path: 'Login', component: LoginComponent},
    {path: 'Workouts', component: WorkoutsComponent}
]
@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [RouterModule]
})

export class AppRoutingModule { }