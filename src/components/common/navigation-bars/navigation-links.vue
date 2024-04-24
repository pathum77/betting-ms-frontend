<template>
    <div class="max-w-[270px] w-full">
        <router-link to="/">
            <img class="w-[60px] mr-3" src="../../../assets/logo/logo.png" alt="">
        </router-link>
        <div class="mt-10">
            <div v-for="(item, index) in links" :key="index">
                <router-link @click="subLinksVisibilityTrigger(index)" v-if="item.subLinks.length === 0 && item.roles.includes(role)"
                    :to="item.redirect">
                    <div class="link-box hov p-3 flex items-center rounded-md">
                        <Icon class="w-5 h-5 mr-5" :icon="item.icon" />
                        <p class="text-sm">{{ item.name }}</p>
                    </div>
                </router-link>
                <div v-if="item.subLinks.length > 0 && item.roles.includes(role)">
                    <button @click="subLinksVisibilityTrigger(index)"
                        class="w-full hov p-3 flex justify-between items-center rounded-md"
                        :class="item.isSubLinkSelected === true ? 'bg-bg-light dark:bg-bg-dark' : ''">
                        <div class="flex">
                            <Icon class="w-5 h-5 mr-5" :icon="item.icon" />
                            <p class="text-sm">{{ item.name }}</p>
                        </div>
                        <Icon class="w-5 h-5 mr-5 transition-all duration-300 ease-in-out"
                            icon="ic:baseline-keyboard-arrow-down"
                            :class="item.isSubLinksVisible === true ? '-rotate-180' : ''" />
                    </button>
                    <transition name="sub-links">
                        <div v-if="item.isSubLinksVisible" class="max-h-[88px] overflow-hidden">
                            <div v-for="(subItem, index) in item.subLinks" :key="index">
                                <router-link v-if="subItem.roles.includes(role)" @click="subLinksVisibilityTrigger()" :to="subItem.redirect">
                                    <div class="link-box hov p-3 flex items-center rounded-md">
                                        <Icon class="w-3 h-3 mr-5 ml-2" icon="ic:outline-circle" />
                                        <p class="text-sm">{{ subItem.name }}</p>
                                    </div>
                                </router-link>
                            </div>
                        </div>
                    </transition>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
/* eslint-disable */
import { ref, onMounted, watch } from 'vue';
import { Icon } from '@iconify/vue';
import { useRoute } from 'vue-router';
import store from '@/store/index';

const route = useRoute();

const role = ref(null);
const links = ref([
    { name: 'Dashboard', icon: 'ri:dashboard-3-fill', subLinks: [], redirect: '/', roles: ['admin', 'manager', 'agent'] },
    { name: 'Draws', icon: 'emojione-monotone:repeat-button', roles: ['admin'], subLinks: [{ index: 1, name: 'Add a Draw', redirect: '/add-draw', roles: ['admin'] }, { index: 1, name: 'Draw History', redirect: '/draw-history', roles: ['admin'] }], isSubLinkSelected: false, isSubLinksVisible: false },
    { name: 'Users', icon: 'ph:users-three-fill', roles: ['admin', 'manager'], subLinks: [{ index: 2, name: 'Add a User', redirect: '/add-user', roles: ['admin', 'manager'] }, { index: 2, name: 'Registered Users', redirect: '/registered-users', roles: ['admin', 'manager'] }], isSubLinkSelected: false, isSubLinksVisible: false },
    { name: 'Bets', icon: 'fluent:keyboard-123-20-filled', roles: ['admin', 'manager', 'agent'], subLinks: [{ index: 3, name: 'Add a Bet', redirect: '/add-bet', roles: ['admin', 'manager', 'agent'], }, { index: 3, name: 'Bets History', redirect: '/bets-history', roles: ['admin'] }], isSubLinkSelected: false, isSubLinksVisible: false },
    { name: 'Results', icon: 'ri:information-2-fill', subLinks: [], redirect: '/results', roles: ['admin'], },
    { name: 'Settings', icon: 'material-symbols:settings', subLinks: [], redirect: '/settings', roles: ['admin', 'manager', 'agent'], },
]);

let selectedLinkIndex = ref(0);

onMounted(async() => {
    role.value = await store.getters.role;
});

watch(() => store.getters.role, async (newRole) => {
    role.value = await newRole;
});

watch(() => route.fullPath, (newPath) => {
    links.value.forEach((link) => {
        link.subLinks.forEach((subLink) => {
            if (subLink.redirect === newPath) {
                links.value[subLink.index].isSubLinksVisible = true;
                links.value[subLink.index].isSubLinkSelected = true;
            }
        });
    });
}
);

const subLinksVisibilityTrigger = (index) => {

    if (index !== undefined) {
        selectedLinkIndex.value = index;

        for (let i = 0; i < links.value.length; i++) {
            if (i !== index) {
                links.value[i].isSubLinksVisible = false;
                links.value[i].isSubLinkSelected = false;
            }
        }

        links.value[index].isSubLinksVisible = !links.value[index].isSubLinksVisible;
        links.value[index].isSubLinkSelected = !links.value[index].isSubLinkSelected;

        if (links.value[index].subLinks.length === 0) {
            links.value.forEach((link) => {
                link.isSubLinksVisible = false;
                link.isSubLinkSelected = false;
            });
        }
    } else {
        links.value.forEach((link) => {
            if (link.subLinks.length > 0) {
                link.isSubLinkSelected = false;
            }
        });
    }

    setTimeout(() => {

        let routePath = route.fullPath;
        links.value.forEach((link) => {
            if (link.subLinks.length > 0) {
                link.subLinks.forEach((subLink) => {
                    if (subLink.redirect == routePath) {
                        links.value[subLink.index].isSubLinkSelected = true;
                    }
                });
            }
        });
    }, 1);
};

</script>

<style scoped>
a.router-link-exact-active .link-box {
    background: linear-gradient(to right, #7284FE, #070031);
    color: white;
}

a.router-link-exact-active .link-icon {
    color: white;
}

.sub-links-enter-active,
.sub-links-leave-active {
    transition: all .3s ease;
}

.sub-links-enter-from,
.sub-links-leave-to {
    max-height: 0px;
}

/* .sub-links-enter-to,
.sub-links-leave-from {
    max-height: none;
} */
</style>