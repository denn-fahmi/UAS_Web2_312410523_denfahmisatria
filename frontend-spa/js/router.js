const routes = [
    { path: '/', redirect: '/login' },
    { path: '/login', component: Login },
    { 
        path: '/dashboard', 
        component: Dashboard, 
        meta: { requiresAuth: true } 
    },
    { 
        path: '/categories', 
        component: Categories, 
        meta: { requiresAuth: true } 
    },
    { 
        path: '/items', 
        component: Items, 
        meta: { requiresAuth: true } 
    }
];

const router = VueRouter.createRouter({
    history: VueRouter.createWebHashHistory(),
    routes
});

// Navigation Guard (Client-Side Security)
router.beforeEach((to, from, next) => {
    const isAuthenticated = localStorage.getItem('auth_token');

    if (to.meta.requiresAuth && !isAuthenticated) {
        next('/login');
    } else if (to.path === '/login' && isAuthenticated) {
        next('/dashboard');
    } else {
        next();
    }
});
