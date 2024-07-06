<script setup lang="ts">
    import axios from "axios"
    async function logout() {
        await axios.post('http://localhost:8000/management/logout/')
            .then(res => {
                console.log(res)
                if (res.status === 200) {
                    alert("退出成功")
                    router.push('/login').catch(error => {
                        console.error('路由跳转失败:', error);
                    });
                } else {
                    alert("退出失败")
                }
            })
            .catch(err => {
                console.log(err)
            })
    }

</script>

<template>
    <div style="text-align: center;">
        <n-button attr-type="button" @click="logout" color="#111111">
            退出登录
        </n-button>
    </div>
</template>

<style scoped>

</style>