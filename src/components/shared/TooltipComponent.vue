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
  // The text to display and check for overflow
  text: {
    type: String,
    required: true,
  },
});

// Reference to the text element in the DOM
const textRef = ref(null);
// Controls whether the tooltip is shown
const showTooltip = ref(false);

/**
 * Checks if the text content overflows its container.
 * If it does, enables the tooltip.
 */
const checkOverflow = () => {
  const el = textRef.value;
  showTooltip.value = el && el.scrollWidth > el.clientWidth;
};

// Run overflow check after component is mounted and DOM is updated
onMounted(() => {
  nextTick(checkOverflow);
});

// Watch for changes in the text prop and re-check overflow
watch(() => props.text, () => {
  nextTick(checkOverflow);
});
</script>
