<template>
    <n-tabs type="line" animated>
        <n-tab-pane name="添加商品" tab="添加商品">

            <n-space vertical>
                <n-form ref="formRef" :model="formValue" :rules="rules" label-placement="left" label-width="auto">
                    <n-form-item label="类别" path="product.category">
                        <n-select v-model:value="formValue.product.category" placeholder="选择类别" :options="category"
                            style="width: 200px;" />
                    </n-form-item>

                    <n-form-item label="商品名称" path="product.name">
                        <n-input v-model:value="formValue.product.name" placeholder="输入商品名称" style="width: 200px;" />
                    </n-form-item>


                    <n-form-item label="单位" path="product.unit">
                        <n-select v-model:value="formValue.product.unit" placeholder="选择单位" :options="unit"
                            style="width: 200px;" />

                    </n-form-item>

                    <n-form-item label="封面图片" path="image.cover">
                        <n-upload :custom-request="uploadImage" @remove="removeImage($event, 'cover')"
                            list-type="image-card" max="1" :action="uploadAction" data="cover"
                            v-model:file-list="coverInstance">
                        </n-upload>
                    </n-form-item>

                    <n-form-item label="其它图片" path="image.other">
                        <n-upload :custom-request="uploadImage" list-type="image-card" :action="uploadAction" max="12"
                            data="other" @remove="removeImage($event, 'other')" v-model:file-list="otherInstance">
                        </n-upload>
                    </n-form-item>

                    <n-form-item label="型号">
                        <n-data-table :data="item" :columns="createColumns" :pagination="false" :bordered="false"
                            :stripe="false" :show-header="false" :show-summary="false" :show-pagination="false"
                            :show-quick-jumper="false" :show-size-picker="false" :show-total="false"
                            :show-elevator="false" />

                    </n-form-item>

                    <n-form-item label=" ">
                        <n-button attr-type="button" @click="addItem" color="#111111">
                            增加
                        </n-button>
                    </n-form-item>

                    <n-form-item label="上架" path="product.isSale">
                        <n-switch v-model:value="formValue.product.isSale" />
                    </n-form-item>

                    <div style="text-align: center;">
                        <n-button attr-type="button" @click="submitProduct" color="#111111">
                            添加商品
                        </n-button>
                    </div>
                </n-form>
            </n-space>
        </n-tab-pane>

        <n-tab-pane name="添加属性" tab="添加属性">
            <PropertyAdd />
        </n-tab-pane>
    </n-tabs>


</template>

<script setup lang="ts">
import axios from "axios"
import { ref, h, onMounted } from "vue"
import { useMessage, NInput, NButton } from 'naive-ui'
import type { FormInst, UploadFileInfo } from 'naive-ui'
import PropertyAdd from './PropertyAdd.vue'

// 初始化
onMounted(() => {
    getCategory()
    getUnit()
})
const category = ref([])
const coverInstance = ref<UploadFileInfo[]>()
const otherInstance = ref<UploadFileInfo[]>()
const item = ref([
    { name: '', price: '' },
])
async function getCategory() {
    await axios.get("http://localhost:8000/management/category/")
        .then(res => {
            category.value = res.data.map((item: { name: string; id: any }) => ({
                label: item.name,
                value: item.id
            }))
        })
        .catch(err => {
            console.log(err)
        })
}
const unit = ref([])
async function getUnit() {
    await axios.get("http://localhost:8000/management/unit/")
        .then(res => {
            unit.value = res.data.map((item: { name: any; id: any }) => ({
                label: item.name,
                value: item.id
            }));
            console.log("success")
            console.log(res.data)
        })
        .catch(err => {
            console.log(err)
        })
}



// 表单数据
const message = useMessage()
const formRef = ref<FormInst | null>(null)
const formValue = ref({
    product: {
        category: '',
        name: '',
        unit: '',
        isSale: true,
    },
    image: {
        cover: [] as any[],
        other: [] as any[]
    },
})
const rules = {
    product: {
        category: {
            type: 'number',
            required: true,
            message: '请选择类别', 
            trigger: ['blur', 'change'],
        },
        name: {
            required: true,
            message: '请输入商品名称',
            trigger: ['blur', 'change']
        },
        unit : {
            type: 'number',
            required: true,
            message: '选择单位',
            trigger: ['blur', 'change']
        },
    },
    image: {
        cover : {
            type: 'array',
            required: true,
            message: '请上传封面图片',
            max: 1,
            trigger: ['blur', 'change']
        },
        other : {
            type: 'array',
            required: false,
            message: '请上传展示图片',
            max: 3,
            trigger: ['blur', 'change']
        }
    },
    item: {
        model: {
            required: true,
            message: '请输入型号',
            trigger: 'blur'
        },
        price: {
            required: true,
            type: 'number',
            message: '请输入价格',
            trigger: 'blur'
        }
    }
}

// 设置型号
import type { DataTableColumns } from 'naive-ui'

type ProductProp = {
    name: string
    price: string
}
const createColumns: DataTableColumns<ProductProp> = [
    {
        title: '型号',
        key: 'name',
        render(row, index) {
            return h(NInput, {
                value: row.name,
                placeholder: '输入型号',
                onUpdateValue(v) {
                    item.value[index].name = v
                }
            })
        }
    },
    {
        title: '价格',
        key: 'price',
        render(row, index) {
            return h(NInput, {
                value: row.price,
                placeholder: '输入价格',
                onUpdateValue(v) {
                    item.value[index].price = v
                }
            })
        }
    },
    {
        title: '操作',
        key: 'delete',
        render(row, index) {
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
                        onClick: () => deleteItem(row, index)
                    },
                    {
                        default: () => '删除'
                    }
                )
            ]);
        }
    }
]
function deleteItem(row: any, index: number) {
    if (item.value.length === 1) {
        message.info('至少需要一个型号')
        return
    }
    item.value.splice(index, 1)
    message.info('成功删除')
}
function addItem(row: any) {
    item.value.push({ name: '', price: '' })
}




axios.defaults.withCredentials = false;

const uploadAction = ref('')
async function uploadImage(fileInfo: any) {
    // console.log(fileInfo)
    if (fileInfo.data === "other") {
        console.log("judge")
        if (formValue.value.image.other.includes(fileInfo.file.name)) {
            return
        }
    }
    const timestamp = Date.now();
    fileInfo.file.name = `${timestamp}-${fileInfo.file.name}`;
    const fileName = fileInfo.file.name;
    try {
        // 发送 POST 请求到服务器端的图片上传 API
        const response = await axios.post("http://localhost:8000/management/upload-image-to-cos/", {
            key: fileName,
        });

        // 根据需要，发送 PUT 请求到预签名 URL
        const uploadUrl = response.data.url;  // 假定响应中包含预签名 URL

        const putResponse = await axios.put(uploadUrl, fileInfo.file.file as File);
        if (fileInfo.data === "cover") {
            formValue.value.image.cover.push(fileName)
        } else {
            formValue.value.image.other.push(fileName)
        }
        // formValue.value.image.cover.push(fileName)
        console.log("formValue", formValue.value)
    } catch (error) {
        console.error("Upload failed:", error);
        fileInfo.remove();
        alert("上传失败，请重试");
    }
}

// 移除图片
async function removeImage(fileInfo: any, type: string) {
    console.log("delete image...")
    await axios.post("http://localhost:8000/management/delete-image-from-cos/", {
        key: fileInfo.file.name
    })
        .then(res => {
            if (type === "cover") {
                console.log("delete cover")
                const index = formValue.value.image.cover.indexOf(fileInfo.file.name);
                if (index > -1) {
                    formValue.value.image.cover.splice(index, 1)
                }
            } else {
                console.log("delete other")
                const index = formValue.value.image.other.indexOf(fileInfo.file.name);
                if (index > -1) {
                    formValue.value.image.other.splice(index, 1)
                }
            }

        })
        .catch(err => {
            console.log(err)
        })
}

// 商品上传
async function submitProduct() {
    const form = formValue.value
    await formRef.value?.validate((errors) => {
        if (errors) {
            return
        }
    })
    try {
        const itemData = item.value
        const otherImage = form.image.other
        console.log("Items data:", JSON.stringify(itemData));
        console.log("Gallery data:", JSON.stringify(otherImage));
        const galleryObjects = otherImage.map(filename => ({
            imgurl: filename
        }));
        const jsonData = {
            name: form.product.name,
            unit: form.product.unit,
            categoryId: form.product.category,
            isShow: form.product.isSale.toString(),
            imgurl: form.image.cover[0], // 注意：如果 imgurl 是文件，这种方法不适用，需另行处理
            gallery: galleryObjects,  // 直接作为数组或对象
            item: itemData      // 直接作为数组或对象
        };
        await axios.post("http://localhost:8000/management/product/", jsonData, {
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(res => {
            console.log(res)
            alert("添加成功")
            //清空表单
            formValue.value.product.name = ''
            formValue.value.product.unit = ''
            formValue.value.product.category = ''
            formValue.value.product.isSale = true
            formValue.value.image.cover = []
            formValue.value.image.other = []
            console.log("cover:", coverInstance)
            item.value = [{ name: '', price: '' }]
            coverInstance.value = []
            otherInstance.value = []

        })
        .catch(err => {
            console.log(err)
            if (err.response.status === 400) {
                alert("商品名称已存在")
            }
            else {
                alert("添加失败, 请重试")
            }
        })

    } catch (error) {
        console.log(error)
    }

}

</script>

<style scoped>
</style>