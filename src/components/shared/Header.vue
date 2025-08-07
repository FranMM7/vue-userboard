<template>
  <!-- Page header section -->
  <header class="bg-white w-full">
    <div
      class="max-w-[1170px] mx-auto flex flex-wrap items-center justify-between px-4 py-5 gap-4"
    >
      <!-- Logo area -->
      <div class="flex items-center gap-2">
        <img :src="Logo" alt="Logo" />
      </div>

      <!-- Navigation buttons -->
      <div class="flex gap-3">
        <ActionButton label="Users" @click="scrollToSection('users')" />
        <ActionButton label="Sign up" @click="scrollToSection('signup')" />
      </div>
    </div>
  </header>
</template>

<script setup>
import Logo from "@/assets/Logo.svg";
import ActionButton from "@/components/shared/ActionButton.vue";

const scrollToSection = (sectionId) => {
  const el = document.getElementById(sectionId);
  if (el) {
    el.scrollIntoView({ behavior: "smooth" });
  }
};
</script>
