<template>
  <!-- Main container with background and minimum height -->
  <div class="bg-gray-100 min-h-screen">
    <!-- Header component at the top -->
    <Header />
    <main>
      <!-- WelcomeCard component displays a welcome message -->
      <WelcomeCard />

      <!-- UserList displays the list of users; ref used for direct method calls -->
      <section id="users">
        <UserList ref="userListRef" />
      </section>

      <!-- RegistrationForm emits 'registered' event when a user registers -->
      <!-- handleUserRegistered is called on this event -->
      <section id="signup">
        <RegistrationForm @registered="handleUserRegistered" />
      </section>
    </main>
  </div>
</template>

<script>
import { ref } from "vue";
import { Header } from "@/components/shared";
import RegistrationForm from "@/components/RegistrationForm.vue";
import UserList from "@/components/UserList.vue";
import WelcomeCard from "@/components/WelcomeCard.vue";
export default {
  name: "App",
  components: {
    RegistrationForm, // Form for registering new users
    UserList, // Displays registered users
    Header, // Page header
    WelcomeCard, // Welcome message and introduction
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
