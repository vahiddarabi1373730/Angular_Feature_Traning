import {Component, inject, OnInit} from '@angular/core';
import {
  CreateTodo,
  selectErrorState,
  selectItemsState,
  selectLoadingState,
  selectTodoState,
  Todo,
  TodoActions
} from '../models/todo-models';
import {Store} from '@ngrx/store';
import {AsyncPipe} from '@angular/common';

@Component({
  selector: 'app-todos',
  imports: [
    AsyncPipe,
  ],
  templateUrl: './todos.component.html',
  styleUrl: './todos.component.scss',
})
export class TodosComponent implements OnInit {
  store = inject(Store)
  items$=this.store.select(selectItemsState);
  loading$=this.store.select(selectLoadingState);
  error$=this.store.select(selectErrorState);

  ngOnInit() {
    console.log(this.store)
    this.store.dispatch(TodoActions.loadTodos())
  }

  addTodo(){
    const todo:CreateTodo={
      title:"test23333",
      completed:false,
    }
    this.store.dispatch(TodoActions.createTodo({dto:todo}))
  }

  updateTodo(){
    const todo:CreateTodo={
      title:"test vahid",
      completed:false,
    }
    this.store.dispatch(TodoActions.updateTodo({id:"1",dto:todo}))
  }
}
