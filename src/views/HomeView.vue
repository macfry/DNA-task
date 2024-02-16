<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from '@/store';
import type { ITransaction } from '@/types/Transaction';
import type { IMerchant } from '@/types/Merchant';
import CurrencyBox from '@/components/CurrencyBox.vue';
import NumberBox from '@/components/NumberBox.vue';
import { ActionTypes } from '@/store/action-types';

const store = useStore();
const router = useRouter();

const merchants = ref<IMerchant[]>([]);
const transactions = ref<ITransaction[]>([]);
const transactionsSum = computed<number>(() => +transactions.value.reduce((sum, current) => sum + current.amount, 0).toFixed(2) || 0);
const loading = ref<boolean>(false);
const error = ref<null | string>(null);
const controller = new AbortController();

onMounted(async () => {
  try {
    loading.value = true;
    error.value = null;
    await Promise.all([
      store.dispatch(ActionTypes.GET_MERCHANTS, { signal: controller.signal }),
      store.dispatch(ActionTypes.GET_TRANSACTIONS, { signal: controller.signal })
    ]);
    transactions.value = store.getters.transactions ?? [];
    merchants.value = store.getters.merchants ?? [];
  } catch (err: unknown) {
    const errData = err as Error;
    error.value = errData.message;
  } finally {
    loading.value = false;
  }
});

onBeforeUnmount(() => {
  controller.abort();
});
</script>

<template>
  <main>
    <CurrencyBox :value="transactionsSum" :currency-sign="'$'" label="Profit" />
    <NumberBox :value="transactions.length" label="Transactions" @click="() => router.push('/transactions')" />
    <NumberBox :value="merchants.length" label="Merchants" />
  </main>
</template>

<style lang="scss" scoped>
  main {
    display: flex;
    padding: 4rem 2rem;
  }
</style>
