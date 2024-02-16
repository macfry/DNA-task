import type { IMerchant } from "@/types/Merchant";
import type { ITransaction } from "@/types/Transaction";

export interface IFilters {
    dateFrom: string | null;
    dateTo: string | null;
    merchant: string | null;  
}

export type State = {
    merchants: IMerchant[];
    transactions: ITransaction[];
    filters: IFilters;
};

export const defaultState: State = {
    merchants: [],
    transactions: [],
    filters: {
        dateFrom: null,
        dateTo: null,
        merchant: null,
    },
};
  
export const state: State = JSON.parse(JSON.stringify(defaultState));