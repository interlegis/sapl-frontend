module.exports = {
  publicPath: 'http://localhost:8080/',
  outputDir: './dist/',

  chainWebpack: config => {

    config.optimization
      .splitChunks(false)

    config.resolve.alias
      .set('__STATIC__', 'static')

    config.devServer
      .public('')
      .host('localhost')
      .port(8080)
      .hotOnly(true)
      .watchOptions({ poll: true })
      .https(false)
      .headers({ 'Access-Control-Allow-Origin': '\*' })
  }
}
