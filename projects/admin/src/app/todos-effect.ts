import {inject, Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {TodoService} from './todo.service';
import {Todo, TodoActions} from './models/todo-models';
import {catchError, map, of, switchMap, tap} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TodosEffect {
  actions$=inject(Actions);
  todoService=inject(TodoService);

  loadTodos$=createEffect(()=>this.actions$.pipe(
    ofType(TodoActions.loadTodos),
    switchMap(()=>this.todoService.getAll().pipe(
      tap((todos)=>console.log(todos)),
      map((todos)=>TodoActions.loadTodosSuccess({todos})),
      catchError((error)=>of(TodoActions.loadTodosFaild({error})))
    ))
  ))


  createTodo$=createEffect(()=>this.actions$.pipe(
    ofType(TodoActions.createTodo),
    switchMap(({dto})=>this.todoService.createTodo(dto).pipe(
      map((todo)=>TodoActions.createTodoSuccess({todo})),
      catchError((error)=>of(TodoActions.createTodoFaild({error:error.error.error}))),
    ))
  ))

  updateTodo$=createEffect(()=>this.actions$.pipe(
    ofType(TodoActions.updateTodo),
    switchMap(({id,dto})=>this.todoService.updateTodo(id,dto).pipe(
      map(todo=>TodoActions.updateTodoSuccess({todo:(todo as Todo)})),
      catchError((response:any)=>of(TodoActions.updateTodoFaild({error:response.error.error }))),
      )
    )
  ))

}
