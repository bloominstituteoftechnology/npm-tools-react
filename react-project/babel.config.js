const PLUGIN_STYLED_COMPONENTS = 'babel-plugin-styled-components'
const PRESET_REACT = '@babel/preset-react'
const PRESET_ENV = '@babel/preset-env'

const configTesting = {
  plugins: [],
  presets: [
    [PRESET_REACT],
    [PRESET_ENV, { modules: 'commonjs' }]
  ]
}

const configNotTesting = {
  plugins: [
    [PLUGIN_STYLED_COMPONENTS],
  ],
  presets: [
    [PRESET_REACT],
    [PRESET_ENV, { targets: { chrome: '115' } }]
  ]
}

module.exports = {
  env: {
    test: configTesting,
    testing: configTesting,
    development: configNotTesting,
    production: configNotTesting,
  }
}
