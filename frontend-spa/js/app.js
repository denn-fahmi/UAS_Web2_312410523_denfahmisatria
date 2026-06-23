// KONFIGURASI AXIOS GLOBAL
axios.defaults.baseURL = 'http://localhost:8080';

// Axios Request Interceptor
axios.interceptors.request.use(config => {
    const token = localStorage.getItem('auth_token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, error => {
    return Promise.reject(error);
});

// Axios Response Interceptor
axios.interceptors.response.use(response => {
    return response;
}, error => {
    if (error.response && error.response.status === 401) {
        // Token tidak valid atau kedaluwarsa
        localStorage.removeItem('auth_token');
        localStorage.removeItem('username');
        alert("Sesi Anda telah habis. Silakan login kembali.");
        window.location.hash = '#/login';
    }
    return Promise.reject(error);
});

// INISIALISASI VUE APP
const app = Vue.createApp({
    setup() {
        const route = VueRouter.useRoute();
        const isLoginPage = Vue.computed(() => route.path === '/login');

        return { isLoginPage };
    }
});

// Register Global Component
app.component('navbar-component', Navbar);

// Gunakan Router
app.use(router);

// Mount App
app.mount('#app');
