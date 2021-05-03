const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin')

module.exports = {
  configureWebpack: {
    resolve: {
      fallback: {
        domain: require.resolve('domain-browser'),
        stream: require.resolve('stream-browserify'),
      },
    },
    plugins: [
      new MonacoWebpackPlugin({
        // available options are documented at https://github.com/Microsoft/monaco-editor-webpack-plugin#options
        languages: ['javascript', 'css', 'html', 'typescript', 'json'],
      }),
    ],
  },
}
