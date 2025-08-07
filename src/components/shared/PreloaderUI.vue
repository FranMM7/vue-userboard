<template>
  <!--
    Circular spinner preloader.
    Uses Tailwind CSS classes for size, border, and animation.
    The top border is transparent to create a spinning effect.
  -->
  <div class="w-6 h-6 border-4 border-secondary border-t-transparent rounded-full animate-spin"></div>
</template>

<script>
export default {
  name: 'PreloaderUI', // Component name for the preloader
};
</script>
