const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const path = require('path')

const DEVELOPMENT = 'development'
const ENV = process.env.NODE_ENV || DEVELOPMENT
const IS_DEV = ENV === DEVELOPMENT

const HTML_LOADER = 'html-loader'
const CSS_LOADER = 'css-loader'
const BABEL_LOADER = 'babel-loader'
const STRING_REPLACE_LOADER = 'string-replace-loader'
const FILE_LOADER = 'file-loader'

const SERVER_URL = /http:\/\/localhost:9009/g
const FRONTEND_PORT = 3003

const DIST_PATH = 'dist'
const PUBLIC_PATH = IS_DEV ? '/' : './'
const INDEX_HTML_PATH = './frontend/index.html'
const INDEX_JS_PATH = './frontend/index.js'
const AUDIO_PATH = 'audio/'

const JS_NAME = IS_DEV ? 'index.js' : 'index.[contenthash].js'
const CSS_NAME = IS_DEV ? 'style.css' : 'style.[contenthash].css'
const MP3_NAME = '[name].[ext]'

const SOURCE_MAP = IS_DEV ? 'source-map' : false

const config = {
  entry: INDEX_JS_PATH,
  mode: ENV,
  output: {
    filename: JS_NAME,
    publicPath: PUBLIC_PATH,
    path: path.resolve(__dirname, DIST_PATH),
  },
  devtool: SOURCE_MAP,
  plugins: [
    new HtmlWebpackPlugin({
      template: INDEX_HTML_PATH,
    }),
    new MiniCssExtractPlugin({
      filename: CSS_NAME,
    }),
  ],
  devServer: {
    static: path.join(__dirname, DIST_PATH),
    historyApiFallback: true,
    compress: true,
    port: FRONTEND_PORT,
    client: { logging: 'none' },
  },
  module: {
    rules: [
      {
        test: /\.html$/i,
        exclude: /node_modules/,
        use: { loader: HTML_LOADER }
      },
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: { loader: BABEL_LOADER },
      },
      {
        test: /\.css$/i,
        use: [
          MiniCssExtractPlugin.loader,
          CSS_LOADER,
        ],
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.mp3$/,
        use: [
          {
            loader: FILE_LOADER,
            options: {
              name: MP3_NAME,
              outputPath: AUDIO_PATH,
              publicPath: AUDIO_PATH,
            },
          },
        ],
      },
    ],
  },
}

if (!IS_DEV) {
  config.module.rules.push({
    test: /\.m?js$/,
    exclude: /node_modules/,
    use: {
      loader: STRING_REPLACE_LOADER,
      options: {
        search: SERVER_URL,
        replace: '',
      },
    },
  })
}

module.exports = config
