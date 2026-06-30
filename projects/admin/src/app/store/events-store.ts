import { patchState, signalStore, type, withState } from '@ngrx/signals';
import { initialState, User, UserState } from './models/user-state';
import { event, eventGroup, Events, on, withEventHandlers, withReducer } from '@ngrx/signals/events';
import { inject } from '@angular/core';
import { UserService } from '../services/user-service';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { mapResponse } from '@ngrx/operators';
import { withDevtools } from '@angular-architects/ngrx-toolkit';

export const UserEvent = eventGroup({
  source: 'User Search',
  events: {
    queryChanged: type<string>(),
    emailQueryChanged: type<string>()
  },
});

export const AddUserEvent=event("Add User",type<Omit<User, "id">>())
export const UserApiEvent = eventGroup({
  source: 'User Api Event',
  events: {
    success: type<User[]>(),
    loadFailure: type<string>(),
  },
});

export const EventsStore = signalStore(
  { providedIn: 'root' },
  withDevtools('counter-store'),
  // 1
  // initialState
  withState<UserState>(initialState),
  withReducer(
    //این ۲ تا قسمت معادل یکدیگرند
    //یعنی syntax یعنی از object ای که وارد reducer میشود که شامل payload و type است , payload بردار و داخل query بریز
    //همان طور که میدانیم کار reducer این است که state را تغییر دهد.پس چیزی که باید return کنیم یه آبجکت از نوع state است که فیلد های لازم را تغیید داده ایم
    on(UserEvent.queryChanged, ({ payload: query }) => ({
      query,
      loading: true,
    })),
    // on(UserEvent.queryChanged,(event)=>{
    //   const query=event.payload;
    //   return {
    //     query:query,
    //     loading:true,
    //   }
    // }),

    on(UserEvent.emailQueryChanged,({payload}) => ({loading:true,query:payload})),


    on(UserApiEvent.success, ({ payload }) => {
      return {
        users: payload,
        loading: false,
      };
    }),
    on(UserApiEvent.loadFailure, ({ payload }) => {
      return {
        error: payload,
        loading: false,
      };
    }),

    on(AddUserEvent,({payload})=>({
      loading: true,
    })),
  ),
  withEventHandlers((store, events = inject(Events), userService = inject(UserService)) => ({
    loadUserByQuery$: events.on(UserEvent.queryChanged).pipe(
      switchMap(() =>
        userService.loadUsersQuery(store.query()).pipe(
          mapResponse({
            next: (users) => UserApiEvent.success(users),
            error: (error: any) =>
              UserApiEvent.loadFailure(error.error.message ?? 'Unknown error occurred.'),
          }),
        ),
      ),
    ),

    loadUserByEmailQuery$: events.on(UserEvent.emailQueryChanged).pipe(
      switchMap(() =>
        userService.loadUsersQueryEmail(store.query()).pipe(
          mapResponse({
            next: (users) => UserApiEvent.success(users),
            error: (error: any) =>
              UserApiEvent.loadFailure(error.error.message ?? 'Unknown error occurred.'),
          }),
        ),
      ),
    ),

    loadedUsers$: events.on(UserApiEvent.success).pipe(
      tap(({payload})=>{
        console.log(payload);
      }),
      mapResponse({
        next: ({ payload }) => patchState(store, { users: payload }),
        error: () => {},
      }),
    ),
    loadUsersFail: events.on(UserApiEvent.loadFailure).pipe(
      mapResponse({
        next: ({ payload }) => patchState(store, { error: payload }),
        error: () => {},
      }),
    ),

    AddUser$:events.on(AddUserEvent).pipe(
      switchMap(({payload})=>userService.add(payload).pipe(
        map((user)=>UserApiEvent.success([...store.users(),user])),
        catchError((error:any)=>{
          UserApiEvent.loadFailure(error.error.message ?? 'Unknown error occurred.');
          return of(error)
        })
      ))
    )
  })),
);
