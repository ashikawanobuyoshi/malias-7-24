// src/main.js
import {createApp} from 'vue';
import App from './App.vue';
import router from './router'; // ここでルーターを読み込む

const app = createApp (App);

app.use (router); // Vue アプリにルーターを登録
app.mount ('#app');
