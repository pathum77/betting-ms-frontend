<template>
    <div class="container-w-full min-h-screen pt-24">
        <loading :loading="isLoading" />
        <notifications />
        <div class="px-[5px] md:px-[15px] mb-10">
            <div class="flex items-center">
                <Icon class="w-5 h-5 mr-3" icon="material-symbols:lock" />
                <span class="">Security</span>
            </div>
            <div class="mt-5 container py-10 rounded-md bg-fg-light dark:bg-fg-dark">
                <mdText :text="'Password Change'" />
                <div class="grid gap-4 grid-cols-1 sm:grid-cols-2">
                    <labelText :id="'oldPassword'" :type="inputType.oldPassword" :label="'Old Password'"
                        :value="oldPassword" :placeholder="''" :error="errors.oldPassword"
                        :postfix-icon="inputType.oldPassword === 'password' ? 'fluent:eye-show-16-regular' : 'fluent:eye-hide-20-regular'"
                        @input-field-value-changed="passwordValuechanged" @iconClick="changeinputTypeIcon" />
                </div>
                <div class="grid gap-4 grid-cols-1 sm:grid-cols-2">
                    <labelText :id="'newPassword'" :type="inputType.newPassword" :label="'New Password'"
                        :value="newPassword" :placeholder="''" :error="errors.newPassword"
                        :postfix-icon="inputType.newPassword === 'password' ? 'fluent:eye-show-16-regular' : 'fluent:eye-hide-20-regular'"
                        @input-field-value-changed="newPasswordValuechanged" @iconClick="changeinputTypeIcon" />
                    <labelText :id="'confirmPassword'" :type="inputType.confirmPassword" :label="'Password Confirm'"
                        :value="confirmPassword" :placeholder="''" :error="errors.confirmPassword"
                        :postfix-icon="inputType.confirmPassword === 'password' ? 'fluent:eye-show-16-regular' : 'fluent:eye-hide-20-regular'"
                        @input-field-value-changed="passwordConfirmValuechanged" @iconClick="changeinputTypeIcon" />
                </div>
                <btnText :button-text="'Save Changes'" @click-event="changePasswordTrigger()" />
            </div>
        </div>
        <div v-if="role === 'admin'" class="px-[5px] md:px-[15px] mb-10">
            <div class="flex items-center">
                <Icon class="w-5 h-5 mr-3" icon="fa6-solid:gears" />
                <span class="">Options</span>
            </div>
            <div class="mt-5 container py-10 rounded-md bg-fg-light dark:bg-fg-dark">
                <div class="mb-10">
                    <mdText :text="'Add a New Draw Type'" />
                    <div class="grid gap-4 grid-cols-1 sm:grid-cols-2">
                        <labelText :id="'drawType'" :type="'text'" :label="'Draw Type'" :value="drawType" :placeholder="''"
                            :error="errors.drawType" @input-field-value-changed="drawTypeValuechanged" />
                    </div>
                    <btnText :button-text="'Add'" @click-event="addNewDrawTypeTrigger()" />
                </div>
                <div>
                    <mdText :text="'Add a New Place'" />
                    <div class="grid gap-4 grid-cols-1 sm:grid-cols-2">
                        <labelText :id="'place'" :type="'text'" :label="'Place Name'" :value="placeName" :placeholder="''"
                            :error="errors.placeName" @input-field-value-changed="placeNameValuechanged" />
                    </div>
                    <btnText :button-text="'Add'" @click-event="addNewPlaceNameTrigger()" />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
/* eslint-disable */
import { ref } from 'vue';
import loading from '@/components/common/loading-overlay-com.vue';
import { Icon } from '@iconify/vue';
import store from '@/store/index';
import mdText from '@/components/common/titles/md-text.vue';
import labelText from '@/components/common/label-input-types/label-text.vue';
import { swal } from '@/utils/helper';
import { changePassword, addDraw, addPlace } from '@/services/api/settings';
import { useNotification } from "@kyvg/vue3-notification";
import btnText from '@/components/common/buttons/btn-text.vue';

const role = ref(store.getters.role);
const { notify } = useNotification();

const isLoading = ref(false);
let oldPassword = ref('');
let newPassword = ref('');
let confirmPassword = ref('');
const drawType = ref('');
const placeName = ref('');
let errors = ref({
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
    drawType: '',
    placeName: '',
});
let inputType = ref({
    oldPassword: 'password',
    newPassword: 'password',
    confirmPassword: 'password',
});

const passwordValuechanged = (val) => {
    oldPassword.value = val;
    errors.value.oldPassword = '';
};

const newPasswordValuechanged = (val) => {
    newPassword.value = val;
    errors.value.newPassword = '';
};

const passwordConfirmValuechanged = (val) => {
    confirmPassword.value = val;
    errors.value.confirmPassword = '';
};

const drawTypeValuechanged = (val) => {
    drawType.value = val;
    errors.value.drawType = '';
};

const placeNameValuechanged = (val) => {
    placeName.value = val;
    errors.value.placeName = '';
};


//change show hide icon related to input type
const changeinputTypeIcon = (type) => {

    if (inputType.value[type] === 'password') {
        inputType.value[type] = 'text';
    } else {
        inputType.value[type] = 'password';
    }
};

//input fields password reset validation
const passwordValidation = () => {
    if (oldPassword.value === '') {
        errors.value.oldPassword = 'Old password is required!';
    } else {
        errors.value.oldPassword = '';
    }

    if (newPassword.value === '') {
        errors.value.newPassword = 'New password is required!';
    } else if (newPassword.value.length <= 7) {
        errors.value.newPassword = 'Password should contained 8 or more characters!';
    } else {
        errors.value.newPassword = '';
    }

    if (confirmPassword.value === '') {
        errors.value.confirmPassword = 'Password confitmation is required!';
    } else if (newPassword.value !== confirmPassword.value) {
        errors.value.confirmPassword = 'Password confitmation did not matched with the new password!';
    } else {
        errors.value.confirmPassword = '';
    }

    drawType.value = '';
    placeName.value = '';

    errors.value.drawType = '';
    errors.value.placeName = '';
};

//input draw type validation
const drawTypeValidation = () => {
    if (drawType.value === '') {
        errors.value.drawType = 'Draw type is required!';
    } else {
        errors.value.drawType = '';
    }

    oldPassword.value = '';
    newPassword.value = '';
    confirmPassword.value = '';
    placeName.value = '';

    errors.value.oldPassword = '';
    errors.value.newPassword = '';
    errors.value.confirmPassword = '';
    errors.value.placeName = '';
};

//input place name validation
const placeNameValidation = () => {
    if (placeName.value === '') {
        errors.value.placeName = 'Place name is required!';
    } else {
        errors.value.drawType = '';
    }

    oldPassword.value = '';
    newPassword.value = '';
    confirmPassword.value = '';
    drawType.value = '';

    errors.value.oldPassword = '';
    errors.value.newPassword = '';
    errors.value.confirmPassword = '';
    errors.value.drawType = '';
};

const changePasswordTrigger = async () => {
    passwordValidation();

    if (errors.value.oldPassword === '' && errors.value.newPassword === '' && errors.value.confirmPassword === '') {
        swal('Password Change Confirmation!', 'Are you sure you want to change the password?', 'warning', true, 'Confirm', () => { }, async () => {
            isLoading.value = true;

            const postData = {
                oldPassword: oldPassword.value,
                newPassword: newPassword.value,
                confirmPassword: confirmPassword.value,
            };

            try {
                const response = await changePassword(postData);
                notify({
                    type: "success",
                    title: response.data.title,
                    text: response.data.message,
                });
                oldPassword.value = '';
                newPassword.value = '';
                confirmPassword.value = '';
            } catch (error) {
                notify({
                    type: "error",
                    title: error.response.data.title,
                    text: error.response.data.message,
                });
            }
            isLoading.value = false;
        });
    }
};

const addNewDrawTypeTrigger = async () => {
    isLoading.value = true;
    try {
        drawTypeValidation();
        if (errors.value.drawType === '') {
            const postData = {
                name: drawType.value
            }

            const response = await addDraw(postData);
            notify({
                type: "success",
                title: response.data.title,
                text: response.data.message,
            });
            drawType.value = '';
        }
    } catch (error) {
        notify({
            type: "error",
            title: error.response.data.title,
            text: error.response.data.message,
        });
    }
    drawType.value = '';
    isLoading.value = false;
};

const addNewPlaceNameTrigger = async () => {
    isLoading.value = true;
    try {
        placeNameValidation();
        if (errors.value.placeName === '') {
            const postData = {
                name: placeName.value
            }

            const response = await addPlace(postData);
            notify({
                type: "success",
                title: response.data.title,
                text: response.data.message,
            });
            placeName.value = '';
        }
    } catch (error) {
        notify({
            type: "error",
            title: error.response.data.title,
            text: error.response.data.message,
        });
    }
    placeName.value = '';
    isLoading.value = false;
};

</script>