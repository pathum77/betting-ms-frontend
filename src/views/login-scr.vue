<template>
    <div class="h-screen p-5 flex justify-center items-center">
        <notifications />
        <Loading :loading="isLoading" />
        <div class="max-w-[400px] w-full">
            <img class="w-[150px] mb-10 mx-auto" src="../assets/logo/logo.png" alt="">
            <p class="mb-1 font-bold">Welcome!</p>
            <p class="mb-10 text-sm">Please sign-in to your account and start the adventure</p>
            <InputLabelText :id="'username'" :type="'text'" :label="'Username'" :value="username"
                :placeholder="'example@123'" :error="errors.username" @inputFieldValueChanged="usernameValueChanged" />
            <InputLabelText :id="'password'" :type="'password'" :label="'Password'" :value="username"
                :placeholder="'Enter your password'" :error="errors.username" @inputFieldValueChanged="passwordValueChanged" />
            <ButtonText class="w-full" :buttonText="'Login'" @clickEvent="login()" />
        </div>
    </div>
</template>
 
<script setup>
/* eslint-disable */
import { ref } from 'vue';
import store from '@/store/index';
import { useRouter } from 'vue-router';
import InputLabelText from '@/components/common/label-input-types/label-text.vue';
import ButtonText from '@/components/common/buttons/btn-text.vue';
import { loginUser } from '@/services/api/users.js';
import Loading from '@/components/common/loading-overlay-com.vue';
// import { swal } from '@/utils/helper';
import { useNotification } from "@kyvg/vue3-notification";

const { notify } = useNotification();

const router = useRouter();

const isLoading = ref(false);

const username = ref('admin');
const password = ref('12345678');
const errors = ref({
    username: '',
    password: '',
})

const usernameValueChanged = (val) => {
    username.value = val;
};

const passwordValueChanged = (val) => {
    password.value = val;
};

const validation = () => {
    if (username.value === '') {
        errors.value.username = 'Username is required!';
    } else {
        errors.value.username = '';
    }

    if (password.value === '') {
        errors.value.password = 'Password is required!';
    } else {
        errors.value.password = '';
    }
};

const login = async () => {
    isLoading.value = true;
    validation();

    if(errors.value.username === '' && errors.value.password === '') {
        const postData = {
            username: username.value,
            password: password.value,
        };

        try {
            const response = await loginUser(postData);
            store.dispatch('login', { token: response.data.token, role: response.data.role});
            router.push('/');
        } catch (error) {
            // swal(error.response.data.title, error.response.data.message, 'error', false, () => { router.push('/login') }, () => { }, () => { });
            notify({
            type: "error",
            title: error.response.data.title,
            text: error.response.data.message,
        });
        }
    }

    isLoading.value = false;
};

</script>