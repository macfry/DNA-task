import { createStore } from 'vuex';
import type { CommitOptions, DispatchOptions, Store as VuexStore } from 'vuex/types/index.js';
import { type State, state } from './state';
import { type Getters, getters } from './getters';
import { type Mutations, mutations } from './mutations';
import { type Actions, actions } from './actions';

export const store = createStore({
    state,
    getters,
    mutations,
    actions,
});
  
export type Store = Omit<
    VuexStore<State>,
    'getters' | 'commit' | 'dispatch'
> & {
    commit<K extends keyof Mutations, P extends Parameters<Mutations[K]>[1]>(
        key: K,
        payload: P,
        options?: CommitOptions,
    ): ReturnType<Mutations[K]>;
} & {
    dispatch<K extends keyof Actions>(
        key: K,
        payload: Parameters<Actions[K]>[1],
        options?: DispatchOptions,
    ): ReturnType<Actions[K]>;
} & {
    getters: {
        [K in keyof Getters]: ReturnType<Getters[K]>;
    };
};
  
export const useStore = (): Store => store as Store;
