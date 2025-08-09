<script setup lang="ts">
  import Login from '@/components/Login/Login.vue'
  import AuthLayout from '@/layout/AuthLayout.vue'
</script>

<template>
  <AuthLayout
    heading="Welcome Back!"
    description="Access your files and manage your documents securely with our file management system."
    formHeading="Sign in to your account"
    formDescription="Enter your credentials to access your account"
  >
    <Login />
  </AuthLayout>
</template>

<style scoped></style>
