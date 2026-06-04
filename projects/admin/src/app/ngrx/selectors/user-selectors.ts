import {createFeatureSelector, createSelector} from '@ngrx/store';
import {USER_FEATURE_KEY} from '../key/keys';
import {TodoState} from '../../models/todo-models';
import {UserState} from '../state/userState';

export const UserFeatureSelectors = createFeatureSelector<UserState>(USER_FEATURE_KEY)
export const UserItemsSelector=createSelector(UserFeatureSelectors,(state)=>state.users)
export const UserLoadingSelector=createSelector(UserFeatureSelectors,(state)=>state.loading)
export const UserErrorSelector=createSelector(UserFeatureSelectors,(state)=>state.error)
