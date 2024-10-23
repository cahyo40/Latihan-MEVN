<template>
  <h1>Test</h1>
  <p>{{ data.message }}</p>
</template>

<script setup>
import axios from 'axios';
import { ref, onMounted } from 'vue'


const data = ref(null);

const fetchData = async () => {
  try {
    const response = await axios.get('http://localhost:3000/');
    data.value = response.data;
    console.log(data.value);
  } catch (error) {
    console.log(error);
  }
}

onMounted(async () => {
  fetchData();
});

</script>
