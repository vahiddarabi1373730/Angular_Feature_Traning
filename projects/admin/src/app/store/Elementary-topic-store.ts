import { patchState, signalStore, withComputed, withHooks, withMethods, withState } from '@ngrx/signals';
import { initialState } from './models/user-state';
import { computed, inject } from '@angular/core';
import { UserService } from '../services/user-service';
import { debounceTime, firstValueFrom, pipe, switchMap, tap } from 'rxjs';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { withDevtools } from '@angular-architects/ngrx-toolkit';


export const ElementaryTopicStore=signalStore(
  {providedIn:"root"},


  //5
  //withDevtools
  withDevtools('counter-store'),
  // 1
  // initialState
  withState(initialState),


  // 2
  // computed
  withComputed(store=>({
    isAdminUser:computed(()=>store.users().find(u=>u.isAdmin))
  })),



  // 3
  // withMethod
  withMethods((store,userService=inject(UserService))=>({
    async loadUsers(){
      patchState(store,{loading:true});
      const users=await firstValueFrom(userService.loadUsers())
      patchState(store,{loading:false,users});
    },

     LoadUsersRxjx:rxMethod<void>(
       pipe(
         debounceTime(500),
         tap(()=>patchState(store,{loading:true})),
         switchMap(()=>userService.loadUsersQueryEmail(store.query())),
         tap((users)=>patchState(store,{loading:false,users})),
       )
     )
  })),

  // 4
  // withHook
  withHooks({
      onInit(store){
        store.loadUsers()
      }
  }),
)
