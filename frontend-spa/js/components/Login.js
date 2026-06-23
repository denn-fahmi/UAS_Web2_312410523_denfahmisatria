const Login = {
    template: `
        <div class="w-full max-w-sm bg-neu-bg p-8 rounded-3xl shadow-neu-out mx-auto mt-20 flex flex-col items-center">
            
            <div class="w-20 h-20 shadow-neu-out rounded-full flex items-center justify-center text-neu-accent font-black text-4xl mb-6">
                I
            </div>

            <div class="text-center mb-8">
                <h2 class="text-2xl font-black text-neu-primary">Inventory Fahmi</h2>
                <p class="text-sm font-medium text-gray-400 mt-2">Soft UI Authenticator</p>
            </div>

            <div v-if="errorMessage" class="w-full mb-6 text-xs font-bold text-neu-danger shadow-neu-in p-4 rounded-xl text-center">
                {{ errorMessage }}
            </div>

            <form @submit.prevent="handleLogin" class="w-full space-y-6">
                <div>
                    <label class="block text-xs font-bold text-neu-primary uppercase tracking-wider mb-3 ml-1">Username</label>
                    <input type="text" v-model="form.username" class="w-full px-5 py-3 rounded-2xl bg-neu-bg shadow-neu-in text-neu-primary font-medium focus:shadow-neu-in transition-all text-sm" placeholder="admin" required>
                </div>
                <div>
                    <label class="block text-xs font-bold text-neu-primary uppercase tracking-wider mb-3 ml-1">Password</label>
                    <input type="password" v-model="form.password" class="w-full px-5 py-3 rounded-2xl bg-neu-bg shadow-neu-in text-neu-primary font-medium focus:shadow-neu-in transition-all text-sm" placeholder="••••••••" required>
                </div>
                
                <div class="pt-4">
                    <button type="submit" :disabled="isSubmitting" class="w-full text-neu-accent font-bold py-3.5 rounded-2xl transition-all shadow-neu-out hover:shadow-neu-in active:shadow-neu-in disabled:opacity-50 text-sm">
                        {{ isSubmitting ? 'Verifikasi...' : 'Masuk Sekarang' }}
                    </button>
                </div>
            </form>
        </div>
    `,
    setup() {
        const router = VueRouter.useRouter();
        const form = Vue.ref({ username: '', password: '' });
        const errorMessage = Vue.ref('');
        const isSubmitting = Vue.ref(false);

        const handleLogin = async () => {
            errorMessage.value = '';
            isSubmitting.value = true;
            try {
                const response = await axios.post('/login', form.value);
                
                if (response.data && response.data.token) {
                    localStorage.setItem('auth_token', response.data.token);
                    if(response.data.user) {
                        localStorage.setItem('username', response.data.user.username);
                    }
                    router.push('/dashboard');
                }
            } catch (error) {
                if (error.response && error.response.data && error.response.data.message) {
                    errorMessage.value = error.response.data.message;
                } else {
                    errorMessage.value = 'Gagal terhubung ke server.';
                }
            } finally {
                isSubmitting.value = false;
            }
        };

        return { form, errorMessage, isSubmitting, handleLogin };
    }
};
