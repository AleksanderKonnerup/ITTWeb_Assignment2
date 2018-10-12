import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

import { FitnessApiService } from '../../fitness-api-service.service';
import { BehaviorSubject, Subscription, Observable } from 'rxjs';

import {DataSource} from '@angular/cdk/collections';
import { User } from 'src/app/User';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  currentUser = this.apiService.currentUser.value;

  username = new FormControl();
  newusername = new FormControl();
  
  createUserSubscription: Subscription;
  // userData: UserData;
  // dataSource: UsersDataSource;


  constructor(private apiService : FitnessApiService) 
  {
    this.currentUser = new User();
    // this.userData = new UserData(this.apiService);
    // this.dataSource = new UsersDataSource(this.userData);
    // this.createUserSubscription = this.apiService.onCreateUser$.subscribe(user => this.userData.addUser(user));
  }

  ngOnInit() {
  }

  loginClick()
  {
    this.apiService.Login(this.username.value);
  }

  logoutClick(){
    this.apiService.Login(this.username.value);
  }

  onCreateUserClick()
  {
    this.apiService.CreateUser(this.newusername.value);
  }

  // ngOnDestroy()
  // {
  //   this.apiService.currentUser.unsubscribe();
  // }
}

// export class UserData {
//   dataChange: BehaviorSubject<User[]> = new BehaviorSubject<User[]>([]);
//   get data(): User[] { return this.dataChange.value }

//   constructor(private apiService: FitnessApiService) {
//     this.apiService.GetCurrentUser()
//       .subscribe((user) => {
//         this.dataChange.next([user]);
//       });
//   }

//   addUser(user: User) {
//     this.data.push(user);
//     this.dataChange.next(this.data);
//   }
// };

// export class UsersDataSource extends DataSource<any> {
//   constructor(private _user: UserData) {
//     super();
//   }

//   connect(): Observable<User[]> {
//     return this._user.dataChange;
//   }

//   disconnect() {
//   }
// }