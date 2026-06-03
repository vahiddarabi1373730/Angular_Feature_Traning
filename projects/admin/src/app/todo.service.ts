import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {CreateTodo, Todo, UpdateTodo} from './models/todo-models';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private http = inject(HttpClient);

  private baseUrl = 'http://localhost:3000/todos';

  getAll() {
    return this.http.get<Todo[]>(this.baseUrl);
  }

  createTodo(todo:CreateTodo) {
    return this.http.post<Todo>(this.baseUrl+"df" ,todo);
  }

  updateTodo(id:number,todo:UpdateTodo) {
    return this.http.put<Todo>(this.baseUrl+"/d"+id ,todo);
  }
}
