<script setup lang="ts">
defineProps({
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
      {{ value }}{{ currencySign }}</span> {{ label }}
  </div>
</template>