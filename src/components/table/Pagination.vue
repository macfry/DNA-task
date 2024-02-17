<script lang="ts" setup>
import { computed } from 'vue';

const emits = defineEmits(['update:modelValue']);

const props = defineProps({
    pageCount: {
        type: Number,
        required: true,
        default: 0,
    },
    pageSize: {
        type: Number,
        default: 25,
    },
    page: {
        type: Number,
        required: true,
        default: 1,
    },
    totalItems: {
        type: Number,
    },
    visiblePages: {
        type: Number,
        default: 6,
    },
});

const pagesArr = computed<number[]>(() => {
    const pages = [...Array(props.pageCount).keys()].map((i) => i + 1);
    if (props.pageCount > props.visiblePages) {
        const itemsPerSite = Math.ceil(props.visiblePages / 2);
        const startArr = pages.slice(0, itemsPerSite);
        const stopArr = pages.slice(-1 * itemsPerSite);
        return [...startArr, 0, ...stopArr];
    } else {
        return pages;
    }
});
</script>

<template>
    <nav aria-label="Pagination" class="pagination-wrapper" v-if="pageCount > 0">
        <ul class="pagination">
            <li class="page-item" :class="{ disabled: props.page === 1 }">
                <a aria-label="Previous" class="page-link" href="#"
                    @click="emits('update:modelValue', props.page - 1)">
                    <span aria-hidden="true">&laquo;</span>
                </a>
            </li>

            <li v-for="n in pagesArr" :key="n" :class="{ active: n === props.page, disabled: n === 0 }"
                :aria-current="n === props.page ? 'page' : undefined" class="page-item">
                <span v-if="n === 0"  class="page-link" aria-hidden="true">&hellip;</span>
                <a v-else class="page-link" href="#" @click="emits('update:modelValue', n)">{{ n }}</a>
            </li>

            <li class="page-item" :class="{ disabled: props.page === pageCount }">
                <a aria-label="Next" class="page-link" href="#"
                    @click="emits('update:modelValue', props.page + 1)">
                    <span aria-hidden="true">&raquo;</span>
                </a>
            </li>
        </ul>
    </nav>
</template>

<style lang="scss">
.pagination-wrapper {
    margin-top: 1rem;
}

.pagination {
    display: flex;
    justify-content: end;
    list-style: none;
    margin: 0;
    padding: 0;
    gap: 0.25rem;
}

.page-item {
    &.active {
        .page-link {
            background-color: hsl(160, 100%, 37%);
            color: white;
            font-weight: 600;
        }
    }
}

.page-link {
    text-align: center;
    min-width: 32px;
    min-height: 32px;
    display: block;
    border-radius: 50%;
}
</style>
