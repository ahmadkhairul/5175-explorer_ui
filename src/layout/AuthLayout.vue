<script setup lang="ts">
defineProps<{
  heading: string
  description: string
  formHeading: string
  formDescription: string
}>()
</script>

<template>
  <div class="container">
    <!-- Left Section -->
    <div class="left-section">
      <div class="content">
        <h2 class="heading">{{ heading }}</h2>
        <p class="description">{{ description }}</p>
        <div class="icon">📄</div>
      </div>
    </div>

    <!-- Right Section -->
    <div class="right-section">
      <div class="wrapper">
        <h2 class="form-heading">{{ formHeading }}</h2>
        <p class="form-description">{{ formDescription }}</p>
        <slot />
      </div>
    </div>
  </div>
</template>

<style scoped>
/* styling tetap sama seperti versi kamu */
.container {
  display: flex;
  min-height: 100vh;
  background-color: white;
}

.left-section {
  display: none;
}

@media (min-width: 768px) {
  .left-section {
    display: flex;
    width: 50%;
    align-items: center;
    justify-content: center;
    background: linear-gradient(to bottom, #6366f1, #3b82f6);
    color: white;
    padding: 2rem;
  }
}

.content {
  max-width: 36rem;
  text-align: center;
}

.heading {
  font-size: 2.25rem;
  font-weight: bold;
  margin-bottom: 1rem;
}

.description {
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
}

.icon {
  font-size: 3.75rem;
}

.right-section {
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
  padding: 2rem;
}

@media (min-width: 768px) {
  .right-section {
    width: 50%;
  }
}

.wrapper {
  width: 100%;
  max-width: 28rem;
}

.form-heading {
  font-size: 1.5rem;
  font-weight: bold;
  color: #1f2937;
  margin-bottom: 0.5rem;
}

.form-description {
  font-size: 0.875rem;
  color: #6b7280;
  margin-bottom: 1.5rem;
}
</style>
