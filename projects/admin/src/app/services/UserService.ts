import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User,CreateUser,UpdateUser} from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private http = inject(HttpClient);

  private baseUrl = 'http://localhost:3000/users';

  getAll() {
    return this.http.get<User[]>(this.baseUrl);
  }

  createUser(user:CreateUser) {
    return this.http.post<User>(this.baseUrl ,user);
  }

  updateUser(id:string,user:UpdateUser) {
    return this.http.put<User>(this.baseUrl+"a/"+id ,user);
  }
}
