<template>
    <div v-if="naviIsVisible" class="hidden lg:w-[300px] lg:min-h-screen lg:pt-5 lg:shadow-md lg:flex lg:flex-col lg:items-center lg:fixed lg:top-0 lg:left-0 bg-fg-light dark:bg-fg-dark">
        <navigationLinks />
    </div>
</template>

<script setup>
import { computed } from 'vue';
import store from '@/store/index';
import navigationLinks from './navigation-links.vue';

const naviIsVisible = computed(() => {
    return store.getters.isLoggedIn;
})

</script>