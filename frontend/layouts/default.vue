<!-- layouts/default.vue -->
<template>
  <div class="min-vh-100">
    <header>
      <div class="navbar navbar-dark bg-dark shadow-sm">
        <div class="container d-flex justify-content-between">
          <NuxtLink href="/" class="navbar-brand d-flex align-items-center">
            <strong>SpaceX</strong>
          </NuxtLink>
        </div>
      </div>
    </header>
    <main>
      <NuxtPage />
    </main>
  </div>
</template>
