<template>
    <n-data-table :columns="columns" :data="all_oder" :pagination="false" :bordered="false" />
    <n-tabs type="line" animated>
        <n-tab-pane name="出售中" tab="未付款">

        </n-tab-pane>
        <n-tab-pane name="已下架" tab="已付款">
            <n-data-table :columns="columns" :data="all_oder" :pagination="false" :bordered="false" />
        </n-tab-pane>
    </n-tabs>
</template>

<script setup lang="ts">
import { NButton, NDataTable, useMessage } from 'naive-ui'
import type { DataTableColumns } from 'naive-ui'
import { h, ref, onMounted } from 'vue'
import axios from 'axios'
import { useRoute } from 'vue-router'
const route = useRoute()

type OrderProp = {
    id: number
    product: string
    price: number
    number: number
    sum: number
}
const columns: DataTableColumns<OrderProp> = [
    {
        title: '编号',
        key: 'id',
    },
    {
        title: '商品',
        key: 'product',
    },
    {
        title: '价格',
        key: 'price',
    },
    {
        title: '数量',
        key: 'number',
    },
    {
        title: '总计',
        key: 'sum',
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
                    onClick: () => alert(`Play ${row.product}`),
                },
                { default: () => '编辑' }
            )
        },
    },
]
const all_oder = ref([])
onMounted(async () => {
    try {
        const data = {
            id: route.params.id
        }
        await axios.post('http://localhost:8000/management/order', data, {
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

<style scoped></style>