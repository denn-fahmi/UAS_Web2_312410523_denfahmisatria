const Dashboard = {
    template: `
        <div class="w-full max-w-5xl bg-neu-bg p-8 rounded-3xl shadow-neu-out mx-auto mt-6">
            <div class="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h2 class="text-3xl font-black text-neu-primary mb-2">Selamat Datang, <span class="text-neu-accent">{{ username }}</span>!</h2>
                    <p class="text-sm font-semibold text-gray-500">Overview sistem manajemen inventaris Anda.</p>
                </div>
                <div class="w-16 h-16 shadow-neu-in rounded-full flex items-center justify-center text-neu-primary font-bold text-2xl">
                    📊
                </div>
            </div>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                <!-- Card 1 -->
                <div class="bg-neu-bg rounded-3xl p-8 shadow-neu-out flex flex-col items-center justify-center transition-all hover:shadow-neu-in cursor-pointer">
                    <div class="w-20 h-20 shadow-neu-in rounded-full flex items-center justify-center mb-6">
                        <span class="text-3xl">📁</span>
                    </div>
                    <h3 class="text-neu-primary font-bold text-xl mb-3">Total Kategori</h3>
                    <div class="w-full h-1 bg-neu-bg shadow-neu-in rounded-full mb-4"></div>
                    <p class="text-5xl font-black text-neu-accent">{{ categoriesCount }}</p>
                </div>
                
                <!-- Card 2 -->
                <div class="bg-neu-bg rounded-3xl p-8 shadow-neu-out flex flex-col items-center justify-center transition-all hover:shadow-neu-in cursor-pointer">
                    <div class="w-20 h-20 shadow-neu-in rounded-full flex items-center justify-center mb-6">
                        <span class="text-3xl">📦</span>
                    </div>
                    <h3 class="text-neu-primary font-bold text-xl mb-3">Total Barang</h3>
                    <div class="w-full h-1 bg-neu-bg shadow-neu-in rounded-full mb-4"></div>
                    <p class="text-5xl font-black text-neu-success">{{ itemsCount }}</p>
                </div>
            </div>
        </div>
    `,
    setup() {
        const username = Vue.ref(localStorage.getItem('username') || 'Admin');
        const categoriesCount = Vue.ref(0);
        const itemsCount = Vue.ref(0);

        const fetchData = async () => {
            try {
                const resCat = await axios.get('/category');
                const resItem = await axios.get('/item');
                
                categoriesCount.value = resCat.data.data ? resCat.data.data.length : 0;
                itemsCount.value = resItem.data.data ? resItem.data.data.length : 0;
            } catch (error) {
                console.error("Gagal mengambil data dashboard", error);
            }
        };

        Vue.onMounted(fetchData);

        return { username, categoriesCount, itemsCount };
    }
};
