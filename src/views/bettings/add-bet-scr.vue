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
                    <labelText :id="'numbers'" :label="'Numbers'" :value="betData.numbers" :placeholder="'10 23 57 09'"
                        :error="errors.numbers" @input-field-value-changed="numbersValuechanged" />
                    <labelText :id="'amount'" :type="'number'" :label="`Amount (${CONSTANTS.CURRECNCY_TYPE})`"
                        :value="betData.amount" :placeholder="'1000'" :error="errors.amount"
                        @input-field-value-changed="amountValuechanged" />
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
});
const types = ref([]);
const errors = ref({
    type: '',
    drawDate: '',
    numbers: '',
    amount: '',
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
};

const amountValuechanged = (val) => {
    betData.value.amount = val;
    errors.value.amount = '';
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
};

const submitBet = async () => {
    validation();
    if (!errors.value.type && !errors.value.place && !errors.value.drawDate && !errors.value.numbers) {
        swal('Bet Confirmation!', 'Please confirm the defils you filled are correct.', 'warning', true, 'Bet', () => { }, async () => {
            isLoading.value = true;
            try {
                const postData = {
                    drawTypeId: betData.value.type,
                    drawDate: betData.value.drawDate,
                    amount: betData.value.amount,
                    betNumbers: betData.value.numbers
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