<script setup lang="ts">
import { useHead } from '@unhead/vue'

useHead({
  link: [
    {
      rel: 'preload',
      href: '/fonts/mdi/materialdesignicons-webfont.woff2',
      as: 'font',
      type: 'font/woff2',
      crossorigin: ''
    }
  ]
})
</script>

<template>
  <v-app>
    <NuxtPage />
    <VSnackbarQueue />
  </v-app>
</template>

<style>
html,
body,
#__nuxt {
  height: 100%;
  margin: 0;
  padding: 0;
}
</style>