const Items = {
    template: `
        <div class="w-full max-w-5xl bg-neu-bg p-8 rounded-3xl shadow-neu-out mx-auto mt-6">
            <div class="flex justify-between items-center mb-10">
                <div>
                    <h2 class="text-2xl font-black text-neu-primary">Inventaris Barang</h2>
                    <p class="text-sm font-semibold text-gray-400 mt-1">Daftar produk dan stok gudang</p>
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
                                <th class="p-5">Nama Barang</th>
                                <th class="p-5">Kategori</th>
                                <th class="p-5">Stok</th>
                                <th class="p-5">Harga</th>
                                <th class="p-5 text-center">Aksi</th>
                            </tr>
                        </thead>
                        <tbody class="text-sm font-medium">
                            <tr v-for="(item, index) in items" :key="item.id" class="border-t border-gray-300/30 hover:bg-neu-bg/50 transition-colors">
                                <td class="p-5 text-gray-500">{{ index + 1 }}</td>
                                <td class="p-5 text-neu-primary">{{ item.name }}</td>
                                <td class="p-5 text-gray-500">{{ item.category_name }}</td>
                                <td class="p-5">
                                    <div class="px-4 py-1.5 rounded-xl text-center text-xs font-bold inline-block" :class="item.stock < 5 ? 'shadow-neu-in text-neu-danger' : 'shadow-neu-in text-neu-success'">
                                        {{ item.stock }} Unit
                                    </div>
                                </td>
                                <td class="p-5 text-gray-600 font-bold">Rp {{ Number(item.price).toLocaleString('id-ID') }}</td>
                                <td class="p-5 flex justify-center gap-3">
                                    <button @click="openEditModal(item)" class="text-neu-accent font-bold w-10 h-10 rounded-xl transition-all shadow-neu-out hover:shadow-neu-in active:shadow-neu-in flex items-center justify-center">
                                        ✏️
                                    </button>
                                    <button @click="deleteItem(item.id)" class="text-neu-danger font-bold w-10 h-10 rounded-xl transition-all shadow-neu-out hover:shadow-neu-in active:shadow-neu-in flex items-center justify-center">
                                        🗑️
                                    </button>
                                </td>
                            </tr>
                            <tr v-if="items.length === 0">
                                <td colspan="6" class="p-10 text-center text-gray-400 font-bold">Belum ada data barang.</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <!-- Neumorphic Modal -->
            <transition name="fade">
                <div v-if="showModal" class="fixed inset-0 bg-neu-bg/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
                    <div class="bg-neu-bg p-8 rounded-3xl shadow-neu-out w-full max-w-md border border-gray-200/50">
                        <h3 class="text-xl font-black text-neu-primary mb-6 text-center">{{ isEdit ? 'Edit Barang' : 'Form Barang' }}</h3>
                        <form @submit.prevent="saveItem" class="space-y-6">
                            <div>
                                <label class="block text-xs font-bold text-neu-primary uppercase mb-3 ml-2">Kategori</label>
                                <select v-model="form.category_id" required class="w-full px-5 py-3 rounded-2xl bg-neu-bg shadow-neu-in text-neu-primary font-bold focus:shadow-neu-in transition-all text-sm appearance-none">
                                    <option value="" disabled>Pilih Kategori</option>
                                    <option v-for="cat in categories" :key="cat.id" :value="cat.id">{{ cat.name }}</option>
                                </select>
                            </div>
                            <div>
                                <label class="block text-xs font-bold text-neu-primary uppercase mb-3 ml-2">Nama Barang</label>
                                <input type="text" v-model="form.name" required class="w-full px-5 py-3 rounded-2xl bg-neu-bg shadow-neu-in text-neu-primary font-bold focus:shadow-neu-in transition-all text-sm">
                            </div>
                            <div class="grid grid-cols-2 gap-6">
                                <div>
                                    <label class="block text-xs font-bold text-neu-primary uppercase mb-3 ml-2">Stok</label>
                                    <input type="number" v-model="form.stock" required class="w-full px-5 py-3 rounded-2xl bg-neu-bg shadow-neu-in text-neu-primary font-bold focus:shadow-neu-in transition-all text-sm">
                                </div>
                                <div>
                                    <label class="block text-xs font-bold text-neu-primary uppercase mb-3 ml-2">Harga</label>
                                    <input type="number" v-model="form.price" required class="w-full px-5 py-3 rounded-2xl bg-neu-bg shadow-neu-in text-neu-primary font-bold focus:shadow-neu-in transition-all text-sm">
                                </div>
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
        const items = Vue.ref([]);
        const categories = Vue.ref([]);
        const showModal = Vue.ref(false);
        const isEdit = Vue.ref(false);
        const editId = Vue.ref(null);
        const form = Vue.ref({ category_id: '', name: '', stock: 0, price: 0 });

        const fetchData = async () => {
            try {
                const resItem = await axios.get('/item');
                const resCat = await axios.get('/category');
                items.value = resItem.data.data || [];
                categories.value = resCat.data.data || [];
            } catch (error) {
                console.error(error);
            }
        };

        const openAddModal = () => {
            isEdit.value = false;
            editId.value = null;
            form.value = { category_id: '', name: '', stock: 0, price: 0 };
            showModal.value = true;
        };

        const openEditModal = (item) => {
            isEdit.value = true;
            editId.value = item.id;
            form.value = {
                category_id: item.category_id,
                name: item.name,
                stock: Number(item.stock),
                price: Number(item.price)
            };
            showModal.value = true;
        };

        const saveItem = async () => {
            try {
                if (isEdit.value) {
                    await axios.put('/item/' + editId.value, form.value);
                } else {
                    await axios.post('/item', form.value);
                }
                showModal.value = false;
                fetchData();
            } catch (error) {
                alert(isEdit.value ? 'Gagal mengubah barang' : 'Gagal menyimpan barang');
            }
        };

        const deleteItem = async (id) => {
            if (confirm('Yakin hapus barang ini?')) {
                try {
                    await axios.delete('/item/' + id);
                    fetchData();
                } catch (error) {
                    alert('Gagal menghapus barang');
                }
            }
        };

        Vue.onMounted(fetchData);

        return { items, categories, showModal, isEdit, form, openAddModal, openEditModal, saveItem, deleteItem };
    }
};
