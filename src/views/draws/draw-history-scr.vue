<template>
    <div class="container-w-full mt-[70px]">
        <loading :loading="isLoading" />
        <notifications />
        <div class="forground-container">
            <div class="forground">
                <mdText :text="'Draw history'" />
                <div class="w-full flex justify-end">
                    <div class="max-w-[300px] sm:max-w-[500px] w-full grid grid-cols-2 gap-3">
                        <labelText :id="'date'" :type="'date'" :label="'By Date'" :value="selectedDate" :error="''" @inputFieldValueChanged="selectedDateValueChanged" />
                        <labelSelect :id="'type'" :label="'By Type'" :value="selectedType" :options="types"
                            :extra-option="{ name: 'All', value: '', isDissable: true, isVisible: true }"
                            :error="''" @inputFieldValueChanged="selectedTypeValueChanged" />
                    </div>
                </div>
                <div v-if="isLoading === false" class="overflow-x-auto">
                    <p v-if="draws.length === 0" class="my-20 text-center text-xl">No Draws Found</p>
                    <tablePrimary v-else :items="draws" />
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
import labelSelect from '@/components/common/label-input-types/label-select.vue';
import { fetchDrawTypes } from '@/services/api/settings';
import { fetchDrawsHistory } from '@/services/api/draws';
import { useNotification } from "@kyvg/vue3-notification";
import { getCurrentDate } from '@/utils/helper';

const { notify } = useNotification();

const isLoading = ref(true);
const draws = ref([]);
const types = ref([]);
const selectedDate = ref(getCurrentDate());
const selectedType = ref('');

onMounted(() => {
    getDrawTypes();
    getDraws();
});

const selectedDateValueChanged = (val) => {
    selectedDate.value = val;
    getDraws();
};

const selectedTypeValueChanged = (val) => {
    selectedType.value = val;
    getDraws();
};

const getDrawTypes = async () => {
    isLoading.value = true;
    try {
        const response = await fetchDrawTypes();
        types.value = response.data;
    } catch (error) {
        notify({
            type: "error",
            title: error.response.data.title,
            text: error.response.data.message,
        });
    }
    isLoading.value = false;
};

const getDraws = async () => {
    isLoading.value = true;
    try {
        const response = await fetchDrawsHistory(selectedDate.value, selectedType.value);
        draws.value = response.data;
    } catch (error) {
        notify({
            type: "error",
            title: "Draws fetching error!",
            text: error.response.data.message,
        });
    }
    isLoading.value = false;
};

</script>