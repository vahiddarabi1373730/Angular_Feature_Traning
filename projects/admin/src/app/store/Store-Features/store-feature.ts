// ساختن قسمت‌هایی از store که بین چند store قابل share / reuse باشند.
// یعنی اگر چند store رفتار یا state مشترک داشته باشند، آن را در یک feature می‌نویسی و بعد در storeهای مختلف استفاده می‌کنی.


// این خطا طبیعی است و دلیلش این است که داخل withComputed فقط اجازه داری Signal برگردانی


import { signalStoreFeature, withComputed, withMethods, withProps, withState } from '@ngrx/signals';
import {
  clearError,
  createInitialState,
  setError,
  setItems,
  setLoading,
  setSuccess,
  SignalStoreFeatureState,
  withSignalStoreFeatureArgs
} from '../models/signal-store-feature';
import { computed } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { catchError, of, pipe, switchMap, tap } from 'rxjs';

export function withStoreFeature<T>(args:withSignalStoreFeatureArgs<T>){
  return signalStoreFeature(
    withState<SignalStoreFeatureState<T>>(createInitialState<T>()),
    withComputed(({loading,error,items})=>({
      hasError:computed(()=>error() !==null),
      isLoading:computed(()=>loading()),
      count:computed(()=>items().length),

    })),

    withProps(({items})=>({
      items$:toObservable(items)
    })),

    withMethods((store)=>({



      async loadDataPromise():Promise<void>{
        setLoading(store);

        try {
          const items=await args.loaderWithPromise!(store);
          setItems(store,items)
          setSuccess(store);
        }catch (error){
          setError(store,error)
        }
      },


      loadDataObs:rxMethod<void>(
        pipe(
          tap(()=>setLoading(store)),
          switchMap(()=>args.loaderWithObs!(store)),
          tap((items)=>setItems(store,items)),
          tap(()=>setSuccess(store)),
          catchError((error)=>{
            setError(store,error)
            return of([])
          })
        )
      ),

      setItems(items:T[]){
        setItems(store,items)
      },

      setLoading(){
        setLoading(store)
      },

      setSuccess(){
        setSuccess(store)
      },

      setError(error:unknown){
        setError(store,error)
      },

      clearError(){
        clearError(store)
      }
    }))
  )
}
