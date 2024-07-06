<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios'

const user = ref([
    { username: '', password: '' },
])

async function login() {
    await axios.post('http://localhost:8000/management/login/', {
        username: user.value.username,
        password: user.value.password
    }).then((res) => {
        if (res.data.code === 200) {
            router.push('/product')
        }
    }).catch((err) => {
        console.log(err)
    })
}

</script>

<template>
    <van-form @submit="login">
        <van-cell-group inset>
            <van-field v-model="user.username" name="用户名" label="用户名" placeholder="用户名"
                :rules="[{ required: true, message: '请填写用户名' }]" />
            <van-field v-model="user.password" type="password" name="密码" label="密码" placeholder="密码"
                :rules="[{ required: true, message: '请填写密码' }]" />
        </van-cell-group>
        <div style="margin: 16px;">
            <van-button round block type="primary" native-type="submit">
                提交
            </van-button>
        </div>
    </van-form>
</template>