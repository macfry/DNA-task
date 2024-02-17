<script setup lang="ts">
import { ref, type PropType, computed, watch } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from '@/store';
import type { ITransaction } from '@/types/Transaction';
import Pagination from '@/components/table/Pagination.vue';
import { MutationTypes } from '@/store/mutation-types';

const props = defineProps({
    transactions: {
        type: Array as PropType<ITransaction[]>,
        required: true,
    },
    pageSize: {
        type: Number,
        default: 10,
    },
});

const store = useStore();

const pageValue = ref<number>(store.state.filters.page);
const pageCount = computed(() => Math.ceil(props.transactions.length / props.pageSize));
const tableData = computed(() => {
    const firstPage = pageValue.value;

    let start = firstPage - 1;
    let stop = props.pageSize - 1;
  
    if (firstPage !== 1) {
        const lastPage = props.transactions.length - 1;
        start = (firstPage - 1) * props.pageSize;
        stop = start + props.pageSize - 1;
        stop = stop > lastPage ? lastPage : stop;
    }

    return [...props.transactions].slice(start, stop);
});

const router = useRouter();

const showMoreDetails = (transactionId: string) => {
    router.push({
        name: 'transactions/details',
        params: { id: transactionId },
    });
};

watch(pageValue, (newVal, oldVal) => {
    if (newVal !== oldVal) {
        store.commit(MutationTypes.SET_FILTERS_PAGE, newVal);
    }
})
</script>

<template>
    <h3 class="table-title">Transactions</h3>

    <div class="table-wrapper" v-if="tableData.length">
        <table id="transactionTable" >
            <thead>
                <tr class="table-header">
                    <th class="table-column-title">ID</th>
                    <th class="table-column-title">Amount</th>
                </tr>
            </thead>

            <tbody>
                <tr v-for="transaction in tableData" :key="transaction.id" @click="showMoreDetails(transaction.id)" class="table-row">
                    <td class="table-cell">{{ transaction.id }}</td>
                    <td class="table-cell">{{ transaction.amount }}</td>
                </tr>
            </tbody>
        </table>

        <Pagination 
            :page-count="pageCount"
            :page-size="props.pageSize"
            :page="pageValue"
            v-model="pageValue" 
        />
    </div>

    <p class="empty-table" v-else>There is no item in table.</p>
</template>

<style lang="scss" scoped>
.table-title {
    font-weight: 600;
    font-size: 1.5rem;
}

.table-wrapper {
    display: flex;
    flex-direction: column;
}

.table-header {
    color: hsla(160, 100%, 37%, 1);
}

.table-row {
    &:hover {
        cursor: pointer;
    }
}

.table-column-title {
    text-align: left;
    font-weight: 600;
}

.table-column-title,
.table-cell {
    padding: 0.5rem;
}

.table-cell {
    border-top: 1px solid var(--color-border);
    padding: 0.5rem;
}

.empty-table {
    text-align: center;
    font-style: italic;
}
</style>