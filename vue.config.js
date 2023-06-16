module.exports = {
    chainWebpack: config => {
        config.entry('app').clear().add('./src/main.js');
      },
    publicPath: './',
    devServer: {
        historyApiFallback: true,
    },
};