import type { MutationTree } from 'vuex/types/index.js';
import type { IMerchant } from '@/types/Merchant';
import type { ITransaction } from '@/types/Transaction';

import { MutationTypes } from './mutation-types';
import type { State } from './state';

interface IDates {
    dateFrom: string | null;
    dateTo: string | null;
}

export type Mutations<S = State> = {
    [MutationTypes.SET_MERCHANTS](state: S, merchants: IMerchant[]): void;
    [MutationTypes.SET_TRANSACTIONS](state: S, transactions: ITransaction[]): void;
    [MutationTypes.SET_FILTERS_DATES](state: S, dates: IDates): void;
    [MutationTypes.SET_FILTERS_PAGE](state: S, page: number): void;
    [MutationTypes.SET_FILTERS_MERCHANT](state: S, merchant: string): void;
};
  
export const mutations: MutationTree<State> & Mutations = {
    [MutationTypes.SET_MERCHANTS](state: State, merchants: IMerchant[]) {
        state.merchants = merchants;
    },
    [MutationTypes.SET_TRANSACTIONS](state: State, transactions: ITransaction[]) {
        state.transactions = transactions;
    },
    [MutationTypes.SET_FILTERS_DATES](state: State, dates: IDates) {
        state.filters.dateFrom = dates.dateFrom;
        state.filters.dateTo = dates.dateTo;
    },
    [MutationTypes.SET_FILTERS_PAGE](state: State, page: number) {
        state.filters.page = page;
    },
    [MutationTypes.SET_FILTERS_MERCHANT](state: State, merchant: string) {
        state.filters.merchant = merchant;
    },
};
