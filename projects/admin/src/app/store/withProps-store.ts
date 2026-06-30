// کاربردهای اصلی withProps در NgRx Signal Store:

// 1
// اضافه کردن سرویس‌هایی که Store به آن‌ها نیاز دارد.

// 2
// ایجاد Observable از Signal‌ها
// تبدیل signal به observable برای استفاده در RxJS یا async pipe.

// 3
// قرار دادن توابع کمکی که در withMethods یا withHooks استفاده می‌شوند.


// 4
// Expose کردن Derived Properties غیر reactive
// Derived یعنی از داده‌های دیگر محاسبه شده.
// مانند user$ که از user ,derived شده



// 5
// تعریف مقدارهای ثابت یا Config برای Store


// فقط property هایی که داخل initialState هستند state واقعی محسوب می‌شوند و فقط همان‌ها را می‌توانی با patchState تغییر بدهی.
// user$ داخل withProps ساخته شده، نه داخل state.
// پس patchState اجازه تغییرش را ندارد.
// باید user را در state تغییر بدهی، نه user$.
// و user$ خودش اتوماتیک آپدیت می‌شود چون از user ساخته شده:



import { patchState, signalStore, withMethods, withProps, withState } from '@ngrx/signals';
import { initialState, User } from './models/user-state';
import { inject } from '@angular/core';
import { UserService } from '../services/user-service';
import { firstValueFrom } from 'rxjs';
import { toObservable } from '@angular/core/rxjs-interop';
export const WithPropsStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withProps(({ user }) => ({
    userService: inject(UserService),
    user$: toObservable(user),
  })),

  withMethods(({ userService, ...store }) => ({
    async loadUsers(): Promise<void> {
      patchState(store, { loading: true });
      const users = await firstValueFrom(userService.loadUsers());
      patchState(store, { users, loading: false });
    },

    async loadUser(id: string): Promise<void> {
      patchState(store, { loading: true });
      const user = await firstValueFrom(userService.loadUser(id));
      patchState(store, { loading: false, user });
    },
  })),
);
