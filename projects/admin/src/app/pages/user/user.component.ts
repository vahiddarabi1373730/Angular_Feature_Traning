import {Component, inject, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {UserErrorSelector, UserItemsSelector, UserLoadingSelector} from '../../ngrx/selectors/user-selectors';
import {AsyncPipe} from '@angular/common';
import {UserActions} from '../../ngrx/action/user-actions';
import {CreateUser, UpdateUser} from '../../models/user';

@Component({
  selector: 'app-user',
  imports: [
    AsyncPipe
  ],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss',
})
export class UserComponent implements OnInit{

  store=inject(Store)
  users$=this.store.select(UserItemsSelector);
  loading$=this.store.select(UserLoadingSelector);
  error$=this.store.select(UserErrorSelector);

  ngOnInit() {
    this.store.dispatch(UserActions.loadUsers());
  }

  addUser(){
    const user:CreateUser={
      "name": "هانیه",
      "firstName": "مرادی",
      "mobile": "09981656027",
      "isAdmin": true,
    }
    this.store.dispatch(UserActions.createUser({user}))
  }

  updateUser(){
    const user:UpdateUser={
      "name": "tttt",
      "firstName": "aaa",
      "mobile": "09981656027",
      "isAdmin": true,
    }
    this.store.dispatch(UserActions.updateUser({id:'8pBiScem1Kg',user}))
  }
}
