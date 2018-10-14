import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FitnessApiService } from '../../fitness-api-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  currentUser = FitnessApiService.currentUser;
  username = new FormControl();
  newusername = new FormControl();
  LoggedIn = FitnessApiService.LoggedIn;


  constructor(private apiService : FitnessApiService) 
  {
    // this.LoggedIn.subscribe();
    // this.currentUser.subscribe();
  }

  ngOnInit() {
  }

  loginClick()
  {
    this.apiService.Login(this.username.value).subscribe(_user =>
      {
        if(_user !== null)
        {
            this.currentUser.next(_user);
            this.LoggedIn.next(true);
        }
        else{
            throw Error;
        }
      });
  }

  logoutClick(){
    this.LoggedIn.next(false);
    this.currentUser.next(null);
  }

  onCreateUserClick()
  {
    this.apiService.CreateUser(this.newusername.value).subscribe(_user =>
      {
          this.currentUser.next(_user);
      });
  }

  ngOnDestroy()
  {
    this.currentUser.unsubscribe();
    this.LoggedIn.unsubscribe();
  }
}