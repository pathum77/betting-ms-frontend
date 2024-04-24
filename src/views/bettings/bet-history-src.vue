<template>
    <div class="container-w-full mt-[70px]">
        <loading :loading="isLoading" />
        <notifications />
        <div class="forground-container">
            <div class="forground">
                <mdText :text="'Betting history'" />
                <div class="w-full flex justify-end">
                    <div class="max-w-[300px] sm:max-w-[500px] w-full grid grid-cols-2 gap-3">
                        <div></div>
                        <labelText :id="'date'" :type="'date'" :label="'By Date'" :value="selectedDate" :error="''" @inputFieldValueChanged="selectedDateValueChanged" />
                    </div>
                </div>
                <div v-if="isLoading === false" class="overflow-x-auto">
                    <p v-if="bets.length === 0" class="my-20 text-center text-xl">No Bets Found</p>
                    <tablePrimary v-else :items="bets" />
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
import labelText from '@/components/common/label-input-types/label-text.vue';
import { fetchBetsHistory } from '@/services/api/bets';
import { useNotification } from "@kyvg/vue3-notification";
import { getCurrentDate } from '@/utils/helper';

const { notify } = useNotification();

const isLoading = ref(true);
const bets = ref([]);
const selectedDate = ref(getCurrentDate());

onMounted(() => {
    getBets();
});

const selectedDateValueChanged = (val) => {
    selectedDate.value = val;
    getBets();
};

const getBets = async () => {
    isLoading.value = true;
    try {
        const response = await fetchBetsHistory(selectedDate.value);
        bets.value = response.data;
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