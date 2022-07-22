module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  parserOptions: {
    parser: '@babel/eslint-parser',
    requireConfigFile: false,
  },
  extends: ['@nuxtjs', 'plugin:nuxt/recommended', 'prettier'],
  plugins: [],
  // add your custom rules here
  rules: {
    'no-unused-vars': 'warn',
    'space-in-parens': 'off',
    'computed-property-spacing': 'off',
    'vue/multi-word-component-names': 'off',
    'vue/require-default-prop': 'off',
    'object-shorthand': 'off',
  },
}
