<template>
  <!--
    Displays the masked value if available.
    Shows "No data" in gray if no value is provided.
  -->
  <div class="inline-block text-sm text-gray-700">
    <span v-if="maskedText">{{ maskedText }}</span>
    <span v-else class="text-gray-400">No data</span>
  </div>
</template>

<script setup>
import { computed } from 'vue';

// Define component props: modelValue (string or number) and mask (string, required)
const props = defineProps({
  modelValue: {
    type: [String, Number],
    default: '',
  },
  mask: {
    type: String,
    required: true,
  },
});

/**
 * Applies a mask to the input value.
 * Mask rules:
 *   9 = number
 *   A = letter
 *   X = alphanumeric
 * Non-mask characters are inserted as-is.
 * Stops processing if the value does not match the mask at any position.
 */
function applyMask(value, mask) {
  let clean = String(value).replace(/[^a-zA-Z0-9]/g, '');
  let result = '';
  let index = 0;

  for (let i = 0; i < mask.length; i++) {
    const maskChar = mask[i];

    if (['9', 'A', 'X'].includes(maskChar)) {
      const char = clean[index];

      if (!char) break;

      if (
        (maskChar === '9' && /\d/.test(char)) ||
        (maskChar === 'A' && /[a-zA-Z]/.test(char)) ||
        (maskChar === 'X' && /[a-zA-Z0-9]/.test(char))
      ) {
        result += char;
        index++;
      } else {
        break;
      }
    } else {
      result += maskChar;
    }
  }

  return result;
}

// Computes the masked text to display, or empty string if no value is provided
const maskedText = computed(() =>
  props.modelValue ? applyMask(props.modelValue, props.mask) : ''
);
</script>
