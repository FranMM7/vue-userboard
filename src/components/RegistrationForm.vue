<template>
  <section class="py-10 px-4 max-w-2xl mx-auto">
    <h2 class="text-2xl font-bold text-center mb-6">Working with POST request</h2>

    <form @submit.prevent="handleSubmit" class="space-y-6">
      <!-- Name -->
      <input
        v-model="form.name"
        type="text"
        placeholder="Your name"
        class="input"
      />
      <span v-if="errors.name" class="text-red-500 text-sm">{{ errors.name }}</span>

      <!-- Email -->
      <input
        v-model="form.email"
        type="email"
        placeholder="Email"
        class="input"
      />
      <span v-if="errors.email" class="text-red-500 text-sm">{{ errors.email }}</span>

      <!-- Phone -->
      <input
        v-model="form.phone"
        type="tel"
        placeholder="+380XXXXXXXXX"
        class="input"
      />
      <span v-if="errors.phone" class="text-red-500 text-sm">{{ errors.phone }}</span>

      <!-- Positions -->
      <div>
        <p class="mb-2 font-semibold">Select your position:</p>
        <div class="space-y-2">
          <label v-for="pos in positions" :key="pos.id" class="flex items-center gap-2">
            <input
              type="radio"
              :value="pos.id"
              v-model="form.position_id"
              required
            />
            {{ pos.name }}
          </label>
        </div>
        <span v-if="errors.position_id" class="text-red-500 text-sm">{{ errors.position_id }}</span>
      </div>

      <!-- Photo -->
      <input
        type="file"
        accept="image/jpeg,image/jpg"
        @change="handleFileChange"
        class="input"
      />
      <span v-if="errors.photo" class="text-red-500 text-sm">{{ errors.photo }}</span>

      <!-- Submit -->
      <div class="text-center">
        <button
          type="submit"
          class="bg-yellow-400 hover:bg-yellow-300 text-black font-semibold py-2 px-6 rounded"
          :disabled="isSubmitting"
        >
          {{ isSubmitting ? 'Submitting...' : 'Sign Up' }}
        </button>
      </div>

      <!-- Success Message -->
      <p v-if="success" class="text-green-600 text-center font-semibold">
        Registration successful!
      </p>
    </form>
  </section>
</template>

<script>
import { ref, onMounted } from 'vue';
import { getPositions, getToken, registerUser } from '@/services/api';

export default {
  name: 'RegistrationForm',
  emits: ['registered'],
  setup(_, { emit }) {
    const form = ref({
      name: '',
      email: '',
      phone: '',
      position_id: null,
      photo: null,
    });

    const errors = ref({});
    const positions = ref([]);
    const isSubmitting = ref(false);
    const success = ref(false);

    const handleFileChange = (e) => {
      const file = e.target.files[0];
      form.value.photo = file;
    };

    const validateForm = () => {
      errors.value = {};
      if (!form.value.name) errors.value.name = 'Name is required';
      if (!form.value.email) errors.value.email = 'Email is required';
      if (!form.value.phone) errors.value.phone = 'Phone is required';
      if (!form.value.position_id) errors.value.position_id = 'Position is required';
      if (!form.value.photo) errors.value.photo = 'Photo is required';
      return Object.keys(errors.value).length === 0;
    };

    const handleSubmit = async () => {
      if (!validateForm()) return;

      isSubmitting.value = true;
      try {
        const token = await getToken();

        const formData = new FormData();
        formData.append('name', form.value.name);
        formData.append('email', form.value.email);
        formData.append('phone', form.value.phone);
        formData.append('position_id', form.value.position_id);
        formData.append('photo', form.value.photo);

        await registerUser(formData, token);
        success.value = true;

        // Reset form
        form.value = {
          name: '',
          email: '',
          phone: '',
          position_id: null,
          photo: null,
        };
        emit('registered'); // notify parent (e.g. to refresh user list)
      } catch (error) {
        if (error.response?.data?.fails) {
          errors.value = error.response.data.fails;
        } else {
          console.error('Registration error:', error);
        }
      } finally {
        isSubmitting.value = false;
      }
    };

    const fetchPositions = async () => {
      try {
        const res = await getPositions();
        positions.value = res.positions;
      } catch (error) {
        console.error('Failed to load positions:', error);
      }
    };

    onMounted(fetchPositions);

    return {
      form,
      errors,
      positions,
      isSubmitting,
      success,
      handleSubmit,
      handleFileChange,
    };
  },
};
</script>

<style scoped>
.input {
  @apply w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400;
}
</style>
