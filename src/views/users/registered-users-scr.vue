<template>
    <div class="container-w-full mt-[70px]">
        <loading :loading="isLoading" />
        <notifications />
        <div class="forground-container">
            <div class="forground">
                <mdText :text="'Registered Users'" />
                <div v-if="isLoading === false" class="overflow-x-auto">
                    <p v-if="users.length === 0" class="my-20 text-center text-xl">No Bets Found</p>
                    <tablePrimary v-else :items="users" />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
/* eslint-disable */
import { ref, onMounted } from 'vue';
import loading from '@/components/common/loading-overlay-com.vue';
import mdText from '@/components/common/titles/md-text.vue';
import tablePrimary from '@/components/common/tables/tbl-primary.vue';
import { fetchUserData } from '@/services/api/users';
import { useNotification } from "@kyvg/vue3-notification";

const { notify } = useNotification();

const isLoading = ref(true);
const users = ref([]);

onMounted(() => {
    getRegisteredUsers();
});

const getRegisteredUsers = async () => {
    isLoading.value = true;
    try {
        const response = await fetchUserData();
        users.value = response.data;
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