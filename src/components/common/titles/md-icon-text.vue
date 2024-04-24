<template>
    <div class="mb-5 flex items-center">
        <Icon class="w-5 h-5 mr-3" :icon="props.icon" />
        <span class="text-lg">{{ props.text }}</span>
    </div>
</template>

<script setup>
import { defineProps } from 'vue';
import { Icon } from '@iconify/vue';

const props = defineProps({
    icon: {
        type: String,
    },

    text: {
        type: String,
    }
});

</script>