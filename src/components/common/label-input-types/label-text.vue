<template>
    <div class="w-full mb-5">
        <p class="mb-1">{{ props.label }}</p>
        <div v-bind:disabled="props.isDissabled" class="flex border rounded-md"
            :class="props.error !== '' ? 'border-red-600 dark:border-red-600' : 'dark:border-gray-600'">
            <input v-model="inputValue" @input="emitNewValue()" class="w-full h-11 px-3 rounded-md bg-fg-light dark:bg-fg-dark"
                :type="props.type" name="" :id="props.id" :placeholder="props.placeholder">
            <div v-if="props.postfixIcon" class="w-7 h-11 flex items-center flex-shrink-0 dark:border-gray-500">
                <Icon @click="emitIconClick()" class="w-6 h-6 mr-1 cursor-pointer"
                    :icon="postfixIcon" />
            </div>
        </div>
        <p v-if="props.error !== ''" class="text-sm text-red-600">{{ props.error }}</p>
    </div>
</template>

<script setup>
import { ref, defineProps, defineEmits, watch } from 'vue';
import { Icon } from '@iconify/vue';

const props = defineProps({
    id: {
        type: String,
        default: '',
    },

    type: {
        type: String,
        default: 'text'
    },

    label: {
        type: String,
        default: '',
    },

    value: {
        type: String,
        default: '',
    },

    placeholder: {
        type: String,
        default: '',
    },

    error: {
        type: String,
        default: '',
    },

    isDissabled: {
        type: Boolean,
        default: false,
    },

    postfixIcon: {
        type: String,
        default: ''
    },
});

let inputValue = ref('');

watch(() => props.value, (val) => {
    if (val === '') {
        inputValue.value = val;
    }
});

const emits = defineEmits(['inputFieldValueChanged', 'iconClick']);

const emitNewValue = () => {
    emits('inputFieldValueChanged', inputValue.value);
};

const emitIconClick = () => {
    emits('iconClick', props.id)
};

</script>