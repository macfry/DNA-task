import type { GetterTree } from 'vuex/types/index.js';
import type { ITransaction } from '@/types/Transaction';
import type { IMerchant } from '@/types/Merchant';
import { type IFilters, type State } from './state';

export type Getters = {
    merchants(sate: State): IMerchant[];
    transactions(state: State): ITransaction[];
    filters(state: State): IFilters;
};

export const getters: GetterTree<State, State> & Getters = {
    merchants: (state) => state.merchants,
    transactions: (state) => state.transactions,
    filters: (state) => state.filters,
};