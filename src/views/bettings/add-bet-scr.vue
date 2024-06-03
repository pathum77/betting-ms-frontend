<template>
    <div class="container-w-full mt-[70px]">
        <loading :loading="isLoading" />
        <notifications />
        <div class="forground-container">
            <div class="forground">
                <mdText :text="'Add a new bet'" />
                <div class="form-grid-res">
                    <labelSelect :id="'type'" :label="'Type'" :value="betData.type" :options="types"
                        :extra-option="{ name: 'Select an option', value: '', isVisible: true }" :error="errors.type"
                        @input-field-value-changed="typeValuechanged" />
                    <labelText :id="'drawDate'" :type="'date'" :label="'Draw Date'" :value="betData.drawDate"
                        :placeholder="''" :error="errors.drawDate" @input-field-value-changed="drawDateValuechanged" />
                    <div>
                        <div class="flex justify-between items-start gap-3">
                            <labelText :id="'numbers'" :label="'Numbers'" :value="betData.numbers"
                                :placeholder="'10 23 57 09'" :error="errors.numbers"
                                @input-field-value-changed="numbersValuechanged" />
                            <labelText :id="'amount'" :type="'number'" :label="`Amount (${CONSTANTS.CURRECNCY_TYPE})`"
                                :value="betData.amount" :placeholder="'1000'" :error="errors.amount"
                                @input-field-value-changed="amountValuechanged" />
                            <button @click="addBetsToObj()"
                                class="w-11 h-11 mt-[29px] rounded-md flex-shrink-0 grid place-items-center transition-all duration-300 ease-in-out bg-primary hover:bg-secondary">
                                <Icon class="w-5 h-5 text-white" icon="material-symbols:add" />
                            </button>
                        </div>
                        <div v-if="errors.bets">
                            <div class="h-2 mb-1 rounded-md border border-t-0 border-red-600"></div>
                            <p class="text-sm text-red-600">{{ errors.bets }}</p>
                        </div>
                        <div class="flex flex-wrap gap-3">
                            <div v-for="(bet, index) in betData.bets" :key="index"
                                class="px-4 py-2 rounded-md relative bg-bg-dark">
                                <button @click="removeFromBetsObj(index)"
                                    class="w-4 h-4 rounded-full grid place-items-center absolute top-[-4px] right-[-4px] bg-[#ffffff53]">
                                    <Icon class="w-4 h-4 text-black" icon="material-symbols:close-small-outline" />
                                </button>
                                <div class="flex gap-1">
                                    <p>{{ bet.numbers }}</p>
                                    <p>#</p>
                                    <p>{{ bet.amount }}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="form-grid-res">
                    <btnText @click-event="submitBet()" />
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
import { Icon } from '@iconify/vue';
import { addBet } from '@/services/api/bets';
import { fetchDrawTypes } from '@/services/api/settings';
import { useNotification } from "@kyvg/vue3-notification";
import { getCurrentDate } from "@/utils/helper";
import { CONSTANTS } from '@/utils/constants';
import { swal } from '@/utils/helper';

const { notify } = useNotification();

const isLoading = ref(false);
const betData = ref({
    type: '',
    drawDate: getCurrentDate(),
    numbers: '',
    amount: '',
    bets: [],
});
const types = ref([]);
const errors = ref({
    type: '',
    drawDate: '',
    numbers: '',
    amount: '',
    bets: ''
});

onMounted(() => {
    getDrawTypes();
})

const typeValuechanged = (val) => {
    betData.value.type = val;
    errors.value.type = '';
};

const drawDateValuechanged = (val) => {
    betData.value.drawDate = val;
    errors.value.drawDate = '';
};

const numbersValuechanged = (val) => {
    betData.value.numbers = val;
    errors.value.numbers = '';
    errors.value.bets = '';
};

const amountValuechanged = (val) => {
    betData.value.amount = val;
    errors.value.amount = '';
    errors.value.bets = '';
};

const getDrawTypes = async () => {
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
};

const addBetsToObj = () => {
    if (betData.value.numbers === '') {
        errors.value.numbers = 'Please enter the draw numbers!';
    } else if (/[^0-9\s]/.test(betData.value.numbers)) {
        errors.value.numbers = 'Please use only numbers and also use space to seperate the numer from other!'
    } else {
        errors.value.numbers = '';
    }

    if (betData.value.amount === '') {
        errors.value.amount = 'Please enter your bet amount!'
    } else {
        errors.value.amount = '';
    }

    if (errors.value.numbers === '' && errors.value.amount === '') {
        betData.value.bets.push({ numbers: betData.value.numbers, amount: betData.value.amount });
        betData.value.numbers = '';
        betData.value.amount = '';
    }
};

const removeFromBetsObj = (index) => {
    betData.value.bets.splice(index, 1);
};

const validation = () => {
    if (betData.value.type === '') {
        errors.value.type = 'Please select a type!'
    } else {
        errors.value.type = '';
    }

    if (betData.value.drawDate === '') {
        errors.value.betData = 'Please enter the draw date!'
    } else if (!/^\d{4}-\d{2}-\d{2}$/.test(betData.value.drawDate)) {
        errors.value.drawDate = 'Invalid draw date type!'
    }
    else {
        errors.value.drawDate = '';
    }

    if (betData.value.bets.length === 0) {
        errors.value.bets = 'Please add at least one bet';
    } else {
        errors.value.bets = '';
    }
};

const submitBet = async () => {
    validation();
    if (!errors.value.type && !errors.value.place && !errors.value.drawDate && !errors.value.numbers && !errors.value.bets) {
        swal('Bet Confirmation!', 'Please confirm the defils you filled are correct.', 'warning', true, 'Bet', () => { }, async () => {
            isLoading.value = true;
            try {
                const postData = {
                    drawTypeId: betData.value.type,
                    drawDate: betData.value.drawDate,
                    betData: betData.value.bets
                };

                const response = await addBet(postData);
                betData.value.type = '';
                betData.value.place = '';
                betData.value.drawDate = getCurrentDate();
                betData.value.numbers = '';
                notify({
                    type: "success",
                    title: response.data.title,
                    text: response.data.message,
                });
            } catch (error) {
                notify({
                    type: "error",
                    title: error.response.data.title,
                    text: error.response.data.message,
                });
            }
            isLoading.value = false;
        },
            () => { });
    }
};

</script>