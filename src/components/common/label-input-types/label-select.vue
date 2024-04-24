<template>
    <div class="w-full mb-5">
        <p class="mb-1">{{ props.label }}</p>
        <select v-bind:disabled="props.isDissabled" v-model="inputValue" @change="emitNewValue()" class="w-full h-11 px-3 flex border rounded-md bg-fg-light dark:bg-fg-dark"
        :class="props.error !== '' ? 'border-red-600 dark:border-red-600' : 'dark:border-gray-600'" name="" :id="id">
            <option v-if="props.extraOption.isVisible" selected :disabled="props.extraOption.isDissabled" :value="props.extraOption.value">{{ props.extraOption.name }}</option>
            <option v-for="(item, index) in options" :key="index" :value="item.id">{{ item.name }}</option>
        </select>
        <p class="text-sm text-red-600">{{ props.error }}</p>
    </div>
</template>

<script setup>
/* eslint-disable */
import { ref, defineProps, defineEmits } from 'vue';

const props = defineProps({
    id: {
        type: String,
        default: ''
    },

    label: {
        type: String,
        default: '',
    },

    value: {
        type: String,
        default: 'all',
    },

    options: {
        type: Object,
        default: null
    },

    extraOption: {
        type: Object,
        default: { name: 'Select an option', value: '', isDissabled: true, isVisible: false }
    },

    error: {
        type: String,
        default: '',
    },

    isDissabled: {
        type: Boolean,
        default: false,
    }
});

let inputValue = ref(props.value);

const emits = defineEmits(['inputFieldValueChanged']);

const emitNewValue = () => {
    emits('inputFieldValueChanged', inputValue.value);
};

</script>