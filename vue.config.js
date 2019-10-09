module.exports = {
  devServer: {
    proxy: {
      "^/api": {
        target: "http://192.168.3.80:8030/",
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          '^/api': '/', // rewrite path
        },
      },
      "^/foo": {
        target: "<other_url>"
      }
    }
  }
};
