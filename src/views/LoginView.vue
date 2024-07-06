<template>
    <div class="login-view">
        <div class="login-box">
            <n-gradient-text class="login-title">
                <h1>2024</h1>
            </n-gradient-text>
            <n-form
            ref="formRef"
            :model="formValue"
            :rules="rules"
            >
                <n-form-item label="同户名" path="user.name">
                    <n-input v-model:value="formValue.user.name" placeholder="输入用户名" />
                </n-form-item>
                <n-form-item label="密码" path="user.pwd">
                    <n-input 
                        v-model:value="formValue.user.pwd"
                        placeholder="输入密码"
                        type="password"
                        show-password-on="click"
                    />
                    
                </n-form-item>
                <n-form-item>
                    <n-button attr-type="button" @click="handleLogin" color="#111111">
                    登录
                    </n-button>
                </n-form-item>
            </n-form>
        </div>

    </div>
    

</template>

<script setup lang="ts">
import Login from '../components/Login.vue'
import axios from "axios"
import { ref } from "vue"
import { useMessage } from 'naive-ui'
import type { FormInst } from 'naive-ui'
import router from '@/router'

const formRef = ref<FormInst | null>(null)

const formValue = ref({
    user: {
        name: '',
        pwd: ''
    }
})
const rules = {
    user: {
        name: {
            required: true,
            message: '输入用户名',
            trigger: 'blur'
        },
        pwd: {
            required: true,
            message: '输入密码',
            trigger: ['change', 'blur']
        }
    }
}

async function handleLogin() {
    const form = formValue.value
    await formRef.value?.validate((errors) => {
        if (errors) {
            return
        }
    })
    try {
        const data = new FormData()
        data.append("username", form.user.name)
        data.append("password", form.user.pwd)
        await axios.post("http://localhost:8000/management/login/", data, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        })
            .then(res => {
                console.log(res)
                if (res.status === 200) {
                    router.push('/product')
                } else if (res.status === 501) {
                    alert("用户名或密码不正确")
                }
            })
            .catch(err => {
                console.log(err)
                alert("登录失败")
            })
    } catch (error) {
        console.log(error)
    }

}


</script>
<style lang="scss" scoped>
.login-view {
    width: 100%;
    height: 100%;
    min-height: 100vh;
    background-color: #f5f5f5;
    background-size: cover;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    .login-box {
        width: 400px;
        height: 400px;
        background-color: #ffffff;
        border-radius: 10px;
        padding: 20px;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        margin: auto;
        margin-top: 50px;
        box-shadow: 0 0 10px #cccccc;
        .login-title {
            margin-bottom: 20px;
            text-align: center;
        }
    }
}
</style>

