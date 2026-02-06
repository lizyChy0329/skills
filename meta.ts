export interface VendorSkillMeta {
  official?: boolean
  source: string
  skills: Record<string, string> // sourceSkillName -> outputSkillName
}

/**
 * Repositories to clone as submodules and generate skills from source
 */
export const submodules = {
  // vue: 'https://github.com/vuejs/docs',
  // nuxt: 'https://github.com/nuxt/nuxt',
  // vite: 'https://github.com/vitejs/vite',
  // unocss: 'https://github.com/unocss/unocss',
  // pnpm: 'https://github.com/pnpm/pnpm.io',
  // pinia: 'https://github.com/vuejs/pinia',
  // vitest: 'https://github.com/vitest-dev/vitest',
  // vitepress: 'https://github.com/vuejs/vitepress',
}

/**
 * Already generated skills, sync with their `skills/` directory
 */
export const vendors: Record<string, VendorSkillMeta> = {
  'antfu-skills': {
    official: true,
    source: 'https://github.com/antfu/skills',
    skills: {
      'antfu': 'antfu',
      'nuxt': 'nuxt',
      'pinia': 'pinia',
      'pnpm': 'pnpm',
      'slidev': 'slidev',
      'tsdown': 'tsdown',
      'unocss': 'unocss',
      'vite': 'vite',
      'vitepress': 'vitepress',
      'vitest': 'vitest',
      'vue-best-practices': 'vue-best-practices',
      'vue-router-best-practices': 'vue-router-best-practices',
      'vue-testing-best-practices': 'vue-testing-best-practices',
      'vue': 'vue',
      'vueuse-functions': 'vueuse-functions',
      'web-design-guidelines': 'web-design-guidelines',
    },
  },
  'find-skills': {
    official: true,
    source: 'https://github.com/vercel-labs/skills',
    skills: {
      'find-skills': 'find-skills',
    },
  },
  'skill-creator': {
    official: true,
    source: 'https://github.com/anthropics/skills',
    skills: {
      'skill-creator': 'skill-creator',
    },
  },
  'baoyu-skills': {
    official: true,
    source: 'https://github.com/JimLiu/baoyu-skills',
    skills: {
      'baoyu-url-to-markdown': 'baoyu-url-to-markdown',
      'baoyu-xhs-images': 'baoyu-xhs-images',
      'baoyu-infographic': 'baoyu-infographic',
      'baoyu-image-gen': 'baoyu-image-gen',
      'baoyu-cover-image': 'baoyu-cover-image',
      'baoyu-article-illustrator': 'baoyu-article-illustrator',
    },
  },
}

/**
 * Hand-written skills with Anthony Fu's preferences/tastes/recommendations
 */
export const manual = [
  'antfu',
]
