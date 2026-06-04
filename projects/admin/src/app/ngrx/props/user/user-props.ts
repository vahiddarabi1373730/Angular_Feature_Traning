import {CreateUser, UpdateUser} from '../../../models/user';

export interface UpdateUserProps {
  id: string,
  user:UpdateUser
}

export interface CreateUserProps {
  user:CreateUser
}
