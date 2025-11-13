# NiuCloud Admin 开发规范

## 技术栈区分

本项目采用前后端分离架构，包含两个主要前端部分：

1. **PC端后台管理系统**
   - 框架: Vue 3 + TypeScript + Vite
   - UI组件库: Element Plus
   - 状态管理: Pinia
   - 样式处理: SCSS + Tailwind CSS

2. **移动端应用**
   - 框架: uni-app + Vue 3 + TypeScript
   - UI组件库: uview-plus
   - 状态管理: Pinia
   - 样式处理: SCSS + Windi CSS

## 关键组件使用规范

### 消息提示组件

**重要注意事项：请根据开发平台选择正确的消息提示组件！**

#### PC端 (admin目录)
- **必须使用Element Plus的消息提示组件**，而不是uni-app的方法
- 主要组件包括：`ElMessage`、`ElMessageBox`、`ElNotification`等
- 导入方式：`import { ElMessage, ElMessageBox } from 'element-plus'`
- 使用示例：
  ```typescript
  import { ElMessage } from 'element-plus'
  
  // 成功消息
  ElMessage.success('操作成功')
  
  // 错误消息
  ElMessage.error('操作失败')
  
  // 确认对话框
  ElMessageBox.confirm('确定要执行此操作吗？', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    // 用户点击确认后的逻辑
  }).catch(() => {
    // 用户点击取消后的逻辑
  })
  ```

#### 移动端 (uni-app目录)
- **使用uni-app提供的API**进行消息提示
- 主要方法包括：`uni.showToast`、`uni.showModal`、`uni.showLoading`等
- 使用示例：
  ```typescript
  // 成功提示
  uni.showToast({
    title: '操作成功',
    icon: 'success',
    duration: 2000
  })
  
  // 模态对话框
  uni.showModal({
    title: '提示',
    content: '确定要执行此操作吗？',
    success: (res) => {
      if (res.confirm) {
        // 用户点击确认后的逻辑
      }
    }
  })
  ```

## API请求规范

### PC端API请求
- 使用`@/utils/request.ts`封装的请求工具
- 支持`showSuccessMessage`和`showErrorMessage`选项控制消息显示
- 示例：
  ```typescript
  import request from '@/utils/request'
  
  // GET请求
  export function getOrderList(params: Record<string, any>) {
    return request.get('order/list', params)
  }
  
  // POST请求（带成功消息）
  export function createOrder(params: Record<string, any>) {
    return request.post('order/create', params, { showSuccessMessage: true })
  }
  ```

### 移动端API请求
- 使用uni-app的`uni.request`或封装的请求工具
- 示例：
  ```typescript
  // 发送请求
  uni.request({
    url: 'https://example.com/api/order/list',
    method: 'GET',
    data: {
      page: 1,
      limit: 10
    },
    success: (res) => {
      // 处理成功响应
    },
    fail: (err) => {
      // 处理请求失败
    }
  })
  ```

## 代码风格规范

1. **文件命名**
   - 组件文件：PascalCase，如 `OrderList.vue`
   - 普通文件：kebab-case 或 camelCase，如 `api-service.ts` 或 `commonUtils.ts`

2. **TypeScript规范**
   - 为函数参数、返回值和重要变量添加明确的类型注解
   - 使用接口 (interface) 定义复杂数据结构
   - 避免 `any` 类型的滥用

3. **Vue组件规范**
   - 使用 Vue 3 Composition API 和 `<script setup lang="ts">` 语法
   - 组件样式建议使用 scoped 属性或 CSS Modules

## 国际化规范

- PC端使用Vue I18n进行国际化，语言文件位于`src/lang`目录
- 移动端同样使用Vue I18n，语言文件位于`src/app/locale`目录
- 使用`t('key')`函数获取翻译文本

## 其他重要规范

- 严格遵循RESTful API设计规范
- 统一处理API响应数据和错误情况
- 代码提交前确保通过TypeScript类型检查
- 组件开发遵循高内聚低耦合原则
- 优先复用现有组件和工具函数