<template>
  <button
    :class="{btn: true, secondary}"
  >
    {{ text }}
    <slot />
  </button>
</template>

<script setup>
import { defineProps } from '@vue/runtime-core'

defineProps({
  text: {
    type: String,
    default: '',
  },
  secondary: Boolean,
})
</script>

<style scoped>
.btn {
  @apply  rounded  font-semibold  uppercase  cursor-pointer  p-2;
  background-color: var(--ok-color);
  color: var(--almost-white);
}

.secondary {
  background-color: white;
  color: var(--ok-color);
  border-color: var(--ok-color);
}</style>
