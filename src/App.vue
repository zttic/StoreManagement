<template>
  <n-message-provider>
    <n-dialog-provider>
      <div v-if="isMobile()">
        <RouterView />
      </div>
      <div v-else>
        <RouterView />
      </div>
    </n-dialog-provider>
  </n-message-provider>

</template>


<script setup lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import Login from './components/Login.vue'
import SideBar from './components/SideBar.vue'
import Dashboard from "./components/Dashboard.vue"
import { useMessage } from 'naive-ui'


function isMobile() {
   if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
      console.log('mobile')
      return true
   } else {
      console.log('desktop')
      return false
   }
}


</script>


<style scoped>

</style>
