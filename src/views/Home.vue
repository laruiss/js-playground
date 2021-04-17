<template>
  <div class="text-center">
    <basic-button
      @click="$router.push('/fn-one')"
    >
      Commencer
      <fa-icon :icon="['fas', 'arrow-right']" />
    </basic-button>
  </div>
</template>

<script>
import BasicButton from '@/components/BasicButton.vue'

export default {
  name: 'Home',
  components: {
    BasicButton,
  },
}
</script>
