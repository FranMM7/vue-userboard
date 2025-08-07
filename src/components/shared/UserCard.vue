<template>
  <!-- Card container for displaying user info -->
  <div class="bg-white shadow-md rounded-lg p-5 text-center space-y-5">
    <!-- User photo using ImageIncase component -->
    <ImageIncase
      :src="user.photo"
      :alt="user.name"
      class="w-20 h-20 rounded-full mx-auto object-cover"
    />

    <!-- User name -->
    <TooltipComponent :text="user.name">
      <p class="truncate font-semibold text-lg">{{ user.name }}</p>
    </TooltipComponent>

    <!-- User position, email and phone with tooltips -->
    <div class="space-y-1 text-sm text-gray-600">
      <!-- User position with tooltip -->
      <TooltipComponent :text="user.position">
        <p class="truncate">{{ user.position }}</p>
      </TooltipComponent>

      <!-- User email with tooltip -->
      <TooltipComponent :text="user.email">
        <p class="truncate">{{ user.email }}</p>
      </TooltipComponent>

      <!-- User phone with tooltip -->      
      <LabelMask :model-value="user.phone" mask="+99 (99) 999-9999" />
    </div>
  </div>
</template>

<script>
import ImageIncase from "@/components/shared/ImageIncase.vue";
import TooltipComponent from "@/components/shared/TooltipComponent.vue";
import LabelMask from "@/components/shared/LabelMask.vue";

export default {
  name: "UserCard",
  components: {
    ImageIncase,
    TooltipComponent,
    LabelMask,
  },
  props: {
    // User object containing user details
    user: { type: Object, required: true },
  },
};
</script>
