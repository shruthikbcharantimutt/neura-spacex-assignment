<template>
  <div class="spinner-overlay">
    <div class="spinner-border text-success" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>
  </div>
</template>

<style scoped>
.spinner-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.8); /* Optional: Adds a semi-transparent background */
  z-index: 9999; /* Ensures the spinner is on top */
}
.spinner-border {
  width: 3rem;
  height: 3rem;
}
</style>
