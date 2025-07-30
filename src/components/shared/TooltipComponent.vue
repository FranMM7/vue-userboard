<template>
  <!-- Tooltip wrapper with truncate effect -->
  <div class="relative group w-full max-w-full">
    <!-- Slot content with truncation -->
    <div class="truncate w-full">
      <slot />
    </div>

    <!-- Tooltip text shown on hover -->
    <div
      class="absolute left-1/2 transform -translate-x-1/2 mt-1 whitespace-pre-line rounded bg-gray-900 text-white text-sm px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity z-10 max-w-xs text-center break-words"
    >
      {{ text }}
    </div>
  </div>
</template>

<script>
export default {
  name: "TooltipComponent",
  props: {
    text: {
      type: String,
      required: true,
    },
  },
};
</script>
