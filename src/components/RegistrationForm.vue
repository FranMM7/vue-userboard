<template>
  <!-- Registration form section -->
  <section class="py-10 px-4 max-w-2xl mx-auto">
    <!-- Title -->
    <h2 class="text-2xl font-bold text-center mb-6">
      Working with POST request
    </h2>

    <!-- Registration form -->
    <form @submit.prevent="handleSubmit" class="space-y-6">
      <!-- Name input field -->
      <InputControl
        v-model="form.name"
        label="Your Name"
        helper-text="John Doe"
        errorText="Name is required"
        :hasError="errors.name"
      />

      <!-- Email input field -->
      <InputControl
        v-model="form.email"
        label="Your Email"
        helper-text="example@example.com"
        errorText="Email is required"
        :hasError="errors.email"
      />

      <!-- Phone input field -->
      <InputControl
        v-model="form.phone"
        type="tel"
        label="Your Phone"
        helper-text="+380XXXXXXXXX"
        errorText="Phone is required"
        :hasError="errors.phone"
      />

      <!-- Position selection (radio buttons) -->
      <div>
        <p class="mb-2 font-semibold">Select your position:</p>
        <div class="space-y-2">
          <label
            v-for="pos in positions"
            :key="pos.id"
            class="flex items-center gap-2"
          >
            <input
              type="radio"
              :value="pos.id"
              v-model="form.position_id"
              required
            />
            {{ pos.name }}
          </label>
        </div>
        <!-- Error message for position selection -->
        <span v-if="errors.position_id" class="text-red-500 text-sm">{{
          errors.position_id
        }}</span>
      </div>

      <!-- Photo upload field -->
      <UploadFile
        :hasError="errors.photo"
        :errorMessage="'Please select a valid file.'"
        placeholder="Upload your photo"
        @file-selected="onFileSelected"
      />

      <!-- Submit button -->
      <div class="text-center pt-4">
        <ActionButton
          :label="isSubmitting ? 'Submitting...' : 'Sign Up'"
          :variant="isSubmitting ? 'secondary' : 'primary'"
          type="submit"
          :disabled="isSubmitting"
        />
      </div>

      <!-- Success message after registration -->
      <p v-if="success" class="text-green-600 text-center font-semibold">
        Registration successful!
      </p>
    </form>
  </section>
</template>

<script>
import { ref, onMounted } from "vue";
import { getPositions, getToken, registerUser } from "@/services/api";
import { ActionButton, UploadFile, InputControl } from "./shared";

export default {
  name: "RegistrationForm",
  emits: ["registered"], // Emits event when registration is successful
  components: {
    ActionButton,
    UploadFile,
    InputControl,
  },
  setup(_, { emit }) {
    // Form data
    const form = ref({
      name: "",
      email: "",
      phone: "",
      position_id: null,
      photo: null,
    });

    // Validation errors
    const errors = ref({});
    // List of available positions
    const positions = ref([]);
    // Submission state
    const isSubmitting = ref(false);
    // Success state
    const success = ref(false);

    // Handles file selection for photo upload
    const handleFileChange = (e) => {
      const file = e.target.files[0];
      form.value.photo = file;
    };

    // Validates form fields
    const validateForm = () => {
      errors.value = {};
      if (!form.value.name) errors.value.name = "Name is required";
      if (!form.value.email) errors.value.email = "Email is required";
      if (!form.value.phone) errors.value.phone = "Phone is required";
      if (!form.value.position_id)
        errors.value.position_id = "Position is required";
      if (!form.value.photo) errors.value.photo = "Photo is required";
      return Object.keys(errors.value).length === 0;
    };

    // Handles form submission
    const handleSubmit = async () => {
      if (!validateForm()) return;

      isSubmitting.value = true;
      try {
        // Get API token
        const token = await getToken();

        // Prepare form data for submission
        const formData = new FormData();
        formData.append("name", form.value.name);
        formData.append("email", form.value.email);
        formData.append("phone", form.value.phone);
        formData.append("position_id", form.value.position_id);
        formData.append("photo", form.value.photo);

        // Register user via API
        await registerUser(formData, token);
        success.value = true;

        // Reset form fields
        form.value = {
          name: "",
          email: "",
          phone: "",
          position_id: null,
          photo: null,
        };
        emit("registered"); // Notify parent to refresh user list
      } catch (error) {
        // Handle API validation errors
        if (error.response?.data?.fails) {
          errors.value = error.response.data.fails;
        } else {
          console.error("Registration error:", error);
        }
      } finally {
        isSubmitting.value = false;
      }
    };

    // Fetch available positions from API
    const fetchPositions = async () => {
      try {
        const res = await getPositions();
        positions.value = res.positions;
      } catch (error) {
        console.error("Failed to load positions:", error);
      }
    };

    // Fetch positions when component mounts
    onMounted(fetchPositions);

    // Expose state and methods to template
    return {
      form,
      errors,
      positions,
      isSubmitting,
      success,
      handleSubmit,
      handleFileChange,
      ActionButton,
    };
  },
};
</script>

<style scoped>
.input {
  @apply w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400;
}
</style>
