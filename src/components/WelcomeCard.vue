<template>
  <section
    class="relative w-full h-[90vh] min-h-[500px] flex items-center justify-center text-white text-center px-4"
  >
    <!-- Background image -->
    <img
      src="/pexels-alexandr-podvalny-1227513.jpeg"
      alt="Welcome background"
      class="absolute inset-0 w-full h-full object-cover"
    />

    <!-- Overlay -->
    <div class="absolute inset-0 bg-black/40"></div>

    <!-- Text Content -->
    <div class="relative z-10 max-w-4xl space-y-6">
      <h1 class="text-3xl md:text-4xl lg:text-5xl font-semibold">
        Test assignment for <br />
        front-end developer
      </h1>
      <p class="text-base md:text-lg lg:text-xl leading-relaxed text-gray-100">
        What defines a good front-end developer is one that has skilled
        knowledge of HTML, CSS, JS with a vast understanding of User design
        thinking as they'll be building web interfaces with accessibility in
        mind.
        <br />
        They should also be excited to learn, as the world of Front-End
        Development keeps evolving.
      </p>

      <!-- CTA Button -->
      <!-- Submit button -->
      <div class="text-center pt-4">
        <ActionButton label="Sign up" @click="scrollToSection('signup')" />
      </div>
    </div>
  </section>
</template>

<script setup>
import ActionButton from "@/components/shared/ActionButton.vue";

const scrollToSection = (sectionId) => {
  const el = document.getElementById(sectionId);
  if (el) {
    el.scrollIntoView({ behavior: "smooth" });
  }
};
</script>
