import type { MutationTree } from 'vuex/types/index.js';
import type { IMerchant } from '@/types/Merchant';
import type { ITransaction } from '@/types/Transaction';

import { type IFilters, type State } from './state';
import { MutationTypes } from './mutation-types';

export type Mutations<S = State> = {
    [MutationTypes.SET_MERCHANTS](state: S, merchants: IMerchant[]): void;
    [MutationTypes.SET_TRANSACTIONS](state: S, transactions: ITransaction[]): void;
    [MutationTypes.SET_FILTERS](state: S, filters: IFilters): void;
};
  
export const mutations: MutationTree<State> & Mutations = {
    [MutationTypes.SET_MERCHANTS](state: State, merchants: IMerchant[]) {
        state.merchants = merchants;
    },
    [MutationTypes.SET_TRANSACTIONS](state: State, transactions: ITransaction[]) {
        state.transactions = transactions;
    },
    [MutationTypes.SET_FILTERS](state: State, filters: IFilters) {
        state.filters = filters;
    },
};
