<template>
  <div class="bg-white shadow-md rounded-lg p-4 text-center">
    <img
      :src="user.photo"
      :alt="user.name"
      class="w-20 h-20 rounded-full mx-auto object-cover mb-4"
    />
    <h3 class="text-lg font-semibold truncate">{{ user.name }}</h3>
    <p class="text-sm text-gray-600 truncate">{{ user.position }}</p>
    <p class="text-sm text-gray-600 truncate">{{ user.email }}</p>
    <p class="text-sm text-gray-600">{{ user.phone }}</p>
  </div>
</template>

<script>
export default {
  name: 'UserCard',
  props: {
    user: { type: Object, required: true },
  },
};
</script>
