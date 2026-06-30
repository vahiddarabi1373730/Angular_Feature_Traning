import { signalStore, withHooks, withProps } from '@ngrx/signals';
import { withStoreFeature } from './store-feature';
import { User } from '../models/user-state';
import { inject } from '@angular/core';
import { UserService } from '../../services/user-service';

export const userExtendStoreFeature = signalStore(
  { providedIn: 'root' },
  withProps(()=>({
    userService: inject(UserService),
  })),
  withStoreFeature<User>({loaderWithObs:(store)=>store.userService.loadUsers()}),


  withHooks({
    onInit(store){
      store.loadDataObs()
    }
  })

);
