import {
    createRouter,
    createWebHistory,
    Router,
    RouteRecordRaw,
} from 'vue-router';

import MainRouter from './main';

const routes = [
    ...MainRouter
] as RouteRecordRaw[];

const router: Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    history: createWebHistory(),
    routes,
});

export default router;
