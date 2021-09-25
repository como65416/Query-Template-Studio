module.exports = {
  configureWebpack: {
    target: 'electron-renderer'
  },
  pluginOptions: {
    electronBuilder: {
      builderOptions: {
        productName: 'Query Template Studio',
        win: {
          icon: 'build/icons/icon.ico'
        },
        mac: {
          icon: 'build/icons/icon.png'
        }
      }
    }
  }
}
