module.exports = {
  devServer: {
    proxy: {
      "^/api": {
        target: "http://mrej4w.natappfree.cc/",
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          '^/api': '/', // rewrite path
        }
      },
      "^/foo": {
        target: "<other_url>"
      }
    }
  }
};
