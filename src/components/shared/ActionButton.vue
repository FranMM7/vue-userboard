<template>
  <!-- Customizable action button -->
  <button
    :type="type"
    :disabled="disabled"
    :class="[
      'rounded-full px-6 py-2 font-semibold focus:outline-none focus:ring-2 transition-colors duration-200',
      buttonClasses // Computed classes based on variant and disabled state
    ]"
  >
    {{ label }}
  </button>
</template>

<script setup>
import { computed } from 'vue';

// Props for customizing button label, type, variant, and disabled state
const props = defineProps({
  label: { type: String, required: true }, // Button text
  type: { type: String, default: 'button' }, // Button type (button, submit, etc.)
  variant: { type: String, default: 'primary' }, // Button style variant
  disabled: { type: Boolean, default: false }, // Disabled state
});

// Computes button classes based on props
const buttonClasses = computed(() => {
  if (props.disabled) {
    // Disabled style
    return 'bg-gray-400 cursor-not-allowed text-white';
  }

  if (props.variant === 'secondary') {
    // Secondary style
    return 'bg-secondary hover:bg-secondaryHover text-white focus:ring-secondary';
  }

  // Default is 'primary' style
  return 'bg-primary hover:bg-primaryHover text-black focus:ring-primary';
});
</script>
