<template>
  <div class="bg-gray-100 min-h-screen">
    <header class="py-6 text-center bg-white shadow">
      <h1 class="text-3xl font-bold text-gray-800">Vue UserBoard</h1>
    </header>

    <main>
      <RegistrationForm @registered="handleUserRegistered" />
      <UserList ref="userListRef" />
    </main>
  </div>
</template>

<script>
import RegistrationForm from '@/components/RegistrationForm.vue';
import UserList from '@/components/UserList.vue';
import { ref } from 'vue';

export default {
  name: 'App',
  components: {
    RegistrationForm,
    UserList,
  },
  setup() {
    const userListRef = ref(null);

    const handleUserRegistered = () => {
      if (userListRef.value?.refreshFirstPage) {
        userListRef.value.refreshFirstPage();
      }
    };

    return {
      handleUserRegistered,
      userListRef,
    };
  },
};
</script>
