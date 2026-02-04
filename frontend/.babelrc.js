const isTest = String(process.env.NODE_ENV) === 'test'

module.exports = {
  presets: [
    [
      '@babel/env',
      {
        targets: {
          browsers: ['>0.2%', 'not dead', 'not ie <= 11', 'not op_mini all']
        },
        modules: isTest ? 'commonjs' : false,
        useBuiltIns: 'entry'
      }
    ],
    '@babel/react'
  ],
  plugins: [
    '@babel/plugin-proposal-optional-chaining',
    '@babel/plugin-syntax-object-rest-spread',
    ['@babel/plugin-proposal-decorators', { legacy: true }],
    ['@babel/plugin-proposal-class-properties', { loose: true }],
    [
      '@babel/transform-runtime',
      {
        regenerator: true
      }
    ],
    ['transform-inline-environment-variables']
  ]
}
