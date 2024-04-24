<template>
    <div v-if="naviIsVisible" class="container-w-full fixed top-0 z-10">
        <Loading :loading="isLoading" />
        <div class="pt-5 px-[5px] md:px-[15px] backdrop-blur-sm">
            <div
                class="py-2 container rounded-md shadow-sm flex justify-between items-center bg-opacity-50 backdrop-blur-md bg-fg-light dark:bg-fg-dark dark:bg-opacity-50 dark:backdrop-blur-md">
                <button @click="mobileNavigationHideShowTrigger()" class="flex justify-center items-center">
                    <Icon class="w-6 h-6 block lg:hidden" icon="humbleicons:bars" />
                </button>
                <div class="flex items-center">
                    <button @click="themeSelect()" class="mr-5 flex">
                        <Icon v-if="selectedTheme === 'light'" class="w-6 h-6 text-black" icon="uil:brightness" />
                        <Icon v-else class="w-6 h-6 text-yellow-400" icon="ph:moon-stars-fill" />
                    </button>
                    <button @click.stop="handleClickOutside" @click="userDropdownOptionSelect()"
                        class="w-10 h-10 flex justify-center items-center rounded-full bg-[#7284FE] relative">
                        <Icon class="w-7 h-7 text-[#070031]" icon="material-symbols:person" />
                        <div class="w-3 h-3 bg-green-500 rounded-full absolute bottom-[1px] right-[1px]"></div>
                        <transition name="dropdown">
                            <div ref="dropdown" v-if="isUserDropdownVisible"
                                class="w-[120px] h-[90px] rounded-md flex flex-col justify-center items-center overflow-hidden absolute top-14 right-0 bg-fg-light dark:bg-fg-dark">
                                <router-link @click="userDropdownOptionSelect()" to="/settings" class="w-full">
                                    <div class="w-full h-[45px] pl-5 flex items-center transition-all duration-300 ease-in-out hover:bg-bg-dark">
                                        <Icon class="w-5 h-5 mr-2 flex-shrink-0" icon="material-symbols:settings" />
                                        <p class="text-sm">Settings</p>
                                    </div>
                                </router-link>
                                <button @click="userDropdownOptionSelect('logout')" class="w-full h-[45px] pl-5 flex items-center transition-all duration-300 ease-in-out hover:bg-bg-dark">
                                    <Icon class="w-5 h-5 mr-2 text-red-600 flex-shrink-0" icon="ion:log-out" />
                                    <p class="text-sm whitespace-nowrap">Log Out</p>
                                </button>
                            </div>
                        </transition>
                    </button>
                </div>
            </div>
        </div>
        <transition name="mobnav">
            <div v-if="isNavigationMobileVisible" @click="mobileNavigationHideShowTrigger()"
                class="w-full h-screen block lg:hidden fixed top-0 left-0">
                <div @click.stop class="max-w-[300px] h-screen pt-5 bg-fg-light dark:bg-fg-dark">
                    <div class="mr-3 flex justify-end">
                        <button @click="mobileNavigationHideShowTrigger()">
                            <Icon class="w-6 h-6" icon="material-symbols:close" />
                        </button>
                    </div>
                    <div class="flex justify-center">
                        <navigationLinks />
                    </div>
                </div>
            </div>
        </transition>
        <transition name="fade">
            <button v-if="isScrollBtnVisible" @click="scrollToTop()"
                class="w-9 h-9 mr-[15px] md:mr-[25px] lg:mr-[65px] rounded-full flex justify-center items-center bg-primary fixed right-0 bottom-10">
                <Icon class="w-4 h-4 text-white" icon="material-symbols:arrow-upward-rounded" />
            </button>
        </transition>
    </div>
</template>

<script setup>
/* eslint-disable */
import { ref, onMounted, onUnmounted, computed, watch } from 'vue';
import store from '@/store/index';
import { Icon } from '@iconify/vue';
import navigationLinks from './navigation-links.vue';
import { useRoute, useRouter } from 'vue-router';
import Loading from '@/components/common/loading-overlay-com.vue';

const route = useRoute();
const router = useRouter();

const isLoading = ref(false);
let isUserDropdownVisible = ref(false);
let selectedTheme = ref('');
const dropdown = ref(null);
let isScrollBtnVisible = ref(false);
let isNavigationMobileVisible = ref(false);

watch(() => route.fullPath, (newPath) => {
    mobileNavigationHideShowTrigger();
}
);

onMounted(() => {
    setTheme();
    document.addEventListener('click', handleClickOutside);
    window.addEventListener("scroll", handleScrollBtn);
});

// Cleanup the handleClickOutside event listener when component unmounts
onUnmounted(() => {
    document.removeEventListener('click', handleClickOutside);
});

const naviIsVisible = computed(() => {
    return store.getters.isLoggedIn;
});

//set theme
const setTheme = () => {
    let themeData = localStorage.getItem('themeData');
    if (themeData === null || themeData === undefined || themeData === '') {
        localStorage.setItem('themeData', 'light');
        selectedTheme.value = 'light';
    } else {
        selectedTheme.value = themeData;
        if (selectedTheme.value === 'dark') {
            document.documentElement.classList.toggle('dark');
        }
    };
};

//handle scroll to top button
const handleScrollBtn = () => {
    if (window.scrollY < 300) {
        isScrollBtnVisible.value = false;
    } else {
        isScrollBtnVisible.value = true;
    }
}

//scroll to top
const scrollToTop = () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
};

//handle click outside of dropdown box
const handleClickOutside = (event) => {
    if (dropdown.value && !dropdown.value.contains(event.target)) {
        isUserDropdownVisible.value = false;
    }
};

//select theme
const themeSelect = () => {
    document.documentElement.classList.toggle('dark');
    if (localStorage.getItem('themeData') === 'light') {
        selectedTheme.value = 'dark';
        localStorage.setItem('themeData', 'dark');
    } else {
        selectedTheme.value = 'light';
        localStorage.setItem('themeData', 'light');
    }
};

const mobileNavigationHideShowTrigger = () => {
    isNavigationMobileVisible.value = false;
};

//user dropdown's option selection trigger
const userDropdownOptionSelect = (option) => {
    isUserDropdownVisible.value = !isUserDropdownVisible.value;
    if (option === 'logout') {
        store.dispatch('logout');
        router.push('/login');
    }
}

</script>

<style scoped>
.dropdown-enter-from,
.dropdown-leave-to {
    width: 0;
    height: 0;
    opacity: .5;
}

.dropdown-enter-active,
.dropdown-leave-active {
    transition: all .3s ease;
}

.mobnav-enter-from,
.mobnav-leave-to {
    left: -100%;
}

.mobnav-enter-active,
.mobnav-leave-active {
    transition: all .3s ease;
}
</style>