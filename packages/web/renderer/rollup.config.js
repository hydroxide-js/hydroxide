import configs from '../../../rollup.config'
import pkg from './package.json'

const external = [...Object.keys(pkg.dependencies), ...Object.keys(pkg.peerDependencies)]

configs.forEach((config) => {
  config.external = external
})

export default configs
