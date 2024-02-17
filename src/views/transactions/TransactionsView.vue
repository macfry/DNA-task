<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue';
import { useStore } from '@/store';
import { ActionTypes } from '@/store/action-types';
import { MutationTypes } from '@/store/mutation-types';
import type { IMerchant } from '@/types/Merchant';
import type { ITransaction } from '@/types/Transaction';
import VueDatePicker, { type ModelValue } from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';
import CurrencyBox from '@/components/CurrencyBox.vue';
import NumberBox from '@/components/NumberBox.vue';
import TransactionTable from '@/components/table/TransactionTable.vue';
import Loader from '@/components/Loader.vue';

const store = useStore();

const loading = ref<boolean>(false);
const error = ref<null | string>(null);
const dates = ref<ModelValue>();
const selectedMerchant = ref<string>('');
const merchants = ref<IMerchant[]>([]);
const transactions = ref<ITransaction[]>([]);
const revenue = computed<number>(() => +transactions.value.reduce((sum, current) => sum + current.amount, 0).toFixed(2) || 0);
const controller = new AbortController();

watch([dates, selectedMerchant], ([newDates, newMerchant], [oldDates, oldMerchant]) => {
    const startDate = Array.isArray(newDates) && newDates[0] ? new Date(newDates[0] as string).getTime() : Number.NEGATIVE_INFINITY;
    const endDate = Array.isArray(newDates) && newDates[1] ? new Date(newDates[1] as string).getTime() : Number.POSITIVE_INFINITY;
    
    transactions.value = [...store.getters.transactions].filter(({ date, merchantId }) => {
        const currentDate = new Date(date).getTime();
        return (currentDate >= startDate && currentDate <= endDate) && (newMerchant ? merchantId === newMerchant : true);
    });

    // commits changes
    if (newMerchant !== oldMerchant) {
        store.commit(MutationTypes.SET_FILTERS_MERCHANT, newMerchant);
    }

    if (newDates !== oldDates) {
        store.commit(MutationTypes.SET_FILTERS_DATES, {
            dateFrom: Array.isArray(newDates) && newDates ? newDates[0] as string : null,
            dateTo: Array.isArray(newDates) && newDates ? newDates[1] as string : null,
        });
    }
});

onMounted(async () => {
    try {
        if (!store.getters.merchants.length || !store.getters.transactions.length) {
            loading.value = true;
            error.value = null;
        }

        if (!store.getters.merchants.length) {
            await store.dispatch(ActionTypes.GET_MERCHANTS, { signal: controller.signal });
        }

        if (!store.getters.transactions.length) {
            await store.dispatch(ActionTypes.GET_TRANSACTIONS, { signal: controller.signal })
        }
    } catch (err: unknown) {
        const errData = err as Error;
        error.value = errData.message;
    } finally {
        loading.value = false;
    }

    merchants.value = store.getters.merchants ?? [];
    transactions.value = store.getters.transactions ?? [];

    const { merchant, dateFrom, dateTo } = store.getters.filters;
    if (dateFrom || dateTo) {
        dates.value = [dateFrom ?? null, dateTo ?? null] as ModelValue;
    }
    selectedMerchant.value = merchant ?? '';
});

onBeforeUnmount(() => {
    controller.abort();
});
</script>

<template>
    <main>
        <Loader v-show="loading" />

        <p v-show="error" class="danger">{{ error }}</p>

        <div class="filter">
            <div class="filter-box">
                <VueDatePicker v-model="(dates as ModelValue)" range utc placeholder="Select dates"></VueDatePicker>
            </div>

            <div class="filter-box">
                <select v-model="selectedMerchant" class="select-merchant">
                    <option :value="''" class="merchant-default-option">Please select merchant</option>
                    <option v-for="merchant in merchants" :value="merchant.id" :key="merchant.id">
                        {{ merchant.name }}
                    </option>
                </select>
            </div>
        </div>

        <div class="boxes">
            <CurrencyBox :value="revenue" :currency-sign="'$'" label="Revenue" />
            <NumberBox :value="transactions.length" label="Transactions" />
        </div>

        <div class="transactions-view">
            <TransactionTable :transactions="transactions" />
        </div>
    </main>
</template>

<style lang="scss" scoped>
.filter, .boxes {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 2rem;
    margin-bottom: 1rem;

    @media screen and (max-width: 519px) {
        grid-template-columns: repeat(1, 1fr);
        gap: 1rem;
    }
}

.select-merchant {
    width: 100%;
    height: 38px;
    border-radius: 5px;
    padding: 6px 16px;
    font-size: 16px;
    border-color: #ddd;
}

.merchant-default-option {
    color: #ddd;
}

main {
    display: flex;
    padding: 4rem 2rem;
    flex-wrap: wrap;
}

.transactions-view {
    width: 100%;
    margin: 0;
    margin-top: 2rem;
}
</style>