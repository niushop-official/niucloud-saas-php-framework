import useDictStore from '@/stores/modules/dict'
import { getDictData } from '@/app/api/sys'
import { ref, toRefs } from 'vue';

/**
 * 获取字典数据
 */
export function useDict(...args: string[]) {
  const res = ref<any>({});
  return (() => {
    args.forEach((dictType: string, index: any) => {
      res.value[dictType] = [];
      const dicts = useDictStore().getDict(dictType);
      if (dicts) {
        res.value[dictType] = dicts;
      } else {
        getDictData(dictType).then(resp => {
          res.value[dictType] = resp.data
          useDictStore().setDict(dictType, res.value[dictType]);
        })
      }
    })
    return toRefs(res.value);
  })()
}