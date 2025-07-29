<template>
  <div class="w-full">
    <!-- File upload input group -->
    <div
      :class="[
        'flex border rounded-[4px] overflow-hidden',
        hasError ? 'border-red-500' : 'border-borderGray',
      ]"
    >
      <!-- Upload button triggers file input -->
      <button
        type="button"
        @click="triggerFileInput"
        class="px-4 py-2 text-sm font-medium"
        :class="[
          hasError
            ? 'text-red-500 border-r border-red-500'
            : 'text-black border-r border-borderGray',
        ]"
      >
        Upload
      </button>

      <!-- Display selected file name or placeholder -->
      <input
        type="text"
        class="flex-1 bg-inputBg text-sm px-3 py-2 outline-none"
        :value="fileName"
        :placeholder="placeholder"
        readonly
      />
    </div>

    <!-- Error message if file input has error -->
    <p v-if="hasError" class="mt-1 text-xs text-red-500">
      {{ errorMessage }}
    </p>

    <!-- Hidden file input element -->
    <input
      type="file"
      ref="fileInput"
      class="hidden"
      @change="handleFileChange"
    />
  </div>
</template>

<script setup>
import { ref } from "vue";

// Props for customizing input and error display
const props = defineProps({
  placeholder: {
    type: String,
    default: "Upload your photo",
  },
  hasError: {
    type: Boolean,
    default: false,
  },
  errorMessage: {
    type: String,
    default: "Error text",
  },
});

// Emits file-selected event when a file is chosen
const emit = defineEmits(["file-selected"]);

// Stores the selected file name for display
const fileName = ref("");
// Reference to the hidden file input element
const fileInput = ref(null);

// Opens the file dialog when upload button is clicked
const triggerFileInput = () => {
  fileInput.value?.click();
};

// Handles file selection and emits the file to parent
const handleFileChange = (e) => {
  const file = e.target.files[0];
  if (file) {
    fileName.value = file.name;
    emit("file-selected", file);
  }
};
</script>
