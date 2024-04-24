<template>
    <button @click="buttonClick()" class="mt-5 py-3 px-10 rounded-md font-bold text-white bg-primary transition duration-300 ease-in-out hover:bg-secondary">{{ props.buttonText }}</button>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
    buttonText: {
        type: String,
        default: 'Submit',
    }
});

const emits = defineEmits(['clickEvent']);

const buttonClick = () => {
    emits('clickEvent');
};
</script>