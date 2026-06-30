import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../store/models/user-state';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {
  }

  loadUsers(){
    return this.http.get<User[]>('http://localhost:3000/users')
  }

  loadUsersQuery(query:string){
    return  !query ?  this.http.get<User[]>("http://localhost:3000/users"):this.http.get<User[]>("http://localhost:3000/users",{
      params:{
        "firstName:contains":query
      }
    })
    // return this.http.get<User[]>(`http://localhost:3000/users?firstName:contains=${query}`)
  }

  loadUsersQueryEmail(email:string){
    return  !email ?  this.http.get<User[]>("http://localhost:3000/users"):this.http.get<User[]>("http://localhost:3000/users",{
      params:{
        "email:contains":email
      }
    })
    // return this.http.get<User[]>(`http://localhost:3000/users?firstName:contains=${query}`)
  }

  loadUser(id:string){
    return this.http.get<User>(`http://localhost:3000/users/${id}`)
  }

  add(user:Omit<User, "id">){
    return this.http.post<User>(`http://localhost:3000/users`,user)
  }

  edit(id:string,updatedUser:Omit<User, "id">){
    return this.http.put<User>(`http://localhost:3000/users/${id}`,updatedUser)
  }

  delete(id:string){
    return this.http.delete<User>(`http://localhost:3000/users/${id}`)
  }
}
