<script setup lang="ts">
const props = defineProps({
  value: {
    type: Number,
    required: true,
  },
  currencySign: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    required: true,
  }
})
</script>

<template>
  <div class="dashboard-box">
    <span>
      {{ props.value }}{{ props.currencySign }}
    </span> {{ props.label }}
  </div>
</template>
