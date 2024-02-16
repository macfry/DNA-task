import { getRequest } from "@/services/services";
import type { ActionContext, ActionTree } from "vuex/types/index.js";
import type { IMerchant } from "@/types/Merchant";
import type { ITransaction } from "@/types/Transaction";

import type { Mutations } from "./mutations";
import type { State } from "./state";
import { ActionTypes } from "./action-types";
import { MutationTypes } from "./mutation-types";

interface IGetPayload {
    signal: AbortSignal;
}

type AugmentedActionContext = {
    commit<K extends keyof Mutations>(
        key: K,
        payload?: Parameters<Mutations[K]>[1],
    ): ReturnType<Mutations[K]>;
} & Omit<ActionContext<State, State>, 'commit'>;
  
export interface Actions {
    [ActionTypes.GET_MERCHANTS](
        { commit, state }: AugmentedActionContext,
        payload: IGetPayload,
    ): Promise<void>;
    [ActionTypes.GET_TRANSACTIONS](
        { commit, state }: AugmentedActionContext,
        payload: IGetPayload,
    ): Promise<void>;
}

export const actions: ActionTree<State, State> & Actions = {
    async [ActionTypes.GET_MERCHANTS]({ commit, state }, payload) {
        try {
            const response = await getRequest<IMerchant[]>('http://localhost:8000/merchants', payload.signal);
            commit(MutationTypes.SET_MERCHANTS, response);
        } catch (err) {
            const error = err as Error;
            throw new Error(`Download merchants error: ${error.message}`);
        }
    },
    async [ActionTypes.GET_TRANSACTIONS]({ commit, state }, payload) {
        try {
            const response = await getRequest<ITransaction[]>('http://localhost:8000/transactions', payload.signal);
            commit(MutationTypes.SET_TRANSACTIONS, response);
        } catch (err) {
            const error = err as Error;
            throw new Error(`Download merchants error: ${error.message}`);
        }
    },
}