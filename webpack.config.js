const path = require('path');

const componentsAndUtilsConfig = {
  entry: './src/index.ts',
  output: {
    filename: 'mwe-bundle.min.js',
    path: path.resolve(__dirname, 'dist'),
    pathinfo: false,
  },
  module: {
    rules: [
      {
        test: /\.ts?$/,
        use: [{ loader: 'ts-loader', options: { transpileOnly: true } }],
        exclude: /node_modules/,
      },
      {
        test: /\.scss$/,
        use: [
          'raw-loader',
          {
            loader: 'sass-loader',
            options: {
              sassOptions: {
                includePaths: [path.resolve(__dirname, 'node_modules')],
              },
            },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
};

module.exports = [componentsAndUtilsConfig];
