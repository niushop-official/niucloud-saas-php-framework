import request from '@/utils/request'

/**
 * 获取代理列表
 */
export function getAgentList(params: Record<string, any>) {
    return request.get('shop_fenxiao/agent', { params });
}

/**
 * 新增渠道代理商
 * @param params
 * @returns
 */
export function addAgent(params: Record<string, any>) {
    return request.post('shop_fenxiao/agent', params, { showErrorMessage: true, showSuccessMessage: true })
}

/**
 * 编辑渠道代理商
 * @param params
 * @returns
 */
export function editAgent(params: Record<string, any>) {
    return request.put(`shop_fenxiao/agent/${ params.member_id }`, params, {
        showErrorMessage: true,
        showSuccessMessage: true
    })
}

/**
 * 编辑代理商状态
 * @param params
 * @returns
 */
export function editAgentStatus(params: Record<string, any>) {
    return request.put(`shop_fenxiao/agent_status/${ params.member_id }/${ params.status }`, params, {
        showErrorMessage: true,
        showSuccessMessage: true
    })
}

/**
 * 获取代理等级 [分页]
 * @returns
 */
export function getAgentLevel() {
    return request.get('shop_fenxiao/agent_level')
}


/**
 * 新增代理等级
 * @param params
 * @returns
 */
export function addAgentLevel(params: Record<string, any>) {
    return request.post('shop_fenxiao/agent_level', params, { showErrorMessage: true, showSuccessMessage: true })
}

/**
 * 编辑代理等级
 * @param params
 * @returns
 */
export function editAgentLevel(params: Record<string, any>) {
    return request.put(`shop_fenxiao/agent_level/${ params.level_id }`, params, {
        showErrorMessage: true,
        showSuccessMessage: true
    })
}

/**
 * 删除代理等级
 * @param params
 * @returns
 */
export function deleteAgentLevel(params: Record<string, any>) {
    return request.delete(`shop_fenxiao/agent_level/${ params.level_id }`, {
        showErrorMessage: true,
        showSuccessMessage: true
    })
}

/**
 * 获取代理等级 [不分页]
 * @returns
 */
export function getAgentLevelList() {
    return request.get('shop_fenxiao/agent_level_list')
}

/**
 * 代理配置
 * @returns
 */
export function getAgentConfig() {
    return request.get('shop_fenxiao/agent_config')
}

/**
 * 设置配置
 * @param params
 * @returns
 */
export function setAgentConfig(params: Record<string, any>) {
    return request.put('shop_fenxiao/agent_config', params, { showErrorMessage: true, showSuccessMessage: true })
}

/**
 * 获取代理商状态
 * @returns
 */
export function getAgentStatus() {
    return request.get('shop_fenxiao/agent_status')
}

/**
 * 获取代理订单
 * @param params
 * @returns
 */
export function getAgentOrderList(params: Record<string, any>) {
    return request.get('shop_fenxiao/agent_order', { params })
}