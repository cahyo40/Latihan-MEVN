<template>
  <Header />
</template>

<script setup>
import Header from './layouts/Header.vue'
import customFetch from './api'
import { onMounted } from 'vue'
const test = async () => {
  const res = await customFetch.get('/test')
  console.log(res)
}

onMounted(() => {
  test()
})
</script>
