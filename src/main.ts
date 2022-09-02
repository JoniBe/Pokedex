import { createApp } from 'vue'
import App from './App.vue'
import './assets/css/style.css'

import router from './router/router'
import { createPinia } from 'pinia';

const app = createApp(App);

app.use(router);
app.use(createPinia());

app.mount('#app');
