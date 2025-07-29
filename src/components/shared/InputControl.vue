<template>
  <div class="relative w-full">
    <!-- Floating label for the input -->
    <label
      :for="id"
      class="absolute left-3 px-1 transition-all duration-200 bg-inputBg"
      @click="focusInput"
      :class="[
        isFocused || modelValue
          ? 'text-xs -top-2 text-gray-600'
          : 'text-sm top-3.5 text-gray-400',
        hasError ? 'text-red-500' : '',
      ]"
    >
      {{ label }}
    </label>

    <!-- Input field -->
    <input
      ref="inputRef"
      :id="id"
      :type="type"
      :value="modelValue"
      :disabled="disabled"
      @input="$emit('update:modelValue', $event.target.value)"
      @focus="isFocused = true"
      @blur="isFocused = false"
      class="w-full px-3 pt-5 pb-2 border rounded-md bg-inputBg text-sm transition-all duration-200 outline-none"
      :class="[
        hasError
          ? 'border-red-500'
          : 'border-inputBorder focus:border-secondary',
        disabled ? 'opacity-50 cursor-not-allowed' : '',
      ]"
    />

    <!-- Helper text or error message below the input -->
    <p
      class="mt-1 text-xs"
      :class="hasError ? 'text-red-500' : 'text-gray-400'"
    >
      {{ hasError ? errorText : helperText }}
    </p>
  </div>
</template>

<script setup>
import { ref } from "vue";

// Props for customizing input behavior and appearance
defineProps({
  id: String, // Input element ID
  label: String, // Label text
  type: {
    type: String,
    default: "text", // Input type (text, email, etc.)
  },
  modelValue: [String, Number], // v-model binding value
  helperText: {
    type: String,
    default: "", // Helper text below input
  },
  errorText: {
    type: String,
    default: "", // Error message below input
  },
  hasError: {
    type: Boolean,
    default: false, // Whether to show error styling/message
  },
  disabled: {
    type: Boolean,
    default: false, // Whether input is disabled
  },
});

// Emits update event for v-model
defineEmits(["update:modelValue"]);

// Tracks input focus state for label animation
const isFocused = ref(false);
// Reference to the input element for focusing
const inputRef = ref(null);

// Focuses the input when label is clicked
function focusInput() {
  isFocused.value = true;
  inputRef.value?.focus();
}
</script>
