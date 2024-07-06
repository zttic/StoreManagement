<script setup lang="ts">
const result = ref('');
const showPicker = ref(false);
const columns = [
    { text: '个', value: '个' },
    { text: '斤', value: '斤' },
    { text: '箱', value: '箱' },
    { text: '克', value: '克' },
    { text: '张', value: '张' },
    { text: '卷', value: '卷' },
    { text: '瓶', value: '瓶' },
    { text: '袋', value: '袋' },
    { text: '盒', value: '盒' },
    { text: '桶', value: '桶' },
    { text: '罐', value: '罐' },
    { text: '支', value: '支' },
    { text: '根', value: '根' },
    { text: '条', value: '条' },
    { text: '只', value: '只' },
    { text: '千克', value: '千克' },
    { text: '升', value: '升' },
    { text: '毫升', value: '毫升' },
    { text: '千克', value: '千克' },
    { text: '升', value: '升' },
    { text: '毫升', value: '毫升' },
    { text: '千克', value: '千克' },
    { text: '升', value: '升' },
    { text: '毫升', value: '毫升' },
    { text: '千克', value: '千克' },
    { text: '升', value: '升' },
    { text: '毫升', value: '毫升' },
    { text: '千克', value: '千克' },
    { text: '升', value: '升' },
    { text: '毫升', value: '毫升' },
    { text: '千克', value: '千克' },
    { text: '升', value: '升' },
    { text: '毫升', value: '毫升' },
    { text: '千克', value: '千克' },
    { text: '升', value: '升' },
];

const onConfirm = ({ selectedOptions }) => {
    result.value = selectedOptions[0]?.text;
    showPicker.value = false;
};

const cover = ref([
    
]);

const fileList = ref([
    { url: 'https://img.yzcdn.cn/vant/leaf.jpg' },
    { url: 'https://img.yzcdn.cn/vant/tree.jpg' },
]);

const checked = ref(true);

const item = ref([])
const createColumns: DataTableColumns<ProductProp> = [
    {
        title: '型号',
        key: 'model',
    },
    {
        title: '售价',
        key: 'price',
    },
    {
        title: 'Action',
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
                        onClick: () => message.info('按钮3')
                    },
                    {
                        default: () => '删除'
                    }
                )
            ]);
        }
    }
]

</script>

<template>
    <van-form @submit="onSubmit">
        <van-cell-group inset>

            <van-field v-model="result" is-link readonly name="picker" label="类别" placeholder="点击选择类别"
                @click="showPicker = true" :rules="[{ required: true }]" />
            <van-popup v-model:show="showPicker" position="bottom">
                <van-picker :columns="columns" @confirm="onConfirm" @cancel="showPicker = false" />
            </van-popup>


            <van-field v-model="username" name="商品名称" label="商品名称" placeholder="商品名称"
                :rules="[{ required: true, message: '请填写商品名称' }]" />

            <van-field v-model="username" name="价格" label="价格" placeholder="价格"
                :rules="[{ required: true, message: '请填写商品价格' }]" />

            <van-field v-model="result" is-link readonly name="picker" label="单位" placeholder="点击选择单位"
                @click="showPicker = true" :rules="[{ required: true }]" />
            <van-popup v-model:show="showPicker" position="bottom">
                <van-picker :columns="columns" @confirm="onConfirm" @cancel="showPicker = false" />
            </van-popup>

            <van-field name="uploader" label="封面图片">
                <template #input>
                    <van-uploader v-model="cover" multiple :max-count="1" />
                </template>
            </van-field>
            <van-field name="uploader" label="更多图片">
                <template #input>
                    <van-uploader v-model="fileList" multiple :max-count="5" />
                </template>
            </van-field>

            <van-field label="货号">
                <template #input>
                    <n-data-table :data="item" :columns="createColumns" :pagination="false" :bordered="false"
                        :stripe="false" :show-header="false" :show-summary="false" :show-pagination="false"
                        :show-quick-jumper="false" :show-size-picker="false" :show-total="false" :show-elevator="false"
                        :row-key="row => row.name" />

                </template>
                <van-button round block type="primary" native-type="submit">
                    添加
                </van-button>

            </van-field>

            <van-field label="上架">
                <template #input>
                    <van-switch v-model="checked" />
                </template>
            </van-field>


        </van-cell-group>
        <div style="margin: 16px;">
            <van-button round block type="primary" native-type="submit">
                添加
            </van-button>
        </div>
    </van-form>
</template>

<style scoped></style>