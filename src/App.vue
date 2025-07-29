<template>
  <!-- Main container with background and minimum height -->
  <div class="bg-gray-100 min-h-screen">
    <!-- Header component at the top -->
    <Header />
    <main>
      <!-- RegistrationForm emits 'registered' event when a user registers -->
      <!-- handleUserRegistered is called on this event -->
      <RegistrationForm @registered="handleUserRegistered" />
      <!-- UserList displays the list of users; ref used for direct method calls -->
      <UserList ref="userListRef" />
    </main>
  </div>
</template>

<script>
import { ref } from "vue";
import { Header } from "@/components/shared";
import RegistrationForm from "@/components/RegistrationForm.vue";
import UserList from "@/components/UserList.vue";
export default {
  name: "App",
  components: {
    RegistrationForm, // Form for registering new users
    UserList, // Displays registered users
    Header, // Page header
  },
  setup() {
    // Reference to the UserList component instance
    const userListRef = ref(null);

    // Called when RegistrationForm emits 'registered'
    // Triggers UserList to refresh its first page of users
    const handleUserRegistered = () => {
      if (userListRef.value?.refreshFirstPage) {
        userListRef.value.refreshFirstPage();
      }
    };

    // Expose methods and refs to the template
    return {
      handleUserRegistered,
      userListRef,
    };
  },
};
</script>
