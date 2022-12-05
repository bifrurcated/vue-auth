<template>
  <main class="form-signin w-100 m-auto">
    <form @submit.prevent="submit">
      <h1 class="h3 mb-3 fw-normal">Please sign in</h1>

      <div class="form-floating">
        <input v-model="data.email" type="email" class="form-control" id="floatingInput" placeholder="name@example.com">
        <label for="floatingInput">Email address</label>
      </div>
      <div class="form-floating">
        <input v-model="data.password" type="password" class="form-control" id="floatingPassword" placeholder="Password">
        <label for="floatingPassword">Password</label>
      </div>

      <div class="mb-3">
        <router-link to="/forgot">forgot password?</router-link>
      </div>

      <button class="w-100 btn btn-lg btn-primary" type="submit">Sign in</button>
    </form>

    <div class="login-google mt-3">
      <GoogleLogin :callback="googleAuth" prompt/>
    </div>
  </main>
</template>

<script>
export default {
  name: "LoginForm",
}
</script>

<script setup>
import {reactive} from "vue";
import axios from "axios";

const data = reactive({
  email: '',
  password: ''
});

const emit = defineEmits(['loginData', 'success']);

const submit = async () => {
  const response = await axios.post('login', data, {withCredentials: true});

  await emit('loginData', response.data)
}


const googleAuth = async (response) => {
  const {status, data} = await axios.post('google-oauth2', {
    token: response.credential
  }, {withCredentials: true});

  axios.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;

  if (status === 200) {
    await emit('success');
  }
}

</script>

<style>
.login-google {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>