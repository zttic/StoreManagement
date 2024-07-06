/<script setup lang="ts">
import router from '@/router';
import ProductForm from './ProductForm.vue';
import { ref, onMounted, onBeforeMount } from 'vue';
import type { FormInst, UploadFileInfo } from 'naive-ui'
import axios from "axios"

import { useRoute } from "vue-router"
const route = useRoute()
const productId = route.params.id
const productData = ref({'1111':111});


async function initialForm() {
  console.log("start initial form")
  await axios.get(`http://localhost:8000/management/product/${productId}`).then((res) => {
    productData.value = res.data;
    console.log("productData: ", productData)
  }).catch((err) => {
    console.log(err)
  })
}

// 初始化表单数据
onBeforeMount(() => {
  console.log("productdetail start")
  initialForm()
  
})

function cancel() {
  window.history.back();
  // router.push('/product/');
}
</script>

<template>
  <ProductForm :initialData="productData">
    <template v-slot:edit>
      <div style="text-align: center; margin-bottom: 30px;">
        <n-button attr-type="button" color="#111111" style="margin-right: 30px;">
          保存
        </n-button>
        <n-button attr-type="button" color="#111111" @click="cancel">
          取消
        </n-button>
      </div>
      <div style="text-align: center;">
        <n-button attr-type="button" color="#a60101">
          删除
        </n-button>
      </div>
    </template>
  </ProductForm>
</template>

<style scoped>

</style>