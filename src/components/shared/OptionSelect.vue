<template>
  <div>
    <!-- Label for the option group -->
    <p class="mb-2 font-semibold">{{ label }}</p>
    <!-- Option list: radio or checkbox -->
    <div :class="isCheckbox ? 'space-y-2' : 'flex flex-col gap-2'">
      <label
        v-for="option in options"
        :key="option.id"
        class="flex items-center gap-2 cursor-pointer"
      >
        <!-- Input for each option (radio or checkbox) -->
        <input
          :type="type"
          :value="option.id"
          v-model="modelValueProxy"
          :required="required"
          class="peer sr-only"
        />
        <!-- Custom radio/checkbox style -->
        <div
          class="w-4 h-4 rounded-full border border-gray-400 flex items-center justify-center peer-checked:border-secondary peer-checked:ring-2 peer-checked:ring-secondary transition"
        >
          <!-- Dot center -->
          <div
            :class="[
              'w-2 h-2 rounded-full bg-secondary scale-75 transition-all',
              modelValue === option.id ? 'opacity-100 scale-100' : 'opacity-0',
            ]"
          ></div>
        </div>
        <span>{{ option.name }}</span>
      </label>
    </div>
    <!-- Error message -->
    <span v-if="error" class="text-red-500 text-sm mt-1 block">
      {{ error }}
    </span>
  </div>
</template>

<script>
export default {
  name: "OptionSelect",
  props: {
    // Label for the option group
    label: {
      type: String,
      default: "Select an option:",
    },
    // Array of option objects to display
    options: {
      type: Array,
      required: true,
    },
    // v-model binding value
    modelValue: {
      required: true,
    },
    // Input type: 'radio' or 'checkbox'
    type: {
      type: String,
      default: "radio",
      validator: (val) => ["radio", "checkbox"].includes(val),
    },
    // Whether selection is required
    required: {
      type: Boolean,
      default: false,
    },
    // Error message to display
    error: {
      type: String,
      default: "",
    },
  },
  computed: {
    // Returns true if input type is checkbox
    isCheckbox() {
      return this.type === "checkbox";
    },
    // Proxy for v-model to emit updates
    modelValueProxy: {
      get() {
        return this.modelValue;
      },
      set(val) {
        this.$emit("update:modelValue", val);
      },
    },
  },
};
</script>
