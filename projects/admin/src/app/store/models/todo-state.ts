export interface Todo{
  id: string;
  completed: boolean;
  title: string;
}
export interface TodoState{
  todos: Todo[];
  loading: boolean;
  error: null | string;
}

export const initialState:TodoState={
  error:null,
  todos:[],
  loading:false
}
