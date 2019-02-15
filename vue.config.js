const path = require('path')
const each = require('lodash/fp/each')

const BundleTrackerPlugin = require('webpack-bundle-tracker')
class RelativeBundleTrackerPlugin extends BundleTrackerPlugin {
  convertPathChunks(chunks) {
    each(each(chunk => {
      chunk.path = path.relative(this.options.path, chunk.path)
    }))(chunks)
  }
  writeOutput(compiler, contents) {
    if (contents.status === 'done') {
      this.convertPathChunks(contents.chunks)
    }
    super.writeOutput(compiler, contents)
  }
}
// module.exports = RelativeBundleTrackerPlugin

const dotenv = require('dotenv')
dotenv.config({
  path: '../sapl/sapl/.env'
})

var FRONTEND_CUSTOM = process.env.FRONTEND_CUSTOM === undefined ? false : process.env.FRONTEND_CUSTOM === "True"

module.exports = {
  runtimeCompiler: true,
  publicPath: process.env.NODE_ENV === 'production' ? '/static/sapl/' : 'http://localhost:8080/',
  outputDir: FRONTEND_CUSTOM ? 'dist' : '../sapl/sapl/static/sapl/',

  chainWebpack: config => {

    config.plugins.delete('html')
    config.plugins.delete('preload')
    config.plugins.delete('prefetch')

    config
      .mode('development')
      .devtool('cheap-module-eval-source-map')

    /* config
      .optimization
      .splitChunks(false) */

    config
      .plugin('RelativeBundleTrackerPlugin')
      .use(RelativeBundleTrackerPlugin, [{
        path: '.',
        filename: FRONTEND_CUSTOM ? './webpack-stats.json' : '../sapl/sapl/webpack-stats.json'
      }])

    config.resolve.alias
      .set('__STATIC__', 'static')

    config.devServer
      .public('')
      .host('localhost')
      .port(8080)
      .hot(true)
      .watchOptions({
        poll: true
      })
      .watchContentBase(true)
      .https(false)
      .headers({
        'Access-Control-Allow-Origin': '*'
      })
      .contentBase([
        path.join(__dirname, 'public'),
        path.join(__dirname, 'src', 'assets')
      ])

    config
      .plugin('provide')
      .use(require('webpack/lib/ProvidePlugin'), [{
        $: 'jquery',
        jquery: 'jquery',
        'window.jQuery': 'jquery',
        jQuery: 'jquery',
        _: 'lodash'
      }])

    config.entryPoints.delete('app')

    config
      .entry('global')
      .add('./src/global/main.js')
      .end()

    config.entry('compilacao')
      .add('./src/apps/compilacao/main.js')
      .end()

    config.entry('painel')
      .add('./src/apps/painel/main.js')
      .end()
  }
}