<template>
    <div>
        <loading v-model:active="isLoading" :is-full-page="fullPage" loader="bars" :color="themeData === 'dark' ? COLOR_PRIMARY : COLOR_SECONDARY" :background-color="themeData === 'dark' ? COLOR_FG_DARK : COLOR_FG_LIGHT" />
    </div>
</template>

<script setup>

/* eslint-disable */
import { ref, onMounted, defineProps, computed } from 'vue';
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/css/index.css';
import { CONSTANTS } from '@/utils/constants';

const themeData = ref('');
const COLOR_PRIMARY = ref(CONSTANTS.COLOR_PRIMARY);
const COLOR_SECONDARY = ref(CONSTANTS.COLOR_SECONDARY);
const COLOR_FG_DARK = ref(CONSTANTS.COLOR_FG_DARK);
const COLOR_FG_LIGHT = ref(CONSTANTS.COLOR_FG_LIGHT);

const props = defineProps({
    loading: {
        type: Boolean,
        default: false,
    }
});

onMounted(() => {
    themeData.value = localStorage.getItem('themeData');
});

const isLoading = computed(() => {
    return props.loading;
});
</script>