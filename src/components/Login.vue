<!-- Login.vue -->
<template>
    <n-space vertical style="padding-top: 10px; padding-left: 10px; padding-bottom: 50px; padding-right: 10px;">
        <n-form ref="formRef" :model="formValue" :rules="rules" label-placement="left" label-width="auto">
            <n-form-item label="用户名" path="product.name">
                <n-input v-model:value="user.username" placeholder="输入用户名" style="width: 200px;" />
            </n-form-item>

            <n-form-item label="密码" path="product.name">
                <n-input v-model:value="user.password" placeholder="输入密码" style="width: 200px;" />
            </n-form-item>

            <div style="text-align: center;">
                <n-button attr-type="button" @click="login" color="#111111">
                    登录
                </n-button>
            </div>
        </n-form>
    </n-space>
</template>

<script lang="ts" setup>
import { defineComponent, ref } from 'vue'
import axios from 'axios'
import router from '@/router'
axios.defaults.withCredentials = true;


const user = ref({
    username: '',
    password: ''
})

async function login() {
    console.log("Login function called");
    await axios.post('http://localhost:8000/management/login/', {
        username: user.value.username,
        password: user.value.password,
    }).then((res) => {
        console.log(res);
        if (res.status === 200) {
            console.log('登录成功');
            router.push('/product').catch(error => {
                console.error('路由跳转失败:', error);
            });
            console.log('跳转命令后');
        }
    }).catch((err) => {
        console.log(err)
    })
}
</script>

<style scoped>
/* 样式可以根据需要自定义 */
</style>
