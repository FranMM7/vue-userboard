<template>
  <div class="relative w-full group">
    <!-- Texto truncado -->
    <div
      ref="textRef"
      class="truncate text-center text-lg text-black"
    >
      {{ text }}
    </div>

    <!-- Tooltip visible solo en hover y si hay overflow -->
    <div
      v-if="showTooltip"
      class="absolute top-full left-1/2 -translate-x-1/2 mt-2 px-3 py-1 bg-gray-800 text-white text-sm rounded whitespace-nowrap z-50 opacity-0 group-hover:opacity-100 transition-opacity"
    >
      {{ text }}
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick, watch } from 'vue';

const props = defineProps({
  text: {
    type: String,
    required: true,
  },
});

const textRef = ref(null);
const showTooltip = ref(false);

const checkOverflow = () => {
  const el = textRef.value;
  showTooltip.value = el && el.scrollWidth > el.clientWidth;
};

onMounted(() => {
  nextTick(checkOverflow);
});

watch(() => props.text, () => {
  nextTick(checkOverflow);
});
</script>
