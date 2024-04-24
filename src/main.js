import { createApp } from 'vue';
import App from '@/App.vue';
import store from './store';
import Router from '@/router/index';
import '@/assets/styles/tailwind.css';
import Notifications from '@kyvg/vue3-notification'

createApp(App)
.use(store)
.use(Router)
.use(Notifications)
.mount('#app')
