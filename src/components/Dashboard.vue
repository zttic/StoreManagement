<template>
    <div class="dashboard">
        <h1>主页</h1>

        <div class="data-card">
            <h2>用户数量</h2>
            <p>{{ totalUsers }}</p>
        </div>

        <div class="data-card">
            <h2>订单数量</h2>
            <p>{{ totalOrders }}</p>
        </div>

        <div class="data-card">
            <h2>销售额</h2>
            <p>{{ revenue }}</p>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    setup() {
        return {
            totalUsers: 100,   // 模拟数据：总用户数
            totalOrders: 500,  // 模拟数据：总订单数
            revenue: '$50,000', // 模拟数据：收入
        }
    },
})

</script>

<style scoped>

</style>