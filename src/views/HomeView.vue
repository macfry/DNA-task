<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from 'vue';
import CurrencyBox from '@/components/CurrencyBox.vue';
import NumberBox from '@/components/NumberBox.vue';
import type { ITransaction } from '@/types/Transaction';
import type { IMerchant } from '@/types/Merchant';
import { getRequest } from './../services';

const merchants = ref<IMerchant[]>([]);
const transactions = ref<ITransaction[]>([]);
const transactionsSum = computed<number>(() => +transactions.value.reduce((sum, current) => sum + current.amount, 0).toFixed(2) || 0);

const loading = ref<boolean>(false);
const error = ref<null | string>(null);

fetch('http://localhost:8000/transactions')
  .then(response => response.json())
  .then(data => {
    transactions.value = data
  })


fetch('http://localhost:8000/merchants')
  .then(response => response.json())
  .then(data => merchants.value = data)

const controller = new AbortController()

onMounted(async () => {
  try {
    loading.value = true;
    error.value = null;
    const [transactionsResponse, merchantsResponse] = await Promise.all([
      getRequest('http://localhost:8000/transactions', controller.signal),
      getRequest('http://localhost:8000/merchants', controller.signal),
    ]);
    transactions.value = transactionsResponse ?? [];
    merchants.value = merchantsResponse ?? [];
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
    <NumberBox :value="transactions.length" label="Transactions" />
    <NumberBox :value="merchants.length" label="Merchants" />
  </main>
</template>

<style lang="scss" scoped>
  main {
    display: flex;
    padding: 4rem 2rem;
  }
</style>
