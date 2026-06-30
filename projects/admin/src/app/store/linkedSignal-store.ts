// 1
// linkedSignal یک API از Angular Signals است که برای ساختن یک signal وابسته به یک signal دیگر استفاده می‌شود، ولی با یک قابلیت مهم:
// وقتی source تغییر کند، مقدار جدید بر اساس مقدار قبلی هم می‌تواند محاسبه شود.
// یعنی می‌توانی state قبلی را نگه داری و تصمیم بگیری مقدار جدید چه باشد.

// 2
// فرض کن لیستی از گزینه‌ها داری
// حالا options عوض می‌شود:
// می‌خواهی اگر گزینه قبلی هنوز وجود داشت، همان را نگه داری.
// هر بار options تغییر کند:
// یعنی انتخاب کاربر از بین می‌رود.

import { patchState, signalStore, withLinkedState, withMethods, withState } from '@ngrx/signals';
import { initialState, User } from './models/user-state';
import { inject, linkedSignal } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { UserService } from '../services/user-service';

export const linkedSignalStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withLinkedState(({ users }) => ({
    selectedUser: linkedSignal<User[], User>({
      source: users,
      computation: (newUsers, previous) => {
        let user ;
        if (previous?.value){
           user=newUsers.find((u) => u.id === previous.value.id);
        }
        return user ?? newUsers[0];
      },
    }),
  })),

  withMethods((store, userService = inject(UserService)) => ({
    async loadUsers(): Promise<void> {
      patchState(store, { loading: true });
      const users = await firstValueFrom(userService.loadUsers());
      patchState(store, { users, loading: false });
    },

    setUsers: (users: User[]) => {
      patchState(store, { users });
    },
  })),
);
