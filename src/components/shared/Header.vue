<template>
  <!-- Page header section -->
  <header class="bg-white w-full">
    <div
      class="max-w-[1170px] mx-auto flex flex-col sm:flex-row items-center justify-between px-4 py-5 gap-4 sm:gap-0"
    >
      <!-- Logo area with image and title -->
      <div class="flex items-center gap-2">
        <img :src="Logo" alt="Logo" />
      </div>

      <!-- Navigation buttons -->
      <div class="flex gap-3">
        <!-- Link to Users page -->
        <RouterLink
          to="/"
          class="bg-primary text-black font-medium py-1.5 px-6 rounded-full hover:bg-primaryHover transition"
        >
          Users
        </RouterLink>
        <!-- Link to Sign up page -->
        <RouterLink
          to="/signup"
          class="bg-primary text-black font-medium py-1.5 px-6 rounded-full hover:bg-primaryHover transition"
        >
          Sign up
        </RouterLink>
      </div>
    </div>
  </header>
</template>

<script setup>
import Logo from "@/assets/Logo.svg";
</script>
