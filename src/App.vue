<script setup lang="ts">
import Employee from './components/Employee.vue';
import { Suspense } from 'vue';
</script>

<template>
  <div class="light:text-black dark:text-white">
    <Suspense>
      <Employee/>
    </Suspense>
  </div>
</template>
