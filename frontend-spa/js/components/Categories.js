const Categories = {
    template: `
        <div class="w-full max-w-5xl bg-neu-bg p-8 rounded-3xl shadow-neu-out mx-auto mt-6">
            <div class="flex justify-between items-center mb-10">
                <div>
                    <h2 class="text-2xl font-black text-neu-primary">Kategori Produk</h2>
                    <p class="text-sm font-semibold text-gray-400 mt-1">Manajemen data kategori barang</p>
                </div>
                <button @click="openAddModal" class="text-neu-success font-bold px-6 py-3 rounded-2xl transition-all shadow-neu-out hover:shadow-neu-in active:shadow-neu-in flex items-center gap-2">
                    <span class="text-lg">➕</span> Tambah
                </button>
            </div>

            <div class="rounded-3xl shadow-neu-in p-2">
                <div class="overflow-x-auto rounded-2xl">
                    <table class="w-full text-left border-collapse">
                        <thead>
                            <tr class="text-neu-primary text-xs font-black uppercase tracking-wider">
                                <th class="p-5">No</th>
                                <th class="p-5">Nama Kategori</th>
                                <th class="p-5">Deskripsi</th>
                                <th class="p-5 text-center">Aksi</th>
                            </tr>
                        </thead>
                        <tbody class="text-sm font-medium">
                            <tr v-for="(cat, index) in categories" :key="cat.id" class="border-t border-gray-300/30 hover:bg-neu-bg/50 transition-colors">
                                <td class="p-5 text-gray-500">{{ index + 1 }}</td>
                                <td class="p-5 text-neu-primary">{{ cat.name }}</td>
                                <td class="p-5 text-gray-500">{{ cat.description || '-' }}</td>
                                <td class="p-5 flex justify-center gap-3">
                                    <button @click="deleteCategory(cat.id)" class="text-neu-danger font-bold w-10 h-10 rounded-xl transition-all shadow-neu-out hover:shadow-neu-in active:shadow-neu-in flex items-center justify-center">
                                        🗑️
                                    </button>
                                </td>
                            </tr>
                            <tr v-if="categories.length === 0">
                                <td colspan="4" class="p-10 text-center text-gray-400 font-bold">Belum ada data kategori.</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <!-- Neumorphic Modal -->
            <transition name="fade">
                <div v-if="showModal" class="fixed inset-0 bg-neu-bg/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
                    <div class="bg-neu-bg p-8 rounded-3xl shadow-neu-out w-full max-w-md border border-gray-200/50">
                        <h3 class="text-xl font-black text-neu-primary mb-6 text-center">Form Kategori</h3>
                        <form @submit.prevent="saveCategory" class="space-y-6">
                            <div>
                                <label class="block text-xs font-bold text-neu-primary uppercase mb-3 ml-2">Nama Kategori</label>
                                <input type="text" v-model="form.name" required class="w-full px-5 py-3 rounded-2xl bg-neu-bg shadow-neu-in text-neu-primary font-bold focus:shadow-neu-in transition-all text-sm">
                            </div>
                            <div>
                                <label class="block text-xs font-bold text-neu-primary uppercase mb-3 ml-2">Deskripsi</label>
                                <input type="text" v-model="form.description" class="w-full px-5 py-3 rounded-2xl bg-neu-bg shadow-neu-in text-neu-primary font-bold focus:shadow-neu-in transition-all text-sm">
                            </div>
                            <div class="flex gap-4 justify-end mt-8 pt-4 border-t border-gray-300/30">
                                <button type="button" @click="showModal = false" class="px-6 py-3 rounded-2xl text-neu-primary font-bold shadow-neu-out hover:shadow-neu-in active:shadow-neu-in transition-all">Batal</button>
                                <button type="submit" class="px-6 py-3 rounded-2xl text-neu-accent font-bold shadow-neu-out hover:shadow-neu-in active:shadow-neu-in transition-all">Simpan</button>
                            </div>
                        </form>
                    </div>
                </div>
            </transition>
        </div>
    `,
    setup() {
        const categories = Vue.ref([]);
        const showModal = Vue.ref(false);
        const form = Vue.ref({ name: '', description: '' });

        const fetchCategories = async () => {
            try {
                const response = await axios.get('/category');
                categories.value = response.data.data || [];
            } catch (error) {
                console.error(error);
            }
        };

        const openAddModal = () => {
            form.value = { name: '', description: '' };
            showModal.value = true;
        };

        const saveCategory = async () => {
            try {
                await axios.post('/category', form.value);
                showModal.value = false;
                fetchCategories();
            } catch (error) {
                alert('Gagal menyimpan kategori');
            }
        };

        const deleteCategory = async (id) => {
            if (confirm('Yakin hapus kategori ini?')) {
                try {
                    await axios.delete('/category/' + id);
                    fetchCategories();
                } catch (error) {
                    alert('Gagal menghapus kategori');
                }
            }
        };

        Vue.onMounted(fetchCategories);

        return { categories, showModal, form, openAddModal, saveCategory, deleteCategory };
    }
};
