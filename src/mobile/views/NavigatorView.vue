<script setup lang="ts">
import Navigator from "../components/Navigator.vue";
</script>

<template>
    <div class="container">
        <div class="side-bar">
            <Navigator />
        </div>
        <div class="content" style="padding-top: 10px; padding-left: 10px; padding-bottom: 50px; padding-right: 10px">
            <router-view />
        </div>
    </div>
</template>
