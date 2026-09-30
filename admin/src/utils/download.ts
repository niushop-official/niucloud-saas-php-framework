import { ElMessage } from 'element-plus'

/**
 * 将 blob 保存为本地文件
 * @param blob 文件二进制内容
 * @param filename 下载文件名
 */
export function saveBlobAsFile(blob: Blob, filename: string) {
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = filename
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
}

/**
 * 处理 blob 下载响应并保存为文件
 * 后端出错时会返回 JSON（application/json），此时提示错误而不触发下载
 * @param blob 响应二进制内容
 * @param filename 下载文件名
 * @returns 是否成功触发下载
 */
export async function downloadBlob(blob: Blob, filename: string): Promise<boolean> {
    if (blob?.type && String(blob.type).indexOf('application/json') !== -1) {
        const text = await blob.text()
        try {
            ElMessage.error(( JSON.parse(text) ?? {} ).msg || '下载失败')
        } catch (e) {
            ElMessage.error('下载失败')
        }
        return false
    }
    saveBlobAsFile(blob, filename)
    return true
}
