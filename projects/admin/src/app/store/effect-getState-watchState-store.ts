// 1
// ترکیب effect + getState معمولاً برای این استفاده می‌شود که هر تغییری در state رخ داد، یک کار جانبی (side effect) انجام شود.
// چون getState(store) کل state را می‌خواند، پس effect به همه state های store وابسته می‌شود و با هر تغییر دوباره اجرا می‌شود.
// 2
// effect فقط وقتی دوباره اجرا می‌شود که signalهایی که داخلش خوانده شده‌اند تغییر کنند.
// مثلا
// effect(() => {
//   console.log(store.count());
// });
// پس effect فقط وقتی اجرا می‌شود که:count تغییر کند
// اما در این کد
// effect(() => {
//   const state = getState(store);
// });
// getState(store) کل state را می‌خواند. یعنی:
// پس dependency می‌شود:همه state های store
//در نتیجه:
//هر تغییری در effect → state اجرا می‌شود
//خلاصه
// effect با هر تغییر state اجرا نمی‌شود
// فقط با تغییر signalهایی که داخل effect خوانده شده‌اند



// 3 : watchState
// watchState یک utility در NgRx Signal Store است که برای مشاهده (watch) تغییرات state استفاده می‌شود، بدون اینکه لازم باشد effect و dependencyها را دستی مدیریت کنی.
// هر وقت state store تغییر کند، watchState مقدار جدید state را به تو می‌دهد.
// مستقیم تغییر state store را گوش می‌دهد
// dependency tracking لازم ندارد
// مخصوص Signal Store است
// watchState وقتی صدا زده می‌شود، یک object برمی‌گرداند که متد destroy() دارد
// این متد برای متوقف کردن watch استفاده می‌شود.






  import { getState, patchState, signalStore, watchState, withHooks, withMethods, withState } from '@ngrx/signals';
import {initialState, User} from './models/user-state';
import { effect, inject } from '@angular/core';
import {firstValueFrom} from 'rxjs';
import {UserService} from '../services/user-service';

export const effectGetStateWatchStateStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),

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

  withHooks({
    onInit(store){

      const {destroy}=watchState(store,(state)=>{
        console.log(state,'watchState');
      })

      setTimeout(()=>destroy(),5000)

      effect(() => {
        const state=getState(store)
        console.log(state);
      });
    }
  })
);
