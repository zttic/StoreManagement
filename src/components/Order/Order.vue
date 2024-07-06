<template>
    <n-tabs type="line" animated>
        <n-tab-pane name="未完成" tab="未完成">
            <n-data-table :columns="columns" :data="all_oder" :pagination="false" :bordered="false" />
        </n-tab-pane>
        <n-tab-pane name="已完成" tab="已完成">
            <n-data-table :columns="columns" :data="all_oder" :pagination="false" :bordered="false" />
        </n-tab-pane>
    </n-tabs>


</template>

<script setup lang="ts">
import { NButton, NDataTable, useMessage } from 'naive-ui'
import type { DataTableColumns } from 'naive-ui'
import { h, ref, onMounted } from 'vue'
import axios from 'axios'
import router from '@/router'

type OrderProp = {
    id: string
    user: string
    number: number
    sum_price: number
    date: string
    status: string
}
const columns: DataTableColumns<OrderProp> = [
    {
        title: '用户',
        key: 'user',
    },
    {
        title: '数量',
        key: 'number',
    },
    {
        title: '总金额',
        key: 'price',
    },
    {
        title: '日期',
        key: 'date',
    },
    {
        title: '状态',
        key: 'status',
    },
    {
        title: '操作',
        key: 'action',
        render(row: OrderProp) {
            return h(
                NButton,
                {
                    strong: true,
                    tertiary: true,
                    size: 'small',
                    onClick: () => router.push(`/orderDetails/${row.id}`),
                },
                { default: () => '查看' }
            )
        },
    },
]
const all_oder = ref([])
onMounted(async () => {
    try {
        await axios.get('http://localhost:8000/management/order', {
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => {
                console.log(res)
                if (res.status === 200) {
                    all_oder.value = res.data.result
                }
            })
            .catch(err => {
                console.log(err)
            })
    } catch (error) {
        console.error('请求失败:', error);
    }
})
</script>

<style scoped>

</style>