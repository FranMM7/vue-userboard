<template>
  <!-- Registration form section -->
  <section class="py-10 px-4 max-w-2xl mx-auto">
    <div v-if="success" class="text-green-600 text-center font-semibold">
      <SuccessMessage />
    </div>
    <div v-else>
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
          helper-text="+380 (xx) xxx xxxx"
          mask="+999 (99) 999-9999"
          errorText="Phone is required"
          :hasError="errors.phone"
        />

        <!-- Position selection (radio buttons) -->
        <OptionSelect
          label="Select your position:"
          :options="positions"
          v-model="form.position_id"
          :required="true"
          :error="errors.position_id"
        />

        <!-- Photo upload field -->
        <UploadFile
          :hasError="!!errors.photo"
          :errorMessage="errors.photo || 'Please select a valid file.'"
          placeholder="Upload your photo"
          @file-selected="handleFile"
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
      </form>
    </div>
  </section>
</template>

<script>
import { ref, onMounted } from "vue";
import { getPositions, getToken, registerUser } from "@/services/api";
import {
  ActionButton,
  UploadFile,
  InputControl,
  OptionSelect,
  SuccessMessage,
} from "@/components/shared";

export default {
  name: "RegistrationForm",
  emits: ["registered"], // Emits event when registration is successful
  components: {
    ActionButton,
    UploadFile,
    InputControl,
    OptionSelect,
    SuccessMessage,
  },
  setup(_, { emit }) {
    // Reactive form data object
    const form = ref({
      name: "",
      email: "",
      phone: "",
      position_id: null,
      photo: null,
    });

    // Holds validation error messages for each field
    const errors = ref({});
    // Stores the list of available positions fetched from the API
    const positions = ref([]);
    // Indicates if the form is currently being submitted
    const isSubmitting = ref(false);
    // Indicates if the registration was successful
    const success = ref(false);

    // Handles file selection for the photo upload field
    const handleFile = (file) => {
      if (!file || !file.type.startsWith("image/")) {
        errors.value.photo = "Please select a valid image file.";
        return;
      }

      // Optional validation: maximum file size 2MB
      if (file.size > 2 * 1024 * 1024) {
        errors.value.photo = "File too large. Max 2MB.";
        return;
      }

      // Clear previous error and save the selected file
      errors.value.photo = null;
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

        // Reset success message after 2 seconds
        setTimeout(() => {
          success.value = false;
          scrollToSection("users"); // Scroll to user section after successful registration
        }, 2000);

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
      handleFile,
      ActionButton,
    };
  },
};

const scrollToSection = (sectionId) => {
  const el = document.getElementById(sectionId);
  if (el) {
    el.scrollIntoView({ behavior: "smooth" });
  }
};
</script>

<style scoped>
.input {
  @apply w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400;
}
</style>
