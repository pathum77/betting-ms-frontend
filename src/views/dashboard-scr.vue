<template>
    <div class="container-w-full mt-[70px]">
        <notifications />
        <loading :loading="isLoading" />
        <div v-if="userData.First_Name" class="pt-5 px-[5px] md:px-[15px] backdrop-blur-sm">
            <div
                class="container py-2 rounded-md shadow-sm bg-opacity-50 backdrop-blur-md bg-fg-light dark:bg-fg-dark dark:bg-opacity-50 dark:backdrop-blur-md">
                <p class="mb-10 text-[20px] font-bold">Hi...Welcome back.</p>
                <div class="flex items-center">
                    <Icon class="w-[100px] h-[100px] mr-3" icon="mingcute:user-4-fill" />
                    <div>
                        <p class="mb-2 text-sm">{{ 'Name: ' + userData.First_Name + ' ' + userData.Last_Name }}</p>
                        <p class="mb-2 text-sm">{{ 'Username: ' + userData.Username }}</p>
                        <p class="text-sm">{{ 'User Role: ' + userData.Role }}</p>
                    </div>
                </div>
                <div class="mt-5 flex justify-end">
                    <div @click="copyLinkToClipboard()" class="flex items-center cursor-pointer hover:text-blue-500">
                        <p class="text-sm">{{ webLink }}</p>
                        <Icon class="w-4 h-4 ml-2" icon="material-symbols:content-copy" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import loading from '@/components/common/loading-overlay-com.vue';
import { Icon } from '@iconify/vue';
import { fetchUserData } from '@/services/api/users';
import { useNotification } from "@kyvg/vue3-notification";

const { notify } = useNotification();

const isLoading = ref(false);
const userData = ref({});
const webLink = ref('https://betting-ms-frontend.vercel.app');

onMounted(() => {
    getUserData();
})

const getUserData = async () => {
    isLoading.value = true;
    try {
        const response = await fetchUserData();
        userData.value = response.data;
    } catch (error) {
        notify({
            type: "error",
            title: error.response.data.title,
            text: error.response.data.message,
        });
    }
    isLoading.value = false;
};

const copyLinkToClipboard = () => {
    navigator.clipboard.writeText(webLink.value)
        .then(() => {
            notify({
                type: "success",
                title: "Success",
                text: "Text copied to clipboard",
            });
        })
        .catch(() => {
            notify({
                type: "error",
                title: "Error!",
                text: "Failed to copy text",
            });
        });
};

</script>