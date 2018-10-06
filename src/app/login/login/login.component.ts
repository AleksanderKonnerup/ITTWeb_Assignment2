import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

import { FitnessApiService } from '../../fitness-api-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username = new FormControl();
  newusername = new FormControl();

  constructor(private apiService : FitnessApiService) 
  {
    console.log("This comes from LoginComponent!");
  }

  ngOnInit() {
  }

  loginClick()
  {
    this.apiService.Login(this.username.value);
  }

  onCreateUserClick()
  {
    this.apiService.CreateUser(this.newusername.value);
  }

  ngOnDestroy()
  {
    this.apiService.currentUser.unsubscribe();
  }
}
