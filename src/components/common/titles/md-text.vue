<template>
    <div class="mb-5">
        <span class="text-lg">{{ props.text }}</span>
    </div>
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
    text: {
        type: String,
    }
});

</script>