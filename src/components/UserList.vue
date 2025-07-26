<template>
  <section class="py-10 px-4 max-w-6xl mx-auto">
    <h2 class="text-2xl font-bold text-center mb-6">
      Working with GET request
    </h2>

    <div class="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
      <UserCard v-for="user in users" :key="user.id" :user="user" />
    </div>

    <div class="text-center mt-8" v-if="!isLastPage">
      <button
        @click="loadMore"
        class="bg-yellow-400 hover:bg-yellow-300 text-black font-semibold py-2 px-6 rounded transition"
        :disabled="isLoading"
      >
        {{ isLoading ? "Loading..." : "Show more" }}
      </button>
    </div>
  </section>
</template>

<script>
import { ref, onMounted, defineExpose } from "vue";
import { getUsers } from "@/services/api";
import UserCard from "./UserCard.vue";

export default {
  name: "UserList",
  components: { UserCard },
  setup() {
    const users = ref([]);
    const page = ref(1);
    const isLastPage = ref(false);
    const isLoading = ref(false);

    const fetchUsers = async () => {
      isLoading.value = true;
      try {
        const res = await getUsers(page.value, 6);
        users.value.push(...res.users);
        if (page.value >= res.total_pages) {
          isLastPage.value = true;
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        isLoading.value = false;
      }
    };

    const loadMore = () => {
      page.value++;
      fetchUsers();
    };

    const refreshFirstPage = async () => {
      users.value = [];
      page.value = 1;
      isLastPage.value = false;
      await fetchUsers();
    };

    defineExpose({ refreshFirstPage });

    onMounted(fetchUsers);

    return {
      users,
      isLoading,
      loadMore,
      isLastPage,
    };
  },
};
</script>
