const Navbar = {
    template: `
        <header class="bg-neu-bg py-4 px-8 flex justify-between items-center shadow-neu-sm mb-6 rounded-b-3xl">
            <div class="flex items-center gap-3">
                <div class="w-10 h-10 shadow-neu-out rounded-full flex items-center justify-center text-neu-accent font-black text-xl">
                    I
                </div>
                <h1 class="text-xl font-bold tracking-wide text-neu-primary">Inventory<span class="text-neu-accent">Fahmi</span></h1>
            </div>
            
            <nav class="hidden md:flex gap-6 items-center">
                <router-link to="/dashboard" class="px-5 py-2 rounded-xl text-neu-primary font-semibold transition-all shadow-neu-sm hover:shadow-neu-in active:shadow-neu-in">Dashboard</router-link>
                <router-link to="/categories" class="px-5 py-2 rounded-xl text-neu-primary font-semibold transition-all shadow-neu-sm hover:shadow-neu-in active:shadow-neu-in">Kategori</router-link>
                <router-link to="/items" class="px-5 py-2 rounded-xl text-neu-primary font-semibold transition-all shadow-neu-sm hover:shadow-neu-in active:shadow-neu-in">Barang</router-link>
            </nav>

            <div class="flex items-center gap-6">
                <div class="flex items-center gap-2 shadow-neu-in px-4 py-2 rounded-full">
                    <span class="text-sm font-bold text-neu-accent">👤 {{ username }}</span>
                </div>
                <button @click="logout" class="text-neu-danger font-bold px-5 py-2 rounded-xl transition-all shadow-neu-sm hover:shadow-neu-in active:shadow-neu-in">
                    Keluar
                </button>
            </div>
        </header>
    `,
    setup() {
        const router = VueRouter.useRouter();
        const username = Vue.ref(localStorage.getItem('username') || 'Admin');

        const logout = () => {
            localStorage.removeItem('auth_token');
            localStorage.removeItem('username');
            router.push('/login');
        };

        return { username, logout };
    }
};
