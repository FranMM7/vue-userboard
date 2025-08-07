<template>
  <div class="relative w-full">
    <!-- Floating label -->
    <label
      :for="id"
      class="absolute left-3 px-1 transition-all duration-200 bg-inputBg"
      @click="focusInput"
      :class="[isFocused || modelValue ? 'text-xs -top-2 text-gray-600' : 'text-sm top-3.5 text-gray-400', hasError ? 'text-red-500' : '']"
    >
      {{ label }}
    </label>

    <!-- Input -->
    <input
      ref="inputRef"
      :id="id"
      type="text"
      :value="displayValue"
      :disabled="disabled"
      @input="onInput"
      @focus="isFocused = true"
      @blur="isFocused = false"
      class="w-full px-3 pt-5 pb-2 border rounded-md bg-inputBg text-sm transition-all duration-200 outline-none"
      :class="[hasError ? 'border-red-500' : 'border-inputBorder focus:border-secondary', disabled ? 'opacity-50 cursor-not-allowed' : '']"
    />

    <!-- Helper / Error -->
    <p class="mt-1 text-xs" :class="hasError ? 'text-red-500' : 'text-gray-400'">
      {{ hasError ? errorText : helperText }}
    </p>
  </div>
</template>

<script setup>
import { ref, watch, computed } from 'vue';

const props = defineProps({
  id: String,
  label: String,
  modelValue: [String, Number],
  helperText: { type: String, default: '' },
  errorText: { type: String, default: '' },
  hasError: { type: Boolean, default: false },
  disabled: { type: Boolean, default: false },
  mask: { type: String, default: null } // e.g. '(999) 999-9999'
});

const emit = defineEmits(['update:modelValue']);

const isFocused = ref(false);
const inputRef = ref(null);

function focusInput() {
  isFocused.value = true;
  inputRef.value?.focus();
}

// Handle input changes and apply mask if present
function onInput(event) {
  const raw = event.target.value.replace(/\D/g, ''); // Remove non-digits
  const formatted = props.mask ? applyMask(raw, props.mask) : event.target.value;
  emit('update:modelValue', raw);
  displayValue.value = formatted;
}

// Mask application logic
function applyMask(value, mask) {
  let result = '';
  let valueIndex = 0;

  for (let i = 0; i < mask.length && valueIndex < value.length; i++) {
    if (mask[i] === '9') {
      result += value[valueIndex++];
    } else {
      result += mask[i];
    }
  }

  return result;
}

// Format initial value if modelValue changes externally
const displayValue = ref('');
watch(
  () => props.modelValue,
  (val) => {
    const raw = typeof val === 'string' ? val.replace(/\D/g, '') : val?.toString() || '';
    displayValue.value = props.mask ? applyMask(raw, props.mask) : raw;
  },
  { immediate: true }
);
</script>
