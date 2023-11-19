// eslint.config.js
const antfu = require('@antfu/eslint-config').default

module.exports = antfu({
  ignores: [
    'node_modules',
    '*.json',
    'next-env.d.ts',
    'postcss.config.js',
    'tailwind.config.ts',
    'components/ui/*',
  ],
})
