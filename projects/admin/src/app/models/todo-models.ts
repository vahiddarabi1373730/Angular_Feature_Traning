import {
  createActionGroup,
  createFeatureSelector,
  createReducer,
  createSelector,
  emptyProps,
  on,
  props
} from '@ngrx/store';

export interface Todo
{
  id: number;
  title: string;
  completed: boolean;
}


export type CreateTodo=Omit<Todo, "id">
export type UpdateTodo = Partial<Omit<Todo, "id">>


export const TodoActions=createActionGroup({
  source:"Todos",
  events:{
    "Load Todos":emptyProps(),
    "Load Todos Success":props<{todos:Todo[]}>(),
    "Load Todos Faild":props<{error:string}>(),


    "Create Todo":props<{dto:CreateTodo}>(),
    "Create Todo Success":props<{todo:Todo}>(),
    "Create Todo Faild":props<{error:string}>(),

    "Update Todo":props<{id:any,dto:UpdateTodo}>(),
    "Update Todo Success":props<{todo:Todo}>(),
    "Update Todo Faild":props<{error:string}>()
  }
})


export interface TodoState{
  items:Todo[],
  loading: boolean,
  error:string | null,
}

export const InitialState:TodoState = {
  error:null,
  loading:false,
  items:[]
}


export const reducer=createReducer(
  InitialState,
  on(TodoActions.loadTodos,(s):TodoState=>({...s,loading:true,error:null})),
  on(TodoActions.loadTodosSuccess,(state, {todos}):TodoState=>({...state,loading:false,items:todos})),
  on(TodoActions.loadTodosFaild,(state,{error}):TodoState=>({...state,loading:false,error})),


  on(TodoActions.createTodo,(state):TodoState=>({...state,loading:true})),
  on(TodoActions.createTodoSuccess,(state,{todo}):TodoState=>({...state,loading:false,items:[todo,...state.items]})),
  on(TodoActions.createTodoFaild,(state,{error}):TodoState=>({...state,loading:false,error})),


  on(TodoActions.updateTodo,(s):TodoState=>({...s,loading:true,error:null})),
  on(TodoActions.updateTodoSuccess,(s,{todo}):TodoState=>
  {
    console.log(s)
    return  ({...s,loading:false,items:s.items.map(item=>item.id===todo.id ? todo :item)})
  }),
  on(TodoActions.updateTodoFaild,(state,{error}):TodoState=>({...state,loading:false,error}))


)




////////////////////////////selectors
export const TODOS_FEATURE_KEY="todos";
export const selectTodoState=createFeatureSelector<TodoState>(TODOS_FEATURE_KEY)
export const selectItemsState=createSelector(selectTodoState,(s)=>s.items);
export const selectLoadingState=createSelector(selectTodoState,(s)=>s.loading);
export const selectErrorState=createSelector(selectTodoState,(s)=>s.error);




