<template>
    <div class="w-full">
        <table class="min-w-[700px] w-full">
            <tr>
                <th v-for="(key, index) in Object.keys(items[0])" :key="index" class="px-2 py-4 text-left bg-bg-light dark:bg-bg-dark">{{ key }}</th>
            </tr>
            <tr v-for="(item, index) in items" :key="index" class="m border-b border-gray-200 dark:border-gray-600">
                <td v-for="(value, index) in Object.values(item)" :key="index" class="px-2 py-3 text-sm">{{ value }}</td>
            </tr>
        </table>
    </div>
</template>

<script setup>
/* eslint-disable */
import { defineProps } from 'vue';

const props = defineProps({
    items: {
        type: Object
    }
});
</script>