module.exports = {
  configureWebpack: {
    target: 'electron-renderer'
  },
  pluginOptions: {
    electronBuilder: {
      builderOptions: {
        productName: 'Quick Query Util',
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
