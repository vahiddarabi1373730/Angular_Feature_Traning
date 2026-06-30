export interface User{
  id: string;
  email: string;
  firstName: string;
  isAdmin?: boolean;
}
export interface UserState{
  users: User[];
  user: User | null;
  loading: boolean;
  error: null | string;
  query:string;
}

export const initialState:UserState={
  error:null,
  users:[],
  user:null,
  loading:false,
  query:""
}
