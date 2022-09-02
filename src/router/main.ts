import { RouteRecordRaw } from 'vue-router';

const MainRouter: RouteRecordRaw[] = [
    {
        path: '/',
        redirect: '/home'
    },
    {
        name: 'HomePage',
        path: '/home',
        component: () =>
            import(
                /*webpackChunkName "home-view"*/ '../views/home/Main.vue'
            ),
    },
];

export default MainRouter;