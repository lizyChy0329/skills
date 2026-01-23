---
name: vite-lib-vue-pnpm-starter-skill
description: Create a minimal Vite Vue 3 library starter with pnpm workspace, direct file generation
license: MIT
compatibility: opencode
metadata:
  audience: developers
  workflow: vite-library
  tech-stack: vue3, typescript, pnpm
---

## 功能概述

这个技能用于创建一个最小化的 Vite + Vue 3 库项目模板，使用 pnpm workspace 管理依赖。直接生成所有必要文件，无需使用 Vite 官方命令初始化。

## 核心特性

- 直接生成所有配置文件，无需手动干预
- pnpm workspace 管理 monorepo 结构
- Vue 3 + TypeScript 支持
- 最小化配置，能空则空，能无则无
- 仅支持 pnpm 包管理器

## 初始化步骤

### 1. 创建项目目录结构

```bash
mkdir -p src/components
mkdir -p playground/src
mkdir -p playground/public
```

### 2. 创建根目录 package.json

```json
{
  "name": "your-lib-name",
  "workspaces": [
    "playground"
  ],
  "type": "module",
  "version": "0.0.1",
  "private": true,
  "exports": {
    ".": {
      "types": "./dist/index.d.ts",
      "import": "./dist/index.es.js",
      "require": "./dist/index.umd.js"
    }
  },
  "main": "./dist/index.umd.js",
  "module": "./dist/index.es.js",
  "types": "./dist/index.d.ts",
  "files": [
    "dist"
  ],
  "scripts": {
    "build": "vue-tsc -b && vite build"
  },
  "peerDependencies": {
    "vue": "^3.5.0"
  },
  "devDependencies": {
    "@vitejs/plugin-vue": "^6.0.3",
    "@vue/tsconfig": "^0.8.1",
    "typescript": "~5.9.3",
    "vite": "^7.2.5",
    "vite-plugin-dts": "^4.5.4",
    "vue-tsc": "^3.1.4"
  }
}
```

### 3. 创建 pnpm-workspace.yaml

```yaml
packages:
  - .
  - playground
```

### 4. 创建 vite.config.ts

```typescript
import path from 'node:path'
import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'

export default defineConfig({
  plugins: [
    vue(),
    dts({
      insertTypesEntry: true,
      tsconfigPath: './tsconfig.app.json',
      rollupTypes: true,
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    lib: {
      entry: path.resolve(__dirname, 'index.ts'),
      name: 'YourLibName',
      fileName: format => `index.${format}.js`,
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        globals: {
          vue: 'Vue',
        },
      },
    },
  },
})
```

### 5. 创建 tsconfig.json

```json
{
  "files": [],
  "references": [
    {
      "path": "./tsconfig.app.json"
    },
    {
      "path": "./tsconfig.node.json"
    }
  ]
}
```

### 6. 创建 tsconfig.app.json

```json
{
  "extends": "@vue/tsconfig/tsconfig.dom.json",
  "compilerOptions": {
    "tsBuildInfoFile": "./node_modules/.tmp/tsconfig.tsbuildinfo",
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    },
    "types": ["vite/client"],
    "allowImportingTsExtensions": false,
    "strict": true,
    "noFallthroughCasesInSwitch": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noEmit": false,
    "outDir": "./dist",
    "erasableSyntaxOnly": true,
    "noUncheckedSideEffectImports": true
  },
  "include": [
    "index.ts",
    "src/**/*.ts",
    "src/**/*.tsx",
    "src/**/*.vue",
    "src/types/**/*.d.ts"
  ],
  "exclude": [
    "node_modules",
    "dist"
  ]
}
```

### 7. 创建 tsconfig.node.json

```json
{
  "compilerOptions": {
    "composite": true,
    "skipLibCheck": true,
    "module": "ESNext",
    "moduleResolution": "bundler",
    "allowSyntheticDefaultImports": true
  },
  "include": ["vite.config.ts"]
}
```

### 8. 创建库入口文件 index.ts

```typescript
export * from './src'
```

### 9. 创建 src/index.ts

```typescript
export const version = '0.0.1'

export * from './components'
```

### 10. 创建 src/components/index.ts

```typescript
export { default as Counter } from './Counter.vue'
```

### 11. 创建 src/components/Counter.vue

```vue
<script setup lang="ts">
import { ref, computed } from 'vue'

interface Props {
  title?: string
  count?: number
}

const props = withDefaults(defineProps<Props>(), {
  title: 'Hello World',
  count: 0,
})

const emit = defineEmits<{
  increment: [count: number]
}>()

const localCount = ref(props.count)

const doubleCount = computed(() => localCount.value * 2)

function handleClick() {
  localCount.value++
  emit('increment', localCount.value)
}
</script>

<template>
  <div class="counter">
    <h3>{{ title }}</h3>
    <p>Count: {{ localCount }}</p>
    <p>Double: {{ doubleCount }}</p>
    <button @click="handleClick">
      Increment
    </button>
  </div>
</template>

<style scoped>
.counter {
  padding: 1rem;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
}

button {
  margin-top: 0.5rem;
  padding: 0.5rem 1rem;
  background-color: #3b82f6;
  color: white;
  border: none;
  border-radius: 0.25rem;
  cursor: pointer;
}

button:hover {
  background-color: #2563eb;
}
</style>
```

### 12. 创建 src/style.css

```css
:root {
  font-family: system-ui, Avenir, Helvetica, Arial, sans-serif;
  line-height: 1.5;
  font-weight: 400;

  color-scheme: light dark;
  color: rgba(255, 255, 255, 0.87);
  background-color: #242424;

  font-synthesis: none;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

a {
  font-weight: 500;
  color: #646cff;
  text-decoration: inherit;
}
a:hover {
  color: #535bf2;
}

body {
  margin: 0;
  display: flex;
  place-items: center;
  min-width: 320px;
  min-height: 100vh;
}

h1 {
  font-size: 3.2em;
  line-height: 1.1;
}

button {
  border-radius: 8px;
  border: 1px solid transparent;
  padding: 0.6em 1.2em;
  font-size: 1em;
  font-weight: 500;
  font-family: inherit;
  background-color: #1a1a1a;
  cursor: pointer;
  transition: border-color 0.25s;
}
button:hover {
  border-color: #646cff;
}
button:focus,
button:focus-visible {
  outline: 4px auto -webkit-focus-ring-color;
}

.card {
  padding: 2em;
}

#app {
  max-width: 1280px;
  margin: 0 auto;
  padding: 2rem;
  text-align: center;
}

@media (prefers-color-scheme: light) {
  :root {
    color: #213547;
    background-color: #ffffff;
  }
  a:hover {
    color: #747bff;
  }
  button {
    background-color: #f9f9f9;
  }
}
```

### 13. 创建 playground/package.json

```json
{
  "name": "playground",
  "type": "module",
  "version": "0.0.0",
  "private": true,
  "scripts": {
    "dev": "vite",
    "build": "vue-tsc -b && vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "your-lib-name": "workspace:*",
    "vue": "^3.5.24"
  },
  "devDependencies": {
    "@vitejs/plugin-vue": "^6.0.3",
    "@vue/tsconfig": "^0.8.1",
    "typescript": "~5.9.3",
    "vite": "^7.2.5",
    "vue-tsc": "^3.1.4"
  }
}
```

### 14. 创建 playground/vite.config.ts

```typescript
import { resolve } from 'node:path'
import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [vue()],
  server: {
    host: '0.0.0.0',
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    },
  },
})
```

### 15. 创建 playground/tsconfig.json

```json
{
  "files": [],
  "references": [
    { "path": "./tsconfig.app.json" },
    { "path": "./tsconfig.node.json" }
  ]
}
```

### 16. 创建 playground/tsconfig.app.json

```json
{
  "extends": "@vue/tsconfig/tsconfig.dom.json",
  "compilerOptions": {
    "tsBuildInfoFile": "./node_modules/.tmp/tsconfig.tsbuildinfo",
    "baseUrl": ".",
    "paths": {
      "@/*": [
        "./src/*"
      ]
    },
    "types": [
      "vite/client"
    ],
    "allowImportingTsExtensions": false,
    "strict": true,
    "noFallthroughCasesInSwitch": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noEmit": false,
    "outDir": "./dist",
    "erasableSyntaxOnly": true,
    "noUncheckedSideEffectImports": true
  },
  "include": [
    "index.ts",
    "src/**/*.ts",
    "src/**/*.tsx",
    "src/**/*.vue",
    "src/types/**/*.d.ts"
  ],
  "exclude": [
    "node_modules",
    "dist"
  ]
}
```

### 17. 创建 playground/tsconfig.node.json

```json
{
  "compilerOptions": {
    "tsBuildInfoFile": "./node_modules/.tmp/tsconfig.node.tsbuildinfo",
    "target": "ES2023",
    "lib": ["ES2023"],
    "module": "ESNext",
    "types": ["node"],
    "skipLibCheck": true,

    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "verbatimModuleSyntax": true,
    "moduleDetection": "force",
    "noEmit": true,

    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "erasableSyntaxOnly": true,
    "noFallthroughCasesInSwitch": true,
    "noUncheckedSideEffectImports": true
  },
  "include": ["vite.config.ts"]
}
```

### 18. 创建 playground/index.html

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>playground</title>
  </head>
  <body>
    <div id="app"></div>
    <script type="module" src="/src/main.ts"></script>
  </body>
</html>
```

### 19. 创建 playground/src/main.ts

```typescript
import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

createApp(App).mount('#app')
```

### 20. 创建 playground/src/App.vue

```vue
<script setup lang="ts">
import { Counter } from 'your-lib-name'
</script>

<template>
  <div>
    <h1>Test Skill Playground</h1>
    <Counter title="Counter Component" :count="0" @increment="(count) => console.log('Count:', count)" />
  </div>
</template>

<style scoped>
h1 {
  margin-bottom: 2rem;
}
</style>
```

### 21. 创建 playground/src/style.css

```css
:root {
  font-family: system-ui, Avenir, Helvetica, Arial, sans-serif;
  line-height: 1.5;
  font-weight: 400;

  color-scheme: light dark;
  color: rgba(255, 255, 255, 0.87);
  background-color: #242424;

  font-synthesis: none;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

a {
  font-weight: 500;
  color: #646cff;
  text-decoration: inherit;
}
a:hover {
  color: #535bf2;
}

body {
  margin: 0;
  display: flex;
  place-items: center;
  min-width: 320px;
  min-height: 100vh;
}

h1 {
  font-size: 3.2em;
  line-height: 1.1;
}

button {
  border-radius: 8px;
  border: 1px solid transparent;
  padding: 0.6em 1.2em;
  font-size: 1em;
  font-weight: 500;
  font-family: inherit;
  background-color: #1a1a1a;
  cursor: pointer;
  transition: border-color 0.25s;
}
button:hover {
  border-color: #646cff;
}
button:focus,
button:focus-visible {
  outline: 4px auto -webkit-focus-ring-color;
}

.card {
  padding: 2em;
}

#app {
  max-width: 1280px;
  margin: 0 auto;
  padding: 2rem;
  text-align: center;
}

@media (prefers-color-scheme: light) {
  :root {
    color: #213547;
    background-color: #ffffff;
  }
  a:hover {
    color: #747bff;
  }
  button {
    background-color: #f9f9f9;
  }
}
```

### 22. 创建 .gitignore

```
# Logs
logs
*.log
npm-debug.log*
pnpm-debug.log*
yarn-debug.log*
yarn-error.log*
pnpm-store

# Editor directories and files
.idea
.vscode
*.suo
*.ntvs*
*.njsproj
*.sln
*.sw?
*.local

# OS
.DS_Store
Thumbs.db

# Build
dist
dist-ssr
*.local

# TypeScript cache
node_modules/.tmp/tsconfig.tsbuildinfo

# Test coverage
coverage
```

### 23. 安装依赖

```bash
pnpm install
```

## 验收标准

### 根目录构建验证

```bash
pnpm build
```

**预期结果**：

- 构建成功，无错误
- 生成 `dist/` 目录
- 包含 `index.es.js`、`index.umd.js`、`index.d.ts` 文件

### Playground 开发验证

```bash
cd playground && pnpm dev
```

**预期结果**：

- 开发服务器正常启动
- 无编译错误
- 无类型错误
- 可以正常访问开发页面

## 使用场景

- 需要创建一个新的 Vue 3 组件库
- 需要使用 Vite 作为构建工具
- 需要使用 pnpm 作为包管理器
- 需要包含 playground 用于本地测试
- 需要生成 TypeScript 类型声明

## 注意事项

1. **仅支持 pnpm**：项目配置为仅使用 pnpm，不要使用 npm 或 yarn

2. **最小化配置**：保持配置文件简洁，删除不必要的配置项

3. **直接生成文件**：不使用 Vite 官方命令，直接生成所有必要文件

4. **Workspace 依赖**：playground 通过 `workspace:*` 引用主包，确保本地开发时使用最新代码

5. **类型检查**：构建前执行 `vue-tsc -b` 确保无类型错误

6. **外部依赖**：在 vite.config.ts 中将 `vue` 标记为 external，避免打包到库中

7. **TypeScript 配置**：使用 references 模式，确保类型检查正确

## 项目结构

```
project-root/
├── .gitignore
├── index.ts
├── package.json
├── pnpm-workspace.yaml
├── tsconfig.json
├── tsconfig.app.json
├── tsconfig.node.json
├── vite.config.ts
├── src/
│   ├── index.ts
│   ├── components/
│   │   ├── index.ts
│   │   └── Counter.vue
│   └── style.css
├── playground/
│   ├── .gitignore
│   ├── index.html
│   ├── package.json
│   ├── tsconfig.json
│   ├── tsconfig.app.json
│   ├── tsconfig.node.json
│   ├── vite.config.ts
│   ├── public/
│   └── src/
│       ├── main.ts
│       ├── App.vue
│       ├── style.css
│       └── assets/
└── dist/ (构建后生成)
```

## 常见问题

**Q: 为什么使用 pnpm 而不是 npm？**

A: pnpm 提供更快的安装速度、更严格的依赖管理和更好的 monorepo 支持。workspace 功能使得本地开发更加方便。

**Q: 为什么 playground 需要单独的 package.json？**

A: playground 是一个独立的应用，需要自己的依赖配置。通过 `workspace:*` 可以引用主包的最新代码。

**Q: 如何确保项目只能用 pnpm 运行？**

A: 项目使用 `pnpm-workspace.yaml` 配置，且 playground 通过 `workspace:*` 引用依赖，这些是 pnpm 特有的功能，npm 和 yarn 无法识别。

**Q: 为什么 vite.config.ts 中要 external vue？**

A: 作为库项目，不应该将 Vue 打包进产物中，而是作为 peerDependencies，由使用方提供。这样可以避免重复打包和版本冲突。

**Q: 为什么使用 references 而不是 extends？**

A: references 模式是 TypeScript 项目引用（Project References）的标准方式，它允许独立编译每个子项目，提高编译速度和类型检查准确性。
