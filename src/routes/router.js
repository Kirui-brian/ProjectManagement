import Vue from 'vue';
import VueRouter from 'vue-router';
import ProjectsView from '@/views/ProjectsView.vue';

Vue.use(VueRouter);

const routes = [
    {
        path: '/projects',
        name: 'ProjectsView',
        component: ProjectsView,
    },
];

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes,
});

export default router;
