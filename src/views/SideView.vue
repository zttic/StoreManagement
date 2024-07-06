<template>
    <div class="container">
        <div class="side-bar">
            <SideBar />
        </div>
        <div class="content">
            <router-view />
        </div>
    </div>
</template>

<script setup lang="ts">
import SideBar from '../components/SideBar.vue'

</script>

<style scoped>
.container {
    display: flex;
}
.side-bar {
    flex: 1;
    /* width: auto; */
    background-color: #f0f0f0;
    min-height: 100vh;
}

.content {
    flex: 10;
    padding: 20px;
}
</style>