<template>
  <!-- Card container for displaying user info -->
  <div class="bg-white shadow-md rounded-lg p-4 text-center">
    <!-- User photo -->
    <img
      :src="user.photo"
      :alt="user.name"
      class="w-20 h-20 rounded-full mx-auto object-cover mb-4"
    />
    <!-- User name -->
    <h3 class="text-lg font-semibold truncate">{{ user.name }}</h3>
    <!-- User position -->
    <p class="text-sm text-gray-600 truncate">{{ user.position }}</p>
    <!-- User email -->
    <p class="text-sm text-gray-600 truncate">{{ user.email }}</p>
    <!-- User phone -->
    <p class="text-sm text-gray-600">{{ user.phone }}</p>
  </div>
</template>

<script>
export default {
  name: 'UserCard',
  props: {
    // User object containing user details
    user: { type: Object, required: true },
  },
};
</script>
