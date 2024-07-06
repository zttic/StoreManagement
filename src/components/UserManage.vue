<template>
    <n-data-table
        :columns="columns"
        :data="all_users"
        :pagination="false"
        :bordered="false"
    />
</template>

<script setup lang="ts">
import { NButton, NDataTable, useMessage } from 'naive-ui'
import type { DataTableColumns } from 'naive-ui'
import { h, ref, onMounted } from 'vue'
import axios from 'axios'
type UserProp = {
    id: number
    name: string
    description: string
    price: string
    image: string
}

const columns: DataTableColumns<UserProp> = [
    {
        title: '用户名',
        key: 'name',
    },
    {
        title: '备注',
        key: 'description',
    },
    {
        title: '权限等级',
        key: 'level',
    },
    {
        title: '操作',
        key: 'action',
        render(row: UserProp) {
            return h(
                NButton,
                {
                    strong: true,
                    tertiary: true,
                    size: 'small',
                    onClick: () => alert(`Play ${row.name}`),
                },
                { default: () => '编辑' }
            )
        },
    },
]

const all_users = ref([])
onMounted(async () => {
    try {
        await axios.get('http://localhost:5000/user', {
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => {
                console.log(res)
                if (res.status === 200) {
                    all_users.value = res.data.result
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