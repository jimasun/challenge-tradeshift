export default {
  'files': [
    './spec/**/*.spec.js'
  ],
  'sources': [
    './src/**/*.{js,mjs}'
  ],
  'failFast': false,
  'failWithoutAssertions': true,
  'verbose': true,
  'compileEnhancements': false,
  'require': [
    'esm'
  ],
  'babel': {
    'testOptions': {
      'babelrc': false,
      'configFile': false
    },
    'extensions': [
      'js',
      'mjs'
    ]
  }
}
