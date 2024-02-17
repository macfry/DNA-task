<script setup lang="ts">
const props = defineProps({
    size: {
        type: Number,
        default: 48,
    },
    borderWidth: {
        type: Number,
        default: 5,
    }
})
</script>

<template>
    <span class="loader" :style="{
        width: props.size + 'px', 
        height: props.size + 'px',
        borderWidth: props.borderWidth + 'px',
    }"></span>
</template>

<style lang="scss">
.loader {
    border-style: solid;
    border-color: #fff;
    border-bottom-color: transparent;
    border-radius: 50%;
    display: inline-block;
    box-sizing: border-box;
    animation: rotation 1s linear infinite;
}

@keyframes rotation {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
} 
</style>