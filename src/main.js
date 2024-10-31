import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store/store-init';
import './assets/styles.css'; // Import global styles

const app = createApp(App);

app.use(store);
app.use(router);

app.mount('#app');
