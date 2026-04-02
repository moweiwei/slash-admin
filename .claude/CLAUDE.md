# Slash Admin

React 19 + TypeScript 管理后台模板项目。

## 技术栈

- **框架**: React 19, React Router 7, Vite 6
- **UI**: Ant Design 5 + shadcn/ui (New York style) + Tailwind CSS 4
- **状态**: Zustand (本地状态 + localStorage 持久化), React Query (服务端状态)
- **i18n**: i18next (en_US, zh_CN)
- **HTTP**: Axios (封装 APIClient), MSW mock
- **表单**: React Hook Form + Zod
- **图表**: ApexCharts
- **格式化/Lint**: Biome 2 (tab 缩进, 120 字符行宽)
- **包管理**: pnpm

## 常用命令

```bash
pnpm dev        # 启动开发服务器 (port 3001, proxy → 3000)
pnpm build      # tsc 类型检查 + vite 构建
pnpm preview    # 预览生产构建
```

## 路径别名

- `@/*` → `src/*`
- `#/*` → `src/types/*`

## 项目结构

```
src/
├── api/           # APIClient + services (userService, menuService, demoService)
├── _mock/         # MSW mock handlers + faker 数据
├── components/    # 业务组件
├── ui/            # shadcn/ui 组件 (勿手动修改)
├── hooks/         # 自定义 hooks
├── layouts/       # 布局组件 (dashboard, simple)
├── locales/       # i18n 翻译文件
├── pages/         # 页面组件 (按功能分目录)
├── routes/        # 路由配置 (支持前端/后端路由模式)
├── store/         # Zustand stores (userStore, settingStore)
├── theme/         # 主题系统 (tokens, adapters, provider)
├── types/         # TypeScript 类型定义
└── utils/         # 工具函数
```

## 代码规范

### 命名

- 组件: PascalCase (`LoginForm`)
- 文件: kebab-case (`login-form.tsx`)
- Store: `useXxxStore` + `useXxx` selectors
- Hook: `useXxx`
- Service: `xxxService` + enum 定义 API 端点
- 类型: PascalCase, 放在 `src/types/`

### 模式

- 函数式组件 + hooks, 不用 class 组件
- 页面组件使用 `React.lazy` + `Suspense` 懒加载
- API 调用通过 service 层, 不直接使用 axios
- 状态管理: UI/auth 状态用 Zustand, 服务端数据用 React Query
- 主题通过 token 系统 + CSS 变量, 支持 light/dark 切换
- 路由守卫: `LoginAuthGuard` 保护 dashboard 路由

### API 层

- `APIClient` 封装 Axios, 提供 typed 的 get/post/put/delete
- 请求拦截器自动注入 Bearer token
- 响应拦截器处理错误 + 401 自动登出
- Service 用 enum 管理端点路径, 如 `UserApi.SignIn`
- 响应类型统一用 `Result<T>` 泛型包装

### 主题系统

- Token-based: `src/theme/tokens/` 定义 color, typography, spacing 等
- `ThemeProvider` 包裹应用, 通过 HTML data 属性切换主题
- `AntdAdapter` 将 token 映射到 Ant Design theme
- 颜色预设: Default, Cyan, Purple, Blue, Orange, Red
- 布局模式: Vertical, Horizontal, Mini

### i18n

- 翻译文件在 `src/locales/lang/{en_US,zh_CN}/`
- 新增文案需同时更新两种语言
- 使用 `useTranslation` hook 获取翻译函数

## Biome 配置

- Tab 缩进, 120 字符行宽
- 自动 import 排序
- 排除目录: `public/`, `.vscode/`, `src/ui/`

## 注意事项

- `src/ui/` 下的 shadcn 组件由 CLI 生成, 不要手动修改
- 路由模式通过 `GLOBAL_CONFIG.routerMode` 切换前端/后端模式
- 开发环境使用 MSW mock, mock handlers 在 `src/_mock/handlers/`
- 生产构建会移除 console 和 debugger
- 无测试框架, 暂无单元/集成测试
