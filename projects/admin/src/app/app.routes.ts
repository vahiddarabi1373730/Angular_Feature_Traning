import { Routes } from '@angular/router';
import {provideState} from '@ngrx/store';
import {reducer, TODOS_FEATURE_KEY} from './models/todo-models';
import {provideEffects} from '@ngrx/effects';
import {TodosEffect} from './todos-effect';

export const routes: Routes = [
  {
    path: 'todos',
    loadComponent:()=>import("./todos/todos.component").then(c=>c.TodosComponent),
    providers:[
      provideState(TODOS_FEATURE_KEY,reducer),
      provideEffects(TodosEffect)
    ]
  }
];
