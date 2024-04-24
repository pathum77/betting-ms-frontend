import { createWebHistory, createRouter } from 'vue-router';
import store from '@/store/index';
import Dashboard from '@/views/dashboard-scr.vue';
import AddDraw from '@/views/draws/add-draw-scr.vue';
import DrawHistory from '@/views/draws/draw-history-scr.vue';
import AddUser from '@/views/users/add-user-scr.vue';
import RegisteredUsers from '@/views/users/registered-users-scr.vue';
import AddBet from '@/views/bettings/add-bet-scr.vue';
import BetHistory from '@/views/bettings/bet-history-src.vue';
import Results from '@/views/results-scr.vue';
import Settings from '@/views/settings-scr.vue';
import Login from '@/views/login-scr.vue';

const routes = [
    {
        name: 'Dashboard',
        path: '/',
        component: Dashboard,
        meta: {
            title: 'Dashboard',
            requiresAuth: true,
            allowedRoles: ['admin', 'manager', 'agent']
        }
    },

    {
        name: 'Add a draw',
        path: '/add-draw',
        component: AddDraw,
        meta: {
            title: 'Add a draw',
            requiresAuth: true,
            allowedRoles: ['admin']
        }
    },

    {
        name: 'Draw history',
        path: '/draw-history',
        component: DrawHistory,
        meta: {
            title: 'Draw history',
            requiresAuth: true,
            allowedRoles: ['admin']
        }
    },

    {
        name: 'Add a user',
        path: '/add-user',
        component: AddUser,
        meta: {
            title: 'Add a user',
            requiresAuth: true,
            allowedRoles: ['admin', 'manager']
        }
    },

    {
        name: 'Registered users',
        path: '/registered-users',
        component: RegisteredUsers,
        meta: {
            title: 'Registered users',
            requiresAuth: true,
            allowedRoles: ['admin', 'manager']
        }
    },

    {
        name: 'Add a bet',
        path: '/add-bet',
        component: AddBet,
        meta: {
            title: 'Add a bet',
            requiresAuth: true,
            allowedRoles: ['admin', 'manager', 'agent']
        }
    },

    {
        name: 'Bet history',
        path: '/bets-history',
        component: BetHistory,
        meta: {
            title: 'Bet History',
            requiresAuth: true,
            allowedRoles: ['admin']
        }
    },

    {
        name: 'Results',
        path: '/results',
        component: Results,
        meta: {
            title: 'Results',
            requiresAuth: true,
            allowedRoles: ['admin']
        }
    },

    {
        name: 'Settings',
        path: '/settings',
        component: Settings,
        meta: {
            title: 'Settings',
            requiresAuth: true,
            allowedRoles: ['admin', 'manager', 'agent']
        }
    },

    {
        name: 'Login',
        path: '/login',
        component: Login,
        meta: {
            title: 'Login'
        }
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
    scrollBehavior() {
        return { top: 0 };
    }
});

router.beforeEach(async (to, from, next) => {
    const isLoggedIn = store.getters.isLoggedIn;
    const role = store.getters.role;

    if (to.matched.length === 0) {
        next('/');
    }
    else if (to.matched.some(record => record.meta.requiresAuth)) {
        if (!isLoggedIn) {
            next('/login');
        } else {
            if (role === null) {
                await store.dispatch('fetchRole');
            }

            if (to.matched.some(record => record.meta.allowedRoles.includes(role))) {
                next();
            } else {
                next('/');
            }
        }
    } else {
        if (isLoggedIn && to.path === '/login') {
            next('/');
        }
        else if (!isLoggedIn && to.path !== '/login') {
            next('/login');
        }
        else {
            next();
        }
    }
});


export default router;