<template>
    <div class="container-w-full mt-[70px]">
        <loading :loading="isLoading" />
        <notifications />
        <div class="forground-container">
            <div class="forground">
                <mdText :text="'Add a new draw'" />
                <div class="form-grid-res">
                    <labelSelect :id="'type'" :label="'Type'" :value="drawData.type" :options="types"
                        :extra-option="{ name: 'Select an option', value: '', isVisible: true }" :error="errors.type"
                        @input-field-value-changed="typeValuechanged" />
                    <labelSelect :id="'place'" :label="'place'" :value="drawData.place" :options="places"
                        :extra-option="{ name: 'Select an option', value: '', isVisible: true }" :error="errors.place"
                        @input-field-value-changed="placeValuechanged" />
                    <labelText :id="'date'" :type="'date'" :label="'Date'" :value="drawData.date"
                        :placeholder="'ex: 10 23 57 09'" :error="errors.date" @input-field-value-changed="dateValuechanged" />
                    <labelText :id="'numbers'" :label="'Numbers'" :value="drawData.numbers" :placeholder="'ex: 10 23 57 09'"
                        :error="errors.numbers" @input-field-value-changed="numbersValuechanged" />
                </div>
                <div class="form-grid-res">
                    <btnText @click-event="submitDraw()" />
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
import { fetchDrawTypes, fetchPlaces } from '@/services/api/settings';
import { addDraw } from '@/services/api/draws';
import { useNotification } from "@kyvg/vue3-notification";
import { getCurrentDate } from "@/utils/helper";

const { notify } = useNotification();

const isLoading = ref(false);
const drawData = ref({
    type: '',
    place: '',
    numbers: '',
    date: getCurrentDate(),
});
const types = ref([]);
const places = ref([]);
const errors = ref({
    type: '',
    place: '',
    numbers: '',
    date: '',
});

onMounted(() => {
    getDrawTypes();
    getPlaces();
})

const typeValuechanged = (val) => {
    drawData.value.type = val;
    errors.value.type = '';
};

const placeValuechanged = (val) => {
    drawData.value.place = val;
    errors.value.place = '';
};

const dateValuechanged = (val) => {
    drawData.value.date = val;
    errors.value.date = '';
};

const numbersValuechanged = (val) => {
    drawData.value.numbers = val;
    errors.value.numbers = '';
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

const getPlaces = async () => {
    try {
        const response = await fetchPlaces();
        places.value = response.data;
    } catch (error) {
        notify({
            type: "error",
            title: error.response.data.title,
            text: error.response.data.message,
        });
    }
};

const validation = () => {
    if (drawData.value.type === '') {
        errors.value.type = 'Please select a type!'
    } else {
        errors.value.type = '';
    }

    if (drawData.value.place === '') {
        errors.value.place = 'Please select a place!'
    } else {
        errors.value.place = '';
    }

    if (drawData.value.date === '') {
        errors.value.date = 'Please enter the date!'
    } else if (!/^\d{4}-\d{2}-\d{2}$/.test(drawData.value.date)) {
        errors.value.date = 'Invalid date type!'
    }
    else {
        errors.value.date = '';
    }

    if (drawData.value.numbers === '') {
        errors.value.numbers = 'Please enter the draw numbers!';
    } else if (/[^0-9\s]/.test(drawData.value.numbers)) {
        errors.value.numbers = 'Please use only numbers and also use space to seperate the numer from other!'
    } else {
        errors.value.numbers = '';
    }
};

const submitDraw = async () => {
    isLoading.value = true;
    validation();
    try {
        if (!errors.value.type && !errors.value.place && !errors.value.date && !errors.value.numbers) {
            const postData = {
                typeId: drawData.value.type,
                placeId: drawData.value.place,
                date: drawData.value.date,
                numbers: drawData.value.numbers
            };

            const response = await addDraw(postData);
            drawData.value.type = '';
            drawData.value.place = ''; 
            drawData.value.numbers = '';
            notify({
                type: "success",
                title: response.data.title,
                text: response.data.message,
            });
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