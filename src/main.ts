import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './interceptors/axios'

import vue3GoogleLogin from 'vue3-google-login'

const app = createApp(App)

app.use(vue3GoogleLogin, {
    clientId: 'YOUR_CLIENT_ID.apps.googleusercontent.com'
})

app
    .use(store)
    .use(router)
    .mount('#app')
