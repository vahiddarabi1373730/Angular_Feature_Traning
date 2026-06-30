// 1
// withLinkedState برای ساختن یک state که مقدارش به stateهای دیگر وابسته است ولی هنوز قابل تغییر است استفاده می‌شود.
// مقدار اولیه‌اش از stateهای دیگر محاسبه می‌شود
// اما بعداً می‌توانی با patchState مستقیم تغییرش بدهی


// 2
// ولی فرق مهم با computed
// در computed نمی‌توانی مقدار را تغییر بدهی.
// اما در withLinkedState می‌توانی


import { patchState, signalStore, withLinkedState, withMethods, withState } from '@ngrx/signals';
import { initialState, User } from './models/user-state';

export const WithLinkedStateStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withLinkedState(({users})=>({
    selectedUser:()=>users()[0] ??null
  })),

  withMethods((store)=>({
    setUsers:(users:User[]):void=>{
      patchState(store,{users})
    },

    setSelectedUser:(selectedUser:User):void=>{
      patchState(store,{selectedUser})
    }
  }))
);
