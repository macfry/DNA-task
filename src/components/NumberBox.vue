<script setup lang="ts">
const props = defineProps({
  value: {
    type: Number,
    required: true,
  },
  label: {
    type: String,
    required: true,
  },
});
</script>

<template>
  <div class="dashboard-box">
    <span>{{ props.value }}</span> {{ props.label }}
  </div>
</template>
