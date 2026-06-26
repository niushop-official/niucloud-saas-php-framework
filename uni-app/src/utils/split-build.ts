/** H5 分构建开关（无其它依赖，供 language / shared 构建使用） */
export function isSplitBuildEnabled(): boolean {
    return typeof __WAP_SPLIT_BUILD__ !== 'undefined' && __WAP_SPLIT_BUILD__ === true
}
