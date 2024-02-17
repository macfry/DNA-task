<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { useStore } from '@/store';
import type { IMerchant } from '@/types/Merchant';
import type { ITransaction } from '@/types/Transaction';

const route = useRoute();
const store = useStore();

const merchant = ref<IMerchant | null>(null);
const transaction = ref<ITransaction | null>(null);

onMounted(() => {
    if (route.params.id) {
        transaction.value = (store.getters.transactions ?? []).find(({ id }) => id === route.params.id) ?? null;
        merchant.value = (store.getters.merchants ?? []).find(({ id }) => id === transaction.value?.merchantId) ?? null;
    }
});
</script>

<template>
    <div v-if="transaction">
        <p class="sub-header">Transaction {{ transaction.id }} details</p>
        <ul>
            <li>Amount: {{ transaction.amount }}</li>
            <li>Date: {{ transaction.date }}</li>
            <li v-show="merchant">Merchant: {{ merchant?.name }}</li>
            <li>UserId: {{ transaction.userId }}</li>
        </ul>
    </div>

    <p v-else class="sub-header">Transaction not found.</p>
</template>

<style lang="scss">
.sub-header {
    font-size: 16px;
    font-weight: 500;
}
</style>
