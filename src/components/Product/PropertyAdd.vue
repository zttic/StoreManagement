/<script setup lang="ts">
import { ref } from 'vue';
import axios from 'axios'
const category = ref('')
const unit = ref('')

async function addCategory() {
    console.log("addCategory")
    console.log(category.value)
    await axios.post('http://localhost:8000/management/category/', {
        name: category.value
    }).then(res => {
        console.log(res)
        category.value = ''
        alert("添加成功")
    }).catch(err => {
        console.log(err)
    })
}

async function addUnit() {
    console.log("unitAdd")
    await axios.post('http://localhost:8000/management/unit/', {
        name: unit.value
    }).then(res => {
        console.log(res)
        unit.value = ''
        alert("添加成功")
    }).catch(err => {
        console.log(err)
    })
}

</script>

<template>
    <div>
        <n-space vertical>
            <n-space horizontal>
                <n-input placeholder="请输入类别" v-model:value="category" />
                <n-button @click="addCategory">添加类别</n-button>
            </n-space>
            <n-space horizontal>
                <n-input placeholder="请输入单位" v-model:value="unit" />
                <n-button @click="addUnit">添加单位</n-button>
            </n-space>
        </n-space>
    </div>
</template>

<style scoped>

</style>