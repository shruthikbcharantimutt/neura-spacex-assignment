<template>
  <div
    v-if="visible"
    class="alert alert-success alert-dismissible fade show"
    role="alert"
  >
    {{ message }}
    <button
      type="button"
      class="btn-close"
      @click="closeAlert"
      aria-label="Close"
    ></button>
  </div>
</template>

<script setup lang="ts">
import { ref, defineProps, defineEmits } from "vue";

const props = defineProps({
  message: {
    type: String,
    required: true,
  },
});

const emits = defineEmits(["close"]);

const visible = ref(true);

const closeAlert = () => {
  visible.value = false;
  emits("close");
};
</script>

<style scoped>
/* Additional styles if needed */

.alert {
  position: fixed;
  width: 30%;
  right:0
}
</style>
