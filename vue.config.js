module.exports = {
  devServer: {
    proxy: {
      "^/api": {
        target: "http://idr3hd.natappfree.cc/",
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
