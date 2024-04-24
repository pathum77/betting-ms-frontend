<template>
    <div class="container-w-full mt-[70px]">
        <loading :loading="isLoading" />
        <notifications />
        <div class="forground-container">
            <div class="forground">
                <mdText :text="'Draw history'" />
                <div class="w-full flex justify-end">
                    <div class="max-w-[300px] sm:max-w-[500px] w-full grid grid-cols-2 gap-3">
                        <div></div>
                        <labelText :id="'date'" :type="'date'" :label="'By Date'" :value="selectedDate" :error="''" @inputFieldValueChanged="selectedDateValueChanged" />
                    </div>
                </div>
                <div v-if="isLoading === false" class="overflow-x-auto">
                    <p v-if="results.length === 0" class="my-20 text-center text-xl">No Result Found</p>
                    <tablePrimary v-else :items="results" />
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
import { getCurrentDate } from '@/utils/helper';
import {fetchResults} from '@/services/api/results.js';
import { useNotification } from "@kyvg/vue3-notification";

const { notify } = useNotification();

const isLoading = ref(true);
const results = ref([]);
const selectedDate = ref(getCurrentDate());

onMounted(() => {
    getResults();
});

const selectedDateValueChanged = (val) => {
    selectedDate.value = val;
    getResults();
};

const getResults = async () => {
    isLoading.value = true;
    try {
        const response = await fetchResults(selectedDate.value);
        results.value = response.data;
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