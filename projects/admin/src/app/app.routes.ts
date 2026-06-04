import { Routes } from '@angular/router';
import {provideState} from '@ngrx/store';
import {reducer, TODOS_FEATURE_KEY} from './models/todo-models';
import {provideEffects} from '@ngrx/effects';
import {TodosEffect} from './todos-effect';
import {UserEffects} from './ngrx/effect/user-effects';
import {USER_FEATURE_KEY} from './ngrx/key/keys';
import {UserReducer} from './ngrx/reducer/user-reducer';

export const routes: Routes = [
  {
    path: 'todos',
    loadComponent:()=>import("./pages/todos/todos.component").then(c=>c.TodosComponent),
    providers:[
      provideState(TODOS_FEATURE_KEY,reducer),
      provideEffects(TodosEffect)
    ]
  },
  {
    path:"users",
    loadComponent:()=>import("./pages/user/user.component").then(c=>c.UserComponent),
    providers:[
      provideEffects(UserEffects),
      provideState(USER_FEATURE_KEY,UserReducer)
    ]}
];
