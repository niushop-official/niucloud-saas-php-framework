<template>
    <div v-for="(item, index) in value">
        <div class="flex items-center mb-[8px]" v-if="item.privacy_key == 'UserInfo'">
            为了<div class="!w-[200px] inline-block mx-[5px]"><el-input v-model="value[index].privacy_text" :placeholder="t('settingPlaceholder')"/></div>，开发者将在获取你的明示同意后，收集你的微信昵称、头像。
            <icon name="element Remove" @click="removeSettingList(index)" color="red" class="cursor-pointer"></icon>
        </div>
        <div class="flex items-center mb-[8px]" v-if="item.privacy_key == 'Location'">
            为了<div class="!w-[200px] inline-block mx-[5px]"><el-input v-model="value[index].privacy_text" :placeholder="t('settingPlaceholder')"/></div>，开发者将在获取你的明示同意后，收集你的位置信息。
            <icon name="element Remove" @click="removeSettingList(index)" color="red" class="cursor-pointer"></icon>
        </div>
        <div class="flex items-center mb-[8px]" v-if="item.privacy_key == 'PhoneNumber'">
            为了<div class="!w-[200px] inline-block mx-[5px]"><el-input v-model="value[index].privacy_text" :placeholder="t('settingPlaceholder')"/></div>，开发者将在获取你的明示同意后，收集你的手机号。
            <icon name="element Remove" @click="removeSettingList(index)" color="red" class="cursor-pointer"></icon>
        </div>
        <div class="flex items-center mb-[8px]" v-if="item.privacy_key == 'Address'">
            开发者收集你的地址，用于<div class="!w-[200px] inline-block mx-[5px]"><el-input v-model="value[index].privacy_text" :placeholder="t('settingPlaceholder')"/></div>
            <icon name="element Remove" @click="removeSettingList(index)" color="red" class="cursor-pointer"></icon>
        </div>
        <div class="flex items-center mb-[8px]" v-if="item.privacy_key == 'Record'">
            为了<div class="!w-[200px] inline-block mx-[5px]"><el-input v-model="value[index].privacy_text" :placeholder="t('settingPlaceholder')"/></div>，开发者将在获取你的明示同意后，访问你的麦克风。
            <icon name="element Remove" @click="removeSettingList(index)" color="red" class="cursor-pointer"></icon>
        </div>
        <div class="flex items-center mb-[8px]" v-if="item.privacy_key == 'Contact'">
            开发者使用你的通讯录（仅写入）权限，用于<div class="!w-[200px] inline-block mx-[5px]"><el-input v-model="value[index].privacy_text" :placeholder="t('settingPlaceholder')"/></div>
            <icon name="element Remove" @click="removeSettingList(index)" color="red" class="cursor-pointer"></icon>
        </div>
        <div class="flex items-center mb-[8px]" v-if="item.privacy_key == 'EXOrderInfo'">
            开发者收集你的订单信息，用于<div class="!w-[200px] inline-block mx-[5px]"><el-input v-model="value[index].privacy_text" :placeholder="t('settingPlaceholder')"/></div>
            <icon name="element Remove" @click="removeSettingList(index)" color="red" class="cursor-pointer"></icon>
        </div>
        <div class="flex items-center mb-[8px]" v-if="item.privacy_key == 'EXUserOpLog'">
            开发者收集你的操作日志，用于<div class="!w-[200px] inline-block mx-[5px]"><el-input v-model="value[index].privacy_text" :placeholder="t('settingPlaceholder')"/></div>
            <icon name="element Remove" @click="removeSettingList(index)" color="red" class="cursor-pointer"></icon>
        </div>
        <div class="flex items-center mb-[8px]" v-if="item.privacy_key == 'BlueTooth'">
            开发者访问你的蓝牙，用于<div class="!w-[200px] inline-block mx-[5px]"><el-input v-model="value[index].privacy_text" :placeholder="t('settingPlaceholder')"/></div>
            <icon name="element Remove" @click="removeSettingList(index)" color="red" class="cursor-pointer"></icon>
        </div>
        <div class="flex items-center mb-[8px]" v-if="item.privacy_key == 'MessageFile'">
            开发者收集你选中的文件，用于<div class="!w-[200px] inline-block mx-[5px]"><el-input v-model="value[index].privacy_text" :placeholder="t('settingPlaceholder')"/></div>
            <icon name="element Remove" @click="removeSettingList(index)" color="red" class="cursor-pointer"></icon>
        </div>
        <div class="flex items-center mb-[8px]" v-if="item.privacy_key == 'Compass'">
            开发者调用你的磁场传感器，用于<div class="!w-[200px] inline-block mx-[5px]"><el-input v-model="value[index].privacy_text" :placeholder="t('settingPlaceholder')"/></div>
            <icon name="element Remove" @click="removeSettingList(index)" color="red" class="cursor-pointer"></icon>
        </div>
        <div class="flex items-center mb-[8px]" v-if="item.privacy_key == 'Clipboard'">
            开发者读取你的剪切板，用于<div class="!w-[200px] inline-block mx-[5px]"><el-input v-model="value[index].privacy_text" :placeholder="t('settingPlaceholder')"/></div>
            <icon name="element Remove" @click="removeSettingList(index)" color="red" class="cursor-pointer"></icon>
        </div>
        <div class="flex items-center mb-[8px]" v-if="item.privacy_key == 'DeviceMotion'">
            开发者调用你的方向传感器，用于<div class="!w-[200px] inline-block mx-[5px]"><el-input v-model="value[index].privacy_text" :placeholder="t('settingPlaceholder')"/></div>
            <icon name="element Remove" @click="removeSettingList(index)" color="red" class="cursor-pointer"></icon>
        </div>
        <div class="flex items-center mb-[8px]" v-if="item.privacy_key == 'ChooseLocation'">
            开发者获取你选择的位置信息，用于<div class="!w-[200px] inline-block mx-[5px]"><el-input v-model="value[index].privacy_text" :placeholder="t('settingPlaceholder')"/></div>
            <icon name="element Remove" @click="removeSettingList(index)" color="red" class="cursor-pointer"></icon>
        </div>
        <div class="flex items-center mb-[8px]" v-if="item.privacy_key == 'CalendarWriteOnly'">
            开发者使用你的日历（仅写入）权限，用于<div class="!w-[200px] inline-block mx-[5px]"><el-input v-model="value[index].privacy_text" :placeholder="t('settingPlaceholder')"/></div>
            <icon name="element Remove" @click="removeSettingList(index)" color="red" class="cursor-pointer"></icon>
        </div>
        <div class="flex items-center mb-[8px]" v-if="item.privacy_key == 'AlbumWriteOnly'">
            为了<div class="!w-[200px] inline-block mx-[5px]"><el-input v-model="value[index].privacy_text" :placeholder="t('settingPlaceholder')"/></div> ，开发者将在获取你的明示同意后，使用你的相册（仅写入）权限。
            <icon name="element Remove" @click="removeSettingList(index)" color="red" class="cursor-pointer"></icon>
        </div>
        <div class="flex items-center mb-[8px]" v-if="item.privacy_key == 'EXUserPublishContent'">
            开发者收集你的发布内容，用于<div class="!w-[200px] inline-block mx-[5px]"><el-input v-model="value[index].privacy_text" :placeholder="t('settingPlaceholder')"/></div>
            <icon name="element Remove" @click="removeSettingList(index)" color="red" class="cursor-pointer"></icon>
        </div>
        <div class="flex items-center mb-[8px]" v-if="item.privacy_key == 'DeviceInfo'">
            开发者收集你的设备信息，用于<div class="!w-[200px] inline-block mx-[5px]"><el-input v-model="value[index].privacy_text" :placeholder="t('settingPlaceholder')"/></div>
            <icon name="element Remove" @click="removeSettingList(index)" color="red" class="cursor-pointer"></icon>
        </div>
        <div class="flex items-center mb-[8px]" v-if="item.privacy_key == 'Album'">
            开发者收集你选中的照片或视频信息，用于<div class="!w-[200px] inline-block mx-[5px]"><el-input v-model="value[index].privacy_text" :placeholder="t('settingPlaceholder')"/></div>
            <icon name="element Remove" @click="removeSettingList(index)" color="red" class="cursor-pointer"></icon>
        </div>
        <div class="flex items-center mb-[8px]" v-if="item.privacy_key == 'Invoice'">
            开发者收集你的发票信息，用于<div class="!w-[200px] inline-block mx-[5px]"><el-input v-model="value[index].privacy_text" :placeholder="t('settingPlaceholder')"/></div>
            <icon name="element Remove" @click="removeSettingList(index)" color="red" class="cursor-pointer"></icon>
        </div>
        <div class="flex items-center mb-[8px]" v-if="item.privacy_key == 'RunData'">
            为了<div class="!w-[200px] inline-block mx-[5px]"><el-input v-model="value[index].privacy_text" :placeholder="t('settingPlaceholder')"/></div>，开发者将在获取你的明示同意后，收集你的微信运动步数。
            <icon name="element Remove" @click="removeSettingList(index)" color="red" class="cursor-pointer"></icon>
        </div>
        <div class="flex items-center mb-[8px]" v-if="item.privacy_key == 'Camera'">
            为了<div class="!w-[200px] inline-block mx-[5px]"><el-input v-model="value[index].privacy_text" :placeholder="t('settingPlaceholder')"/></div>，开发者将在获取你的明示同意后，访问你的摄像头。
            <icon name="element Remove" @click="removeSettingList(index)" color="red" class="cursor-pointer"></icon>
        </div>
        <div class="flex items-center mb-[8px]" v-if="item.privacy_key == 'EXUserFollowAcct'">
            开发者收集你的所关注账号，用于<div class="!w-[200px] inline-block mx-[5px]"><el-input v-model="value[index].privacy_text" :placeholder="t('settingPlaceholder')"/></div>
            <icon name="element Remove" @click="removeSettingList(index)" color="red" class="cursor-pointer"></icon>
        </div>
        <div class="flex items-center mb-[8px]" v-if="item.privacy_key == 'EXIDNumber'">
            开发者收集你的身份证号码，用于<div class="!w-[200px] inline-block mx-[5px]"><el-input v-model="value[index].privacy_text" :placeholder="t('settingPlaceholder')"/></div>
            <icon name="element Remove" @click="removeSettingList(index)" color="red" class="cursor-pointer"></icon>
        </div>
        <div class="flex items-center mb-[8px]" v-if="item.privacy_key == 'LicensePlate'">
            为了<div class="!w-[200px] inline-block mx-[5px]"><el-input v-model="value[index].privacy_text" :placeholder="t('settingPlaceholder')"/></div>，开发者将在获取你的明示同意后，收集你的车牌号。
            <icon name="element Remove" @click="removeSettingList(index)" color="red" class="cursor-pointer"></icon>
        </div>
        <div class="flex items-center mb-[8px]" v-if="item.privacy_key == 'Email'">
            开发者收集你的邮箱，用于<div class="!w-[200px] inline-block mx-[5px]"><el-input v-model="value[index].privacy_text" :placeholder="t('settingPlaceholder')"/></div>
            <icon name="element Remove" @click="removeSettingList(index)" color="red" class="cursor-pointer"></icon>
        </div>
        <div class="flex items-center mb-[8px]" v-if="item.privacy_key == 'Accelerometer'">
            开发者调用你的加速传感器，用于<div class="!w-[200px] inline-block mx-[5px]"><el-input v-model="value[index].privacy_text" :placeholder="t('settingPlaceholder')"/></div>
            <icon name="element Remove" @click="removeSettingList(index)" color="red" class="cursor-pointer"></icon>
        </div>
        <div class="flex items-center mb-[8px]" v-if="item.privacy_key == 'Gyroscope'">
            开发者调用你的陀螺仪传感器，用于<div class="!w-[200px] inline-block mx-[5px]"><el-input v-model="value[index].privacy_text" :placeholder="t('settingPlaceholder')"/></div>
            <icon name="element Remove" @click="removeSettingList(index)" color="red" class="cursor-pointer"></icon>
        </div>
    </div>

    <el-dialog v-model="settingTypeDialog" :title="t('settingTypeTitle')" width="500px" :destroy-on-close="true">
        <el-checkbox-group v-model="checkList">
            <template v-for="(item, index) in privacyList">
                <el-checkbox :label="item.privacy_key" v-if="!checkIsSelected(item.privacy_key)">{{ item.privacy_text }}</el-checkbox>
            </template>
        </el-checkbox-group>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="settingTypeDialog = false">{{ t('cancel') }}</el-button>
                <el-button type="primary" @click="selectSettingType()">{{ t('confirm') }}</el-button>
            </span>
        </template>
    </el-dialog>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue'
import { t } from '@/lang'

const props = defineProps({
    modelValue: {
        type: Array,
        default: () => {
            return []
        }
    }
})

const settingTypeDialog = ref(false)

const privacyList = ref([
    { privacy_key: 'UserInfo', privacy_text: '用户信息（微信昵称、头像）' },
    { privacy_key: 'Location', privacy_text: '位置信息' },
    { privacy_key: 'Address', privacy_text: '地址' },
    { privacy_key: 'Invoice', privacy_text: '发票信息' },
    { privacy_key: 'RunData', privacy_text: '微信运动数据' },
    { privacy_key: 'Record', privacy_text: '麦克风' },
    { privacy_key: 'Album', privacy_text: '选中的照片或视频信息' },
    { privacy_key: 'Camera', privacy_text: '摄像头' },
    { privacy_key: 'PhoneNumber', privacy_text: '手机号码' },
    { privacy_key: 'Contact', privacy_text: '通讯录（仅写入）权限' },
    { privacy_key: 'DeviceInfo', privacy_text: '设备信息' },
    { privacy_key: 'EXIDNumber', privacy_text: '身份证号码' },
    { privacy_key: 'EXOrderInfo', privacy_text: '订单信息' },
    { privacy_key: 'EXUserPublishContent', privacy_text: '发布内容' },
    { privacy_key: 'EXUserFollowAcct', privacy_text: '所关注账号' },
    { privacy_key: 'EXUserOpLog', privacy_text: '操作日志' },
    { privacy_key: 'AlbumWriteOnly', privacy_text: '相册（仅写入）权限' },
    { privacy_key: 'LicensePlate', privacy_text: '车牌号' },
    { privacy_key: 'BlueTooth', privacy_text: '蓝牙' },
    { privacy_key: 'CalendarWriteOnly', privacy_text: '日历（仅写入）权限' },
    { privacy_key: 'Email', privacy_text: '邮箱' },
    { privacy_key: 'MessageFile', privacy_text: '选中的文件' },
    { privacy_key: 'ChooseLocation', privacy_text: '选择的位置信息' },
    { privacy_key: 'Accelerometer', privacy_text: '加速传感器' },
    { privacy_key: 'Compass', privacy_text: '磁场传感器' },
    { privacy_key: 'DeviceMotion', privacy_text: '方向传感器' },
    { privacy_key: 'Gyroscope', privacy_text: '陀螺仪传感器' },
    { privacy_key: 'Clipboard', privacy_text: '剪切板' }
])

const emits = defineEmits(['update:modelValue', 'change'])

const value = computed({
    get () {
        return props.modelValue
    },
    set (value) {
        emits('update:modelValue', value)
    }
})

const removeSettingList = (index: number) => {
    value.value.splice(index, 1)
}

const checkList = ref([])
const selectSettingType = () => {
    checkList.value.forEach((item: string) => {
        value.value.push({
            privacy_key: item,
            privacy_text: ''
        })
    })
    settingTypeDialog.value = false
    checkList.value = []
}

const addSettingList = () => {
    settingTypeDialog.value = true
}

const selectedSettingType = computed(() => {
    return value.value.map((item: any) => item.privacy_key)
})
const checkIsSelected = (key: string) => {
    return selectedSettingType.value.includes(key)
}

defineExpose({
    addSettingList
})
</script>

<style lang="scss" scoped></style>
