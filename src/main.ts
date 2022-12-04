import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './interceptors/axios'

import vue3GoogleLogin from 'vue3-google-login'

const app = createApp(App)

app.use(vue3GoogleLogin, {
    clientId: '888732665747-s3eqbvab8r7sv7ddfiur0rr5b176jheo.apps.googleusercontent.com'
})

app
    .use(store)
    .use(router)
    .mount('#app')
