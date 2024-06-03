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
                        <labelText :id="'date'" :type="'date'" :label="'By Date'" :value="selectedDate" :error="''"
                            @inputFieldValueChanged="selectedDateValueChanged" />
                    </div>
                </div>
                <div v-if="isLoading === false" class="overflow-x-auto">
                    <p v-if="bets.length === 0" class="my-20 text-center text-xl">No Bets Found</p>
                    <table class="min-w-[700px] w-full">
                        <tr>
                            <th class="px-2 py-4 text-left bg-bg-light dark:bg-bg-dark">Bet ID</th>
                            <th class="px-2 py-4 text-left bg-bg-light dark:bg-bg-dark">Betted Date</th>
                            <th class="px-2 py-4 text-left bg-bg-light dark:bg-bg-dark">User ID</th>
                            <th class="px-2 py-4 text-left bg-bg-light dark:bg-bg-dark">User Name</th>
                            <th class="px-2 py-4 text-left bg-bg-light dark:bg-bg-dark">Draw Type</th>
                            <th class="w-[100px] px-2 py-4 text-center bg-bg-light dark:bg-bg-dark">Drawed Date</th>
                            <th class="w-[100px] px-2 py-4 text-center bg-bg-light dark:bg-bg-dark">Bets</th>
                        </tr>
                        <tr v-for="(bet, index) in bets" :key="index" class="border-b border-gray-200 dark:border-gray-600">
                            <td class="px-2 py-3 text-sm">{{ bet.betId }}</td>
                            <td class="px-2 py-3 text-sm">{{ bet.bettedDate }}</td>
                            <td class="px-2 py-3 text-sm">{{ bet.userId }}</td>
                            <td class="px-2 py-3 text-sm">{{ bet.userName }}</td>
                            <td class="px-2 py-3 text-sm">{{ bet.drawName }}</td>
                            <td class="px-2 py-3 text-sm">{{ bet.drawedDate }}</td>
                            <td v-for="(betData, index) in bet.bets" :key="index" class="px-2 py-3 text-sm flex flex-col">
                                <div class="flex gap-1">
                                    <p>{{ betData.numbers }}</p>
                                    <p>#</p>
                                    <p>{{ betData.amount }}</p>
                                </div>
                            </td>
                        </tr>
                    </table>
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