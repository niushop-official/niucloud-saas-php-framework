import request from '@/utils/request'


/**
 * 获取更新内容
 * @param addon
 */
export function getUpgradeContent(addon: string = '') {
    return request.get(addon ? `upgrade/${ addon }` : 'upgrade')
}

/**
 * 获取升级任务
 */
export function getUpgradeTask() {
    return request.get('upgrade/task')
}

/**
 * 升级
 * @param addon
 * @param params
 */
export function upgradeAddon(addon: string = '', params: Record<string, any> = {}) {
    return request.post(addon ? `upgrade/${ addon }` : 'upgrade', params)
}

/**
 * 执行升级
 */
export function executeUpgrade() {
    return request.post('upgrade/execute', {}, { showErrorMessage: false })
}

// 升级前检测已统一到通用校验（sys/check?scene=upgrade）

/**
 * 清除
 */
export function clearUpgradeTask() {
    return request.post('upgrade/clear')
}

/**
 * 用户操作
 * @param operate
 */
export function upgradeUserOperate(operate: string) {
    return request.post(`upgrade/operate/${ operate }`)
}

/**
 * 获取升级记录分页列表
 * @param params
 * @returns
 */
export function getUpgradeRecords(params: Record<string, any>) {
    return request.get(`upgrade/records`, { params })
}

/**
 * 删除升级记录
 * @param params
 */
export function delUpgradeRecords(params: Record<string, any>) {
    return request.delete(`upgrade/records`, { params })
}

/**
 * 删除升级记录对应的备份（备份记录 + 归档目录），升级记录本身保留
 * @param upgradeKeys upgrade_key 数组或逗号分隔字符串
 */
export function delUpgradeBackup(upgradeKeys: string | string[]) {
    const upgrade_key = Array.isArray(upgradeKeys) ? upgradeKeys.join(',') : upgradeKeys
    return request.post('upgrade/backup/delete', { upgrade_key }, { showSuccessMessage: true })
}

/**
 * 获取备份记录分页列表
 * @param params
 * @returns
 */
export function getBackupRecords(params: Record<string, any>) {
    return request.get(`backup/records`, { params })
}

/**
 * 修改备份备注
 * @param params
 */
export function modifyBackupRemark(params: Record<string, any>) {
    return request.put(`backup/remark`, params, { showSuccessMessage: true })
}

/**
 * 备份功能 检测目录权限
 */
export function checkDirExist(params: Record<string, any>) {
    return request.post('backup/check_dir', params)
}

// 备份目录权限检测已统一到通用校验（sys/check?scene=backup）

/**
 * 备份功能 恢复升级备份
 */
export function restoreUpgradeBackup(params: Record<string, any>) {
    return request.post('backup/restore', params)
}

/**
 * 备份功能 删除升级记录
 */
export function deleteRecords(params: Record<string, any>) {
    return request.post('backup/delete', params, { showSuccessMessage: true })
}

/**
 * 手动备份
 */
export function manualBackup(params: Record<string, any>) {
    return request.post("backup/manual", params)
}

/**
 * 获取进行中的恢复
 * @param params
 */
export function performRecoveryTasks(params: Record<string, any>) {
    return request.get("backup/restore_task", params)
}

/**
 * 获取进行中的备份
 * @param params
 */
export function performBackupTasks(params: Record<string, any>) {
    return request.get("backup/task", params)
}

/**
 * 连通测试
 * @param params
 */
export function connectTest(params: Record<string, any>) {
    return request.post("niucloud/build/connect_test", params)
}
/**
 * 保存服务器地址
 * @param params
 */
export function setLocalUrl(params: Record<string, any>) {
    return request.post("niucloud/build/set_local_url", params)
}
/**
 * 获取服务器地址
 * @param params
 */
export function getLocalUrl(params: Record<string, any>) {
    return request.get("niucloud/build/get_local_url", params)
}

/**
 * 框架补丁分页列表
 * @param params title / is_resolved
 */
export function getFrameworkPatchList(params: Record<string, any>) {
    return request.get('framework_patch', { params })
}

/**
 * 框架补丁详情（抽屉展示）
 * @param id
 */
export function getFrameworkPatchInfo(id: number) {
    return request.get(`framework_patch/${ id }`)
}

/**
 * 立即同步云端补丁（入库 + 新补丁推送消息）
 */
export function syncFrameworkPatch() {
    return request.post('framework_patch/sync', {})
}

/**
 * 标记 / 取消标记补丁已解决
 * @param id
 * @param is_resolved 1 已解决 / 0 未解决
 */
export function resolveFrameworkPatch(id: number, is_resolved: number) {
    return request.put(`framework_patch/resolve/${ id }`, { is_resolved }, { showSuccessMessage: true })
}
