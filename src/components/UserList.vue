<template>
  <!-- Section container for user list -->
  <section class="py-10 px-4 max-w-6xl mx-auto">
    <!-- Title -->
    <h2 class="text-2xl font-bold text-center mb-6">
      Working with GET request
    </h2>

    <div
      v-if="isLoading && users.length === 0"
      class="flex justify-center items-center min-h-[300px]"
    >
      <PreloaderUI />
    </div>

    <!-- Grid of user cards -->
    <div class="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
      <!-- Render a UserCard for each user -->
      <UserCard v-for="user in users" :key="user.id" :user="user" />
    </div>
    <div
      v-if="isLoading && users.length > 0"
      class="flex justify-center items-center min-h-[300px]"
    >
      <PreloaderUI />
    </div>

    <!-- Show more button, only if there are more pages -->
    <div class="text-center mt-8" v-if="!isLastPage">
      <ActionButton
        :label="isLoading ? 'Loading...' : 'Show more'"
        :variant="isLoading ? 'secondary' : 'primary'"
        @click="loadMore"
        :disabled="isLoading"
      />
    </div>
  </section>
</template>

<script>
import { ref, onMounted, defineExpose } from "vue";
import { getUsers } from "@/services/api";
import { UserCard, ActionButton, PreloaderUI } from "@/components/shared";

export default {
  name: "UserList",
  components: { UserCard, ActionButton, PreloaderUI },

  setup() {
    // List of users to display
    const users = ref([]);
    // Current page number for pagination
    const page = ref(1);
    // Indicates if the last page has been reached
    const isLastPage = ref(false);
    // Loading state for API requests
    const isLoading = ref(false);

    // Fetch users from API for the current page
    const fetchUsers = async () => {
      isLoading.value = true;
      try {
        // Get users for the current page, 6 per page
        const res = await getUsers(page.value, 6);
        // Add fetched users to the list
        users.value.push(...res.users);
        // Check if this is the last page
        if (page.value >= res.total_pages) {
          isLastPage.value = true;
        }
      } catch (error) {
        // Log any errors
        console.error("Error fetching users:", error);
      } finally {
        // Reset loading state
        isLoading.value = false;
      }
    };

    // Load next page of users
    const loadMore = () => {
      page.value++;
      fetchUsers();
    };

    // Refresh and reload the first page of users
    const refreshFirstPage = async () => {
      users.value = [];
      page.value = 1;
      isLastPage.value = false;
      await fetchUsers();
    };

    // Expose refreshFirstPage method for parent components
    defineExpose({ refreshFirstPage });

    // Fetch initial users when component mounts
    onMounted(fetchUsers);

    // Return reactive state and methods to template
    return {
      users,
      isLoading,
      loadMore,
      isLastPage,
    };
  },
};
</script>
