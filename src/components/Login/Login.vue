<script setup lang="ts">
import { useLoginForm } from '@/composition/useLogin'

const {
  username,
  password,
  rememberMe,
  message,
  handleLogin,
} = useLoginForm()
</script>

<template>
  <p v-if="message" class="error">{{ message }}</p>

  <form @submit.prevent="handleLogin">
    <div class="form-group">
      <label class="label">Username</label>
      <input
        type="text"
        v-model="username"
        placeholder="username"
        class="input"
        required
      />
    </div>

    <div class="form-group">
      <label class="label">Password</label>
      <input
        type="password"
        v-model="password"
        placeholder="••••••••"
        class="input"
        required
      />
    </div>

    <div class="form-remember">
      <input
        type="checkbox"
        v-model="rememberMe"
        id="remember"
        class="checkbox"
      />
      <label for="remember" class="remember-label">Remember me</label>
    </div>

    <button type="submit" class="submit-button">
      Sign in
    </button>

    <p class="footer-text">
      Don’t have an account?
      <a href="#" class="signup-link">Sign up</a>
    </p>
  </form>
</template>

<style scoped>
.error {
  font-size: 0.875rem;
  color: #ef4444;
  margin-bottom: 1.5rem;
}

.form-group {
  margin-bottom: 1rem;
}

.label {
  display: block;
  font-size: 0.875rem;
  font-weight: 500;
  color: #374151;
  margin-bottom: 0.25rem;
}

.input {
  width: 100%;
  padding: 0.5rem 1rem;
  border: 1px solid #d1d5db;
  border-radius: 0.5rem;
  background-color: white;
  font-size: 0.875rem;
  color: #1f2937;
  outline: none;
}

.input:focus {
  border-color: #3b82f6;
  box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.5);
}

.form-remember {
  display: flex;
  align-items: center;
  margin-bottom: 1.5rem;
}

.checkbox {
  margin-right: 0.5rem;
}

.remember-label {
  font-size: 0.875rem;
  color: #374151;
}

.submit-button {
  width: 100%;
  background-color: white;
  border: 1px solid #3b82f6;
  color: #3b82f6;
  font-weight: 600;
  padding: 0.5rem;
  border-radius: 0.5rem;
  transition: all 0.3s;
  cursor: pointer;
}

.submit-button:hover {
  background-color: #3b82f6;
  color: white;
}

.footer-text {
  margin-top: 1rem;
  font-size: 0.875rem;
  text-align: center;
  color: #4b5563;
}

.signup-link {
  color: #2563eb;
  text-decoration: underline;
  margin-left: 0.25rem;
}
</style>
