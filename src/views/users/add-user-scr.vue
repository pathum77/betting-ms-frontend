<template>
    <div class="container-w-full mt-[70px]">
        <loading :loading="isLoading" />
        <notifications />
        <div class="forground-container">
            <div class="forground">
                <mdText :text="'Add a new user'" />
                <div class="form-grid-res">
                    <labelText :id="'first_name'" :label="'First Name'" :value="userData.firstName" :placeholder="'John'"
                        :error="errors.firstName" @input-field-value-changed="firstNameValueChanged" />
                    <labelText :id="'last_name'" :label="'Last Name'" :value="userData.lastName" :placeholder="'Porter'"
                        :error="errors.lastName" @input-field-value-changed="lastNameValueChanged" />
                </div>
                <div class="hr"></div>
                <div class="form-grid-res">
                    <labelSelect :id="'user_role'" :label="'User Role'" :value="userData.role" :options="userRoles"
                        :extra-option="{ name: 'Select an option', value: '', isVisible: true }" :error="errors.role"
                        @input-field-value-changed="userRoleValueChanged" />
                    <labelText :id="'creditLimit'" :label="`Credit Limit (${CONSTANTS.CURRECNCY_TYPE})`" :value="userData.creditLimit" :placeholder="'10000'"
                        :error="errors.creditLimit" @input-field-value-changed="creditLimitValueChanged" />
                </div>
                <div class="hr"></div>
                <div class="form-grid-res">
                    <labelText :id="'username'" :label="'Username'" :value="userData.role" :placeholder="'johnporter'"
                        :error="errors.username" @input-field-value-changed="usernameValueChanged" />
                    <labelText :id="'password'" :label="'Password'" :value="userData.password"
                        :placeholder="'with 6 or more characters'" :error="errors.password"
                        @input-field-value-changed="passwordValueChanged" />
                    <labelText :id="'password_confirm'" :label="'Re-type password'" :value="userData.passwordRepeat"
                        :placeholder="'repeat the password'" :error="errors.passwordRepeat"
                        @input-field-value-changed="passwordRepeatValueChanged" />
                </div>
                <div class="form-grid-res">
                    <btnText @click-event="addNewUser()" />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
/* eslint-disable */
import { ref, onMounted } from 'vue';
import mdText from '@/components/common/titles/md-text.vue';
import labelText from '@/components/common/label-input-types/label-text.vue';
import labelSelect from '@/components/common/label-input-types/label-select.vue';
import btnText from '@/components/common/buttons/btn-text.vue';
import loading from '@/components/common/loading-overlay-com.vue';
import store from '@/store/index';
import { addManager, addAgent } from '@/services/api/users';
import { useNotification } from "@kyvg/vue3-notification";
import { CONSTANTS } from '@/utils/constants';

const { notify } = useNotification();

const isLoading = ref(false);
const userData = ref({
    firstName: '',
    lastName: '',
    role: '',
    creditLimit: '',
    username: '',
    password: '',
    passwordRepeat: ''
});
const errors = ref({
    firstName: '',
    lastName: '',
    role: '',
    creditLimit: '',
    username: '',
    password: '',
    passwordRepeat: ''
});
const userRoles = ref([]);

onMounted(() => {
    setUserRoles();
});

const setUserRoles = async () => {
    const role = store.getters.role;
    if (role === 'admin') {
        userRoles.value = [
            { id: 'manager', name: 'Manager' },
            { id: 'agent', name: 'Agent' },
        ];
    } else if (role === 'manager') {
        userRoles.value = [
            { id: 'agent', name: 'Agent' },
        ];
    } else {
        userRoles.value = [];
    }
};

const firstNameValueChanged = (val) => {
    userData.value.firstName = val;
    errors.value.firstName = '';
};

const lastNameValueChanged = (val) => {
    userData.value.lastName = val;
    errors.value.lastName = '';
};

const userRoleValueChanged = (val) => {
    userData.value.role = val;
    errors.value.role = '';
};

const creditLimitValueChanged = (val) => {
    userData.value.creditLimit = val;
    errors.value.creditLimit = '';
};

const usernameValueChanged = (val) => {
    userData.value.username = val;
    errors.value.username = '';
};

const passwordValueChanged = (val) => {
    userData.value.password = val;
    errors.value.password = '';
};

const passwordRepeatValueChanged = (val) => {
    userData.value.passwordRepeat = val;
    errors.value.passwordRepeat = '';
};

const validation = () => {
    if (userData.value.firstName === '') {
        errors.value.firstName = 'First name is required!';
    } else {
        errors.value.firstName = '';
    }

    if (userData.value.lastName === '') {
        errors.value.lastName = 'Last name is required!';
    } else {
        errors.value.lastName = '';
    }

    if (userData.value.role === '') {
        errors.value.role = 'User role is required!';
    } else if (userData.value.role !== 'manager' && userData.value.role !== 'agent') {
        errors.value.role = 'Invalid user role!.';
    } else {
        errors.value.lastName = '';
    }

    if (userData.value.creditLimit === '') {
        errors.value.creditLimit = 'Credit limit is required!';
    } else if(/[^0-9]/.test(userData.value.creditLimit)) {
        errors.value.creditLimit = 'Invalid credit limit!';
    } else {
        errors.value.creditLimit = '';
    }

    if (userData.value.username === '') {
        errors.value.username = 'Username name is required!';
    } else {
        errors.value.username = '';
    }

    if (userData.value.password === '') {
        errors.value.password = 'Password is required!';
    } else if (userData.value.password.length < 8) {
        errors.value.password = 'Password must be 6 or more characters!'
    } else {
        errors.value.password = '';
    }

    if (userData.value.passwordRepeat === '') {
        errors.value.passwordRepeat = 'Password confirmation is required!';
    } else if (userData.value.password !== userData.value.passwordRepeat) {
        errors.value.passwordRepeat = 'Password confirmation did not matched with the password!'
    } else {
        errors.value.passwordRepeat = '';
    }
};

const addNewUser = async () => {
    isLoading.value = true;
    try {
        validation();
        if (!errors.value.firstName && !errors.value.lastName && !errors.value.role && !errors.value.username && !errors.value.password && !errors.value.passwordRepeat) {
            const postData = {
                firstName: userData.value.firstName,
                lastName: userData.value.lastName,
                role: userData.value.role,
                username: userData.value.username,
                password: userData.value.password,
            };
            if (userData.value.role === 'manager') {
                const response = await addManager(postData);
                notify({
                    type: "success",
                    title: response.data.title,
                    text: response.data.message,
                });
            } else {
                const response = await addAgent(postData);
                notify({
                    type: "success",
                    title: response.data.title,
                    text: response.data.message,
                });
            }
            userData.value.firstName = '';
            userData.value.lastName = '';
            userData.value.role;
            userData.value.username = '';
            userData.value.password = '';
            userData.value.passwordRepeat = '';
        }
    } catch (error) {
        notify({
            type: "error",
            title: error.response.data.title,
            text: error.response.data.message,
        });
    }
    isLoading.value = false;
};

</script>