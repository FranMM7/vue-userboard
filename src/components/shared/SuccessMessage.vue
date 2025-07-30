<template>
  <div
    class="w-full min-h-[60vh] flex flex-col items-center justify-center text-center px-4 py-10"
  >
    <!-- Title -->
    <h2 class="text-2xl md:text-3xl font-semibold text-gray-900 mb-8">
      User successfully registered
    </h2>

    <!-- Image -->
    <img
      src="/success-image.svg"
      alt="Success"
      class="max-w-[300px] md:max-w-[400px] w-full h-auto"
    />
  </div>
</template>

<script>
export default {
  name: "SuccessMessage",
};
</script>
