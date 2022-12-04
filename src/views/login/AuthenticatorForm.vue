<template>
  <main class="form-signin w-100 m-auto">
    <form @submit.prevent="submit">
      <h1 class="h3 mb-3 fw-normal">Please insert your authenticator code</h1>

      <div class="form-floating">
        <input v-model="code" class="form-control" id="floatingInput" placeholder="6 digits code">
        <label for="floatingInput">6 digits code</label>
      </div>

      <button class="w-100 btn btn-lg btn-primary mt-3" type="submit">Submit</button>
    </form>

    <img :src="img" class="w-100" v-if="img" alt="qrcode"/>
  </main>
</template>

<script lang="ts">
export default {
  name: "AuthenticatorForm"
}
</script>

<script setup lang="ts">
import {ref} from "vue";
import axios from "axios";
import qrcode from "qrcode";

const props = defineProps<{
  loginData: {otpauth_url: string}
}>()

const emit = defineEmits(['success']);

const code = ref('');
const img = ref<string | null>(null);

if (props.loginData.otpauth_url) {
  qrcode.toDataURL(props.loginData.otpauth_url, (err, data) => {
    img.value = data;
  });
}

const submit = async () => {
  const {data, status} = await axios.post('/two-factor', {
    ...props.loginData,
    code: code.value
  }, {withCredentials: true});
  
  axios.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;

  if (status === 200) {
    await emit('success');
  }
}

</script>