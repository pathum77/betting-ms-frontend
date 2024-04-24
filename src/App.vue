<template>
  <div>
    <NavigationLeft />
    <navigationTop />
    <router-view />
  </div>
</template>

<script setup>
  import NavigationLeft from "@/components/common/navigation-bars/navigation-left-com.vue";
  import navigationTop from "@/components/common/navigation-bars/navigation-top-com.vue";
</script>
