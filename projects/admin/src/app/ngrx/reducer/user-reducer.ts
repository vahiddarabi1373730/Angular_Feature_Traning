import {createReducer, on} from '@ngrx/store';
import {UserInitialState} from '../Initial/UserInitialState';
import {UserActions} from '../action/user-actions';
import {UserState} from '../state/userState';

export const UserReducer=createReducer(
  UserInitialState,
  on(UserActions.loadUsers,((s):UserState=>({...s,loading:true,error:null}))),
  on(UserActions.loadUsersSuccess,((state,{res}):UserState=>({...state,loading:false,users:res}))),
  on(UserActions.loadUsersFail,((state,{error}):UserState=>({...state,loading:false,error}))),
  on(UserActions.createUser,((state):UserState=>({...state,loading:false,error:null}))),
  on(UserActions.createUsersSuccess,((state,{res}):UserState=>({...state,loading:false,users:[...state.users,res]}))),
  on(UserActions.createUsersFail,(state,{error}):UserState=>({...state,loading:false,error})),
  on(UserActions.updateUser,(state):UserState=>({...state,loading:true,error:null})),
  on(UserActions.updateUsersSuccess,(state,{res}):UserState=>({...state,loading:false,users:state.users.map(u=>u.id===res.id ? res :u)})),
  on(UserActions.updateUsersFail,(state,{error})=>({...state,loading:false,error:error})),
  )
