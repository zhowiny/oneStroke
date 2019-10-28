module.exports = {
  css: {
    loaderOptions: {
      sass: {
        data: `@import "~@/assets/style/declare.scss";`
      }
    }
  },
  devServer: {
    proxy: {
      '^/mobile': {
        target: 'https://m.591.com.tw',
        ws: true,
        changeOrigin: true
      },
      '^/api': {
        target: 'https://m.591.com.tw',
        ws: true,
        changeOrigin: true
      },
    }
  }
}
