<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue';
import { useStore } from '@/store';
import type { IMerchant } from '@/types/Merchant';
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';
import CurrencyBox from '@/components/CurrencyBox.vue';
import NumberBox from '@/components/NumberBox.vue';
import { ActionTypes } from '@/store/action-types';
import { MutationTypes } from '@/store/mutation-types';

const store = useStore();

const dates = ref<undefined | (string | null)[]>();
const selectedMerchant = ref<string>('');
const merchants = ref<IMerchant[]>([]);
const transactions = computed(() => {
    let transactions = store.getters.transactions;

    if (selectedMerchant.value) {
        transactions = transactions.filter(({ merchantId }) => merchantId === selectedMerchant.value);
    }

    if (dates.value) {
        const startDate = dates.value[0] ? new Date(dates.value[0]).getTime() : Number.NEGATIVE_INFINITY;
        const endDate = dates.value[1] ? new Date(dates.value[1]).getTime() : Number.POSITIVE_INFINITY;
        
        transactions = transactions.filter(({ date }) => {
            const currentDate = new Date(date).getTime();
            return currentDate >= startDate && currentDate <= endDate;
        });
    }

    store.commit(MutationTypes.SET_FILTERS, {
        merchant: selectedMerchant.value ?? null,
        dateFrom: dates.value ? dates.value[0] : null,
        dateTo: dates.value ? dates.value[1] : null,
    });

    return transactions;
});

const revenue = computed<number>(() => +transactions.value.reduce((sum, current) => sum + current.amount, 0).toFixed(2) || 0);
const controller = new AbortController();

onMounted(async () => {
    if (!store.getters.merchants.length) {
        await store.dispatch(ActionTypes.GET_MERCHANTS, { signal: controller.signal });
    }

    if (!store.getters.transactions.length) {
        await store.dispatch(ActionTypes.GET_TRANSACTIONS, { signal: controller.signal })
    }

    merchants.value = store.getters.merchants ?? [];
    const { merchant, dateFrom, dateTo } = store.getters.filters;
    if (dateFrom || dateTo) {
        dates.value = [dateFrom ?? null, dateTo ?? null];
    }
    selectedMerchant.value = merchant ?? '';
});

onBeforeUnmount(() => {
  controller.abort();
});
</script>

<template>
    <div class="filter">
        <div class="filter-box">
            <VueDatePicker v-model="dates" range utc></VueDatePicker>
        </div>

        <div class="filter-box">
            <select v-model="selectedMerchant" class="select-merchant">
                <option disabled :value="''">Please select merchant</option>
                <option v-for="merchant in merchants" :value="merchant.id" :key="merchant.id">
                    {{ merchant.name }}
                </option>
            </select>
        </div>
    </div>

    <main>
        <CurrencyBox :value="revenue" :currency-sign="'$'" label="Revenue" />
        <NumberBox :value="transactions.length" label="Transactions" />
    </main>
</template>

<style lang="scss" scoped>
.filter {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 2rem;
    margin-bottom: 1rem;
    margin-top: 1rem;
}

.select-merchant {
    width: 100%;
    height: 38px;
    border-radius: 5px;
    padding: 6px 16px;
    font-size: 16px;
}

main {
    display: flex;
    padding: 4rem 2rem;
}
</style>