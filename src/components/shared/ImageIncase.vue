<template>
  <img
    :src="currentSrc"
    :alt="alt"
    @error="handleError"
    class="w-16 h-16 rounded-full object-cover"
  />
</template>

<script>
export default {
  name: "ImageIncase",
  props: {
    src: {
      type: String,
      default: "",
    },
    alt: {
      type: String,
      default: "User avatar",
    },
  },
  data() {
    return {
      defaultImage: "/photo-cover.svg", // Default image path
      currentSrc: "",
    };
  },
  watch: {
    src: {
      immediate: true,
      handler(newVal) {
        this.currentSrc = newVal || this.defaultImage;
      },
    },
  },
  methods: {
    handleError(event) {
      // Prevent infinite loop in case fallback also fails
      if (this.currentSrc !== this.defaultImage) {
        this.currentSrc = this.defaultImage;
      }
    },
  },
};
</script>
