import request from '@/utils/request'

// USER_CODE_BEGIN -- ly_area_agent
/**
 * 获取区域代理列表
 * @param params
 * @returns
 */
export function getAgentList(params: Record<string, any>) {
    return request.get(`ly_area/agent`, {params})
}

/**
 * 获取区域代理详情
 * @param agent_id 区域代理agent_id
 * @returns
 */
export function getAgentInfo(agent_id: number) {
    return request.get(`ly_area/agent/${agent_id}`);
}

/**
 * 添加区域代理
 * @param params
 * @returns
 */
export function addAgent(params: Record<string, any>) {
    return request.post('ly_area/agent', params, { showErrorMessage: true, showSuccessMessage: true })
}

/**
 * 编辑区域代理
 * @param agent_id
 * @param params
 * @returns
 */
export function editAgent(params: Record<string, any>) {
    return request.put(`ly_area/agent/${params.agent_id}`, params, { showErrorMessage: true, showSuccessMessage: true })
}

/**
 * 删除区域代理
 * @param agent_id
 * @returns
 */
export function deleteAgent(agent_id: number) {
    return request.delete(`ly_area/agent/${agent_id}`, { showErrorMessage: true, showSuccessMessage: true })
}


export function getMemberListOfSelect(params: Record<string, any>) {
    return request.get('ly_area/member_of_select',{params});
}



// USER_CODE_END -- ly_area_agent