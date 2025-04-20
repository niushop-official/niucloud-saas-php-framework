<template>
    <div class="attachment-item text-sm mr-[10px] mb-[10px] w-[280px] rounded-lg overflow-hidden border border-color" v-if="data">
        <div class="relative" @mouseover="hover = true" @mouseout="hover = false">
            <div class="w-full h-[130px] relative">
                <el-image :src="data.value.news_item[0].thumb_url" class="w-full h-full"/>
                <div class="absolute left-0 bottom-0 p-[10px] w-full truncate text-white leading-none" v-if="data.value.news_item.length > 1">
                    {{ data.value.news_item[0].title }}
                </div>
            </div>
            <div v-if="data.value.news_item.length > 1">
                <template v-for="(newsItem, newsIndex) in data.value.news_item">
                    <div class="px-[15px] py-[10px] flex" :class="{'border-b border-color' : newsIndex < data.value.news_item.length - 1 }" v-if="newsIndex > 0">
                        <div class="flex-1 w-0 truncate">
                            {{ newsItem.title }}
                        </div>
                        <div class="w-[50px] h-[50px] ml-[10px]">
                            <el-image :src="newsItem.thumb_url" class="w-full h-full"/>
                        </div>
                    </div>
                </template>
            </div>
            <div class="px-[15px] py-[10px]" v-else>
                {{ data.value.news_item[0].title }}
            </div>
            <div class="absolute z-[1] flex items-center justify-center w-full h-full inset-0 bg-black bg-opacity-60 cursor-pointer" @click="data = null" v-show="hover && props.mode == 'select'">
                <icon name="element Delete" color="#fff" size="40px" />
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue'

const props = defineProps({
    modelValue: {
        type: Object,
        default: () => {
            return {}
        }
    },
    mode: {
        type: String,
        default: 'select'
    }
})
const emit = defineEmits(['update:modelValue'])

const hover = ref(false)
const data = computed({
    get () {
        return props.modelValue
    },
    set (value) {
        emit('update:modelValue', value)
    }
})

const meta = document.createElement('meta')
meta.content = 'same-origin'
meta.name = 'referrer'
document.getElementsByTagName('head')[0].appendChild(meta)
</script>
