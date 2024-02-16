<script lang="ts">
import type { PropType } from 'vue';

export default {
  props: {
    value: {
      type: Number as PropType<number>,
      required: true,
    },
    label: {
      type: String as PropType<string>,
      required: true,
    }
  }
}
</script>

<template>
  <div class="dashboard-box">
    <span>{{ value }}</span> {{ label }}
  </div>
</template>