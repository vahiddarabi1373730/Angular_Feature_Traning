export interface User{
  id:string;
  name: string;
  firstName: string;
  mobile: string;
  isAdmin:boolean
}

export type CreateUser=Omit<User,"id">;
export type UpdateUser=Partial<Omit<User,"id">>;
