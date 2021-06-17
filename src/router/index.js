import App from '@/App';
import VueRouter from 'vue-router';

const routes = [
  { path: '/', component: App }
];

const router =new VueRouter({ routes });

export default router;
