import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import router from './router';

// Toast
import { Toast } from 'vant';
import 'vant/es/toast/style';
// Dialog
import { Dialog } from 'vant';
import 'vant/es/dialog/style';
// Notify
import { Notify } from 'vant';
import 'vant/es/notify/style';

const app = createApp(App);
app.use(router);
app.config.globalProperties.$Toast = Toast;
app.config.globalProperties.$Dialog = Dialog;
app.config.globalProperties.$Notify = Notify;

app.mount('#app');
