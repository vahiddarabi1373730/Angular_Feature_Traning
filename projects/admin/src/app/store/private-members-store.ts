// در NgRx Signal Store منظور از Private Store Members این است که بعضی از stateها، متدها یا propertyهای store را طوری تعریف کنی که فقط داخل خود store قابل استفاده باشند و از بیرون (کامپوننت‌ها) قابل دسترسی نباشند.
// روش رایج: private با _


import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { initialState, User } from './models/user-state';
import { inject } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { UserService } from '../services/user-service';

export const privateMembersStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),

  withMethods((store, userService = inject(UserService)) => ({
    async loadUsers(): Promise<void> {
      patchState(store, { loading: true });
      const users = await firstValueFrom(userService.loadUsers());
      patchState(store, { users, loading: false });
    },

    _setUsers: (users: User[]) => {
      patchState(store, { users });
    },
  })),
);
