const { defineConfig } = require('@vue/cli-service');

module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    // Cấu hình các option cho Webpack
    plugins: [
      new (require('webpack')).DefinePlugin({
        '__VUE_PROD_HYDRATION_MISMATCH_DETAILS__': JSON.stringify(true),
      }),
    ],
  },
});
