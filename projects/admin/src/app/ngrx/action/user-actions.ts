import {createActionGroup, emptyProps, props} from '@ngrx/store';
import {USER_FEATURE_KEY} from '../key/keys';
import {User} from '../../models/user';
import {SuccessProps} from '../props/success';
import {FailProps} from '../props/fail';
import {CreateUserProps, UpdateUserProps} from '../props/user/user-props';

export const UserActions=createActionGroup({
  source:USER_FEATURE_KEY,
  events:{
    "Load Users":emptyProps(),
    "Load Users Success":props<SuccessProps<User[]>>(),
    "Load Users Fail":props<FailProps>(),

    "Update User":props<UpdateUserProps>(),
    "Update Users Success":props<SuccessProps<User>>(),
    "Update Users Fail":props<FailProps>(),

    "Create User":props<CreateUserProps>(),
    "Create Users Success":props<SuccessProps<User>>(),
    "Create Users Fail":props<FailProps>(),
  }
})


