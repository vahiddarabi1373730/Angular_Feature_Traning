// 1
// وقتی از withEntities<User>() استفاده می‌کنی، سیگنال‌هایی که ساخته می‌شوند این‌ها هستند:
// entities()
// ids()
// entityMap()
// اگر collection name نداده باشی، متدی به اسم users() ساخته نمی‌شود.
// پس این خط اشتباه است:
// console.log(store.users());
// درست:
// console.log(store.entities());



import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import {
  addEntity,
  prependEntity, removeAllEntities, removeEntities,
  removeEntity,
  setEntities, setEntity,
  updateEntity,
  withEntities
} from '@ngrx/signals/entities';
import { initialState, User } from './models/user-state';
import { inject } from '@angular/core';
import { UserService } from '../services/user-service';
import { firstValueFrom } from 'rxjs';

export const WithEntityStore=signalStore(
  {providedIn:"root"},
  withEntities<User>(),
  withState(initialState),


  withMethods((store,userService=inject(UserService))=>({

    async loadUsers() {
      patchState(store,{loading:true});
      const users=await firstValueFrom(userService.loadUsers())
      patchState(store, setEntities(users),{loading:false});

    },

    async loadUser(id:string){
      patchState(store,{loading:true});
      const user=await firstValueFrom(userService.loadUser(id))
      patchState(store,setEntity(user),{loading:false});
    },

   async addUser(){
      const user:Omit<User, 'id'>={email:"test",firstName:"maryam"}
      patchState(store,{loading:true});
      const userAdded=await firstValueFrom(userService.add(user))
      patchState(store,addEntity(userAdded),{loading:false});
    },

    async prependAddUser(){
      const user:Omit<User, 'id'>={email:"prependEntity",firstName:"prependEntity"}
      patchState(store,{loading:true});
      const userAdded=await firstValueFrom(userService.add(user))
      patchState(store,prependEntity(userAdded),{loading:false});
    },

    async updateUser(){
      const id="UDQfMfh8v98"
      const user:Omit<User, "id">={email:"test maryam",firstName:"test maryam"}
      patchState(store,{loading:true});
      await firstValueFrom(userService.edit(id,user))
      patchState(store,updateEntity({id,changes:user}),{loading:false});
    },

    async removeAllUser(){
      patchState(store,removeAllEntities())
    },

    async removeAllUserWithIds(ids:string[]){
      patchState(store,removeEntities(ids));
    },

    async deleteUser(){
      const id="UDQfMfh8v98"
      patchState(store,{loading:true});
      await firstValueFrom(userService.delete(id))
      patchState(store,removeEntity(id),{loading:false});
    }
  }))

)
