import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt([
  {
    files: ['shared/**/*.{ts,vue}'],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: ['#app'],
              message: 'Не используй #app в shared/ — перенеси в composables/'
            }
          ]
        }
      ]
    }
  }
])