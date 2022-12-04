<template>
  <LoginForm @login-data="setLoginData" @success="success" v-if="loginData.id === 0"/>
  <AuthenticatorForm :login-data="loginData" @success="success" v-else/>
</template>

<script lang="ts">
export default {
  name: "LoginView"
}
</script>

<script setup lang="ts">
import {useRouter} from "vue-router";
import LoginForm from "@/views/login/LoginForm.vue";
import AuthenticatorForm from "@/views/login/AuthenticatorForm.vue";
import {reactive} from "vue";
import {useStore} from "vuex";

const router = useRouter();
const store = useStore();
const loginData = reactive({
  id: 0,
  secret: '',
  otpauth_url: ''
});

const setLoginData = (data: { id: number, secret: string, otpauth_url: string }) => {
  loginData.id = data.id;

  if (data.secret) {
    loginData.secret = data.secret;
    loginData.otpauth_url = data.otpauth_url;
  }
}

const success = async () => {
  await store.dispatch('setAuth', true);
  await router.push('/');
}

</script>