<template>
    <n-layout has-sider>
        <n-layout-sider
            bordered
            collapse-mode="width"
            :collapsed-width="64"
            :width="200"
            :native-scrollbar="false"
            style="max-height: 320px"
        >
            <n-menu :options="menuOptions"/>
        </n-layout-sider>
    </n-layout>
</template>

<script setup lang="ts">
import { NLayout, NLayoutSider, NIcon, NMenu } from 'naive-ui'
import type { MenuOption } from 'naive-ui'
import { h, type Component } from 'vue'
import { RouterLink } from 'vue-router'
import {
    StorefrontOutline as StoreIcone,
    PersonOutline as PersonIcon,
    AddCircleOutline as AddIcon,
    HomeOutline as HomeIcon,
    ReorderFour as OrderIcon,
    LogOutOutline as LogoutIcon,
} from '@vicons/ionicons5'

function renderIcon(icon: Component) {
    return () => h(NIcon, null, { default: () => h(icon) })
}
// const message = useMessage()
// function handleUpdateValue(key: string, item: MenuOption) {
//     message.info('[onUpdate:value]: ' + JSON.stringify(key))
//     message.info('[onUpdate:value]: ' + JSON.stringify(item))
// }

const menuOptions: MenuOption[] = [
    {
        label: () =>
            h(
                RouterLink,
                {
                    to: {
                        name: 'dashboard',
                        params: {
                            lang: 'zh-CN'
                        }
                    }
                },
                { default: () => '主页' }
            ),
        key: 'dashboard',
        icon: renderIcon(HomeIcon),
    },
    {
        label: () =>
            h(
                RouterLink,
                {
                    to: {
                        name: 'product',
                        params: {
                            lang: 'zh-CN'
                        }
                    }
                },
                { default: () => '商品' }
            ),
        key: 'product',
        icon: renderIcon(StoreIcone),
    },
    {
        label: () =>
            h(
                RouterLink,
                {
                    to: {
                        name: 'productadd',
                        params: {
                            lang: 'zh-CN'
                        }
                    }
                },
                { default: () => '商品添加' }
            ),
        key: 'productAdd',
        icon: renderIcon(AddIcon),
    },
    {
        label: () =>
            h(
                RouterLink,
                {
                    to: {
                        name: 'user',
                        params: {
                            lang: 'zh-CN'
                        }
                    }
                },
                { default: () => '用户管理' }
            ),
        key: 'userManage',
        icon: renderIcon(PersonIcon),
    },
    {
        label: () =>
            h(
                RouterLink,
                {
                    to: {
                        name: 'order',
                        params: {
                            lang: 'zh-CN'
                        }
                    }
                },
                { default: () => '订单' }
            ),
        key: 'order',
        icon: renderIcon(OrderIcon),
    },
    {
        label: '退出登录',
        key: 'logout',
        icon: renderIcon(LogoutIcon),
    },
]

function logout() {
    
}

</script>


<style scoped>
.sidebar {
    /* width: 250px; */
    background-color: #333;
    color: #fff;
    position: fixed;
    height: 100%;
    left: 0;
}

.sidebar h2 {
    padding: 10px;
}

.sidebar ul {
    list-style-type: none;
    padding: 0;
}

.sidebar li {
    padding: 10px;
}

.sidebar a {
    text-decoration: none;
    color: #fff;
}

.sidebar a:hover {
    background-color: #555;
}
</style>


