<script setup lang='ts'>
import { ref } from 'vue';

const active = ref(0);

</script>

<template>
    <van-tabbar v-model="active">
        <van-tabbar-item replace to="/productadd" name="productadd" icon="home-o">添加</van-tabbar-item>
        <van-tabbar-item replace to="/product" name="product" icon="search">查看</van-tabbar-item>
        <van-tabbar-item replace to="/order" name="order" icon="setting-o">订单</van-tabbar-item>
        <van-tabbar-item replace to="/setting" name="setting" icon="setting-o">设置</van-tabbar-item>
    </van-tabbar>
</template>