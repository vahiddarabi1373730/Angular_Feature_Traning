import { Observable } from 'rxjs';
import { patchState } from '@ngrx/signals';

export interface SignalStoreFeatureState<T>{
  loading:boolean;
  error:null | string;
  items:T[]
}

export const createInitialState=<T>():SignalStoreFeatureState<T>=>{
  return {
    items:[],
    error:null,
    loading:false,
  }
}

export interface withSignalStoreFeatureArgs<T>{
  loaderWithPromise?:(store:any)=>Promise<T[]>;
  loaderWithObs?:(store:any)=>Observable<T[]>;
}


export function setLoading(store:any){
  patchState(store, { loading: true });
}

export function setSuccess(store:any){
  patchState(store,{loading:false});
}
export function setItems<T>(store:any,items:T[]){
  patchState(store,{items});
}
export function setError(store:any,error:unknown){
  patchState(store,{error:error,loading:false});
  return true
}

export function clearError(store:any){
  patchState(store,{error:null});
}
