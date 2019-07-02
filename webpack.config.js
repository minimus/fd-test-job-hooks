const autoprefixer = require('autoprefixer')
const nodeExternals = require('webpack-node-externals')

const browserConfig = {
  mode: 'production',
  entry: ['babel-polyfill', './src/client/client.js'],
  output: {
    path: `${__dirname}/public`,
    filename: 'js/bundle.js',
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        loader: 'babel-loader',
        query: {
          presets: ['react-app'],
          plugins: ['react-html-attrs', 'transform-class-properties'],
        },
      },
      {
        test: [/\.css$/, /\.less$/],
        use: [
          'style-loader',
          { loader: 'css-loader', options: { importLoaders: 1 } },
          {
            loader: 'postcss-loader',
            options: {
              plugins: [
                autoprefixer(),
              ],
              sourceMap: true,
            },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.json', '.less', '.sass', '.scss', '.css'],
  },
}

const serverConfig = {
  entry: './src/server/server.js',
  target: 'node',
  mode: 'production',
  output: {
    path: __dirname,
    filename: 'server.js',
    libraryTarget: 'commonjs2',
  },
  externals: [nodeExternals()],
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        loader: 'babel-loader',
        query: {
          presets: ['react-app'],
          plugins: ['react-html-attrs', 'transform-class-properties'],
        },
      },
      {
        test: [/\.svg$/, /\.gif/, /\.jpe?g$/, /\.png$/],
        loader: 'file-loader',
        options: {
          name: 'public/images/[name].[ext]',
          publicPath: url => url.replace(/public/, ''),
          emit: false,
        },
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: 'css-loader/locals',
          },
        ],
      },
    ],
  },
}

module.exports = [
  browserConfig,
  serverConfig,
]
