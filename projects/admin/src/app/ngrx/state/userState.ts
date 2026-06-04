import {User} from '../../models/user';

export interface UserState {
  users: User[];
  loading:boolean,
  error:string | null
}
