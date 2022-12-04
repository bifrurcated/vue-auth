<template>
  <div class="container mt-5 text-center">
    <h3>{{ message }}</h3>
  </div>
</template>

<script lang="ts">
export default {
  name: "HomeView"
}
</script>

<script setup lang="ts">

import {computed, onMounted} from "vue";
import axios from "axios";
import {useStore} from "vuex";

const store = useStore();
const message = computed(() => store.state.message);

onMounted(async () => {
  try{
    const {data} = await axios.get('user');

    await store.dispatch('setMessage', `Hi ${data.first_name} ${data.last_name}`);

    await store.dispatch('setAuth', true);
  } catch (err) {
    await store.dispatch('setAuth', false);
    await store.dispatch('setMessage', 'You are not logged in');
  }
});

</script>