<script setup lang="ts">
import { ref } from 'vue';
import axios from 'axios'
const value = ref('');

const list = ref([]);
const loading = ref(false);
const finished = ref(false);

const all_product = ref([])
onMounted(async () => {
    try {
        await axios.get('http://localhost:8000/management/test/', {
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => {
                console.log(res)
                if (res.status === 200) {
                    all_product.value = res.data
                    loading.value = false;
                    finished.value = true;
                }
            })
            .catch(err => {
                loading.value = false;
                finished.value = true;
                console.log(err)
            })
    } catch (error) {
        console.error('请求失败:', error);
        console.log('failded');
        
    }
})


const testdata = [
    { name: 'pizza', price: 12},
]
</script>

<template>
    <van-search v-model="value" placeholder="请输入搜索关键词" />
    <van-list>
        <van-cell v-for="item in testdata" :key="item.name" :title="item.name" :value="item.price" />
    </van-list>

    <van-list v-model:loading="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
        <van-cell v-for="item in all_product" :key="item.name" :title="item.name" :value="item.price" />
    </van-list>
</template>

<style scoped>

</style>