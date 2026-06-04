import {inject, Injectable} from '@angular/core';
import {UserService} from '../../services/UserService';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, map, of, switchMap} from 'rxjs';
import {UserActions} from '../action/user-actions';

@Injectable({providedIn: 'root'})
export class UserEffects{
  userService=inject(UserService)
  actions=inject(Actions)

  load$=createEffect(()=>this.actions.pipe(
    ofType(UserActions.loadUsers),
    switchMap(()=>this.userService.getAll().pipe(
      map((users)=>UserActions.loadUsersSuccess({res: users})),
      catchError((response)=>of(UserActions.loadUsersFail({error:response.error.error})))
    ))
  ))

  update=createEffect(()=>this.actions.pipe(
    ofType(UserActions.updateUser),
    switchMap(({id,user})=>this.userService.updateUser(id,user).pipe(
      map(user=>UserActions.updateUsersSuccess({res:user})),
      catchError((response)=>of(UserActions.updateUsersFail({error:response.error.error})))
    )),
  ))

  create=createEffect(()=>this.actions.pipe(
    ofType(UserActions.createUser),
    switchMap(({user})=>this.userService.createUser(user).pipe(
      map(user=>UserActions.createUsersSuccess({res:user})),
      catchError((response)=>of(UserActions.createUsersFail({error:response.error.error})))
    )),
  ))
}
