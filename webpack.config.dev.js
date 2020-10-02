/* eslint-disable no-template-curly-in-string */
const path = require('path');

module.exports = {
  entry: './src/App.jsx',
  output: {
    path: path.resolve(__dirname, 'static/app'),
    filename: 'client.js',
  },
  mode: 'development',
  devtool: 'eval-source-map',
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-react', ['@babel/preset-env', {
              targets: {
                firefox: 69,
                chrome: 76,
              },
            }]],
            plugins: ['@babel/plugin-proposal-object-rest-spread',
              [
                'babel-plugin-transform-imports',
                {
                  '@material-ui/core': {
                    transform: '@material-ui/core/esm/${member}',
                    preventFullImport: true,
                  },
                  '@material-ui/icons': {
                    transform: '@material-ui/icons/esm/${member}',
                    preventFullImport: true,
                  },
                },
              ]],
          },
        },
      },
    ],
  },
};
