<template>
    <n-tabs type="line" animated>
        <n-tab-pane name="出售中" tab="出售中">
            <n-data-table :data="product_onsale" :columns="createColumns" :pagination="false" :bordered="false"
                :stripe="false" :show-header="false" :show-summary="false" :show-pagination="false"
                :show-quick-jumper="false" :show-size-picker="false" :show-total="false" :show-elevator="false"
                :row-key="row => row.name" />
        </n-tab-pane>
        <n-tab-pane name="已下架" tab="已下架">
            <n-data-table :data="product_outsale" :columns="createColumns" :pagination="false" :bordered="false"
                :stripe="false" :show-header="false" :show-summary="false" :show-pagination="false"
                :show-quick-jumper="false" :show-size-picker="false" :show-total="false" :show-elevator="false"
                :row-key="row => row.name" />
        </n-tab-pane>
    </n-tabs>


</template>

<script setup lang="ts">
import { NButton, NDataTable, useMessage } from 'naive-ui'
import type { DataTableColumns } from 'naive-ui'
import { h, onMounted, ref } from 'vue'
import axios from 'axios'
import router from '@/router'

type ProductProp = {
    imgurl: string
    id: number
    name: string
    price: number
}
const message = useMessage()

const createColumns: DataTableColumns<ProductProp> = [
    {
        title: '图片',
        key: 'image',
        render: (row) => {
            return h('img', {
                src: row.imgurl,
                alt: row.name,
                style: {
                    width: '100px', // 可以调整适合你的表格的尺寸
                    height: 'auto'
                }
            });
        }
    },
    {
        title: '名称',
        key: 'name',
    },
    {
        title: '价格',
        key: 'price',
    },
    {
        title: '操作',
        key: 'action',
        render(row) {
            return h('div', [
                h(
                    NButton,
                    {
                        strong: true,
                        tertiary: true,
                        size: 'small',
                        style: {
                            marginRight: '6px'
                        },
                        onClick: () => router.push(`/productdetails/${row.id}`)
                    },
                    {
                        default: () => '编辑'
                    }
                )
            ]);
        }
    }
]


const product_onsale = ref([])
const product_outsale = ref([])

onMounted(async () => {
    try {
        await axios.get('http://localhost:8000/management/product/', {
            headers: {
                'Content-Type': 'application/json'
            },
            withCredentials: true
        })
        .then(res => {
            console.log(res)
            if (res.status === 200) {
                product_onsale.value = res.data
                console.log("success")
                console.log(res.data)
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