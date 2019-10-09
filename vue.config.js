module.exports = {
  devServer: {
    proxy: {
      "^/api": {
        target: "http://9w867q.natappfree.cc/",
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
