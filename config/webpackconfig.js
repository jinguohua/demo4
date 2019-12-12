const path = require("path");
const webpack = require("webpack"); // 加载webpack 中的模块
const HappyPack = require("happypack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const os = require("os");
const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length });
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const nodeEnv = "development";
module.exports = {
  mode: process.env.NODE_ENV,
  entry: {
    index: [
      "@babel/polyfill",
      "webpack-hot-middleware/client?noInfo=true",
      "./src/index.tsx"
    ]
  },
  output: {
    path: path.join(__dirname, "../dist"),
    publicPath: "/dist/",
    filename: "js/[name].js",
    chunkFilename: "js/[name].chunk.js"
  },

  module: {
    rules: [
      {
        test: /\.(js?|ts?|jsx?|tsx?)$/,
        exclude: /node_modules/,
        use: ["happypack/loader?id=babel"]
      },
      {
        test: /\.(c|le)ss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: process.env.NODE_ENV === 'development'
              //reloadAll: true,
            }
          },
          'css-loader',
          'postcss-loader',
          {
            loader: 'less-loader',
            options: {
              javascriptEnabled: true,
              sourceMap: true
            }
          }
        ]
      },
    ]
  },

  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify(nodeEnv),
        NODE_LOCATION: JSON.stringify(process.env.NODE_ENV)
      }
    }),
    new HappyPack({
      id: "babel",
      loaders: [
        {
          loader: "babel-loader"
        }
      ],
      threadPool: happyThreadPool
    }),
    new MiniCssExtractPlugin({
      filename: "css/[name].css",
      chunkFilename: "css/[name].css",
    }),
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: "index.html",
      inject: true
    })
  ],

  resolve: {
    //有些不同的模块会区分不同的代码这里决定使用哪份代码，例如es6 and es5
    mainFiles: ["index.web", "index"],
    modules: [path.resolve(__dirname, "src"), "node_modules"],
    // 添加让webpack 解析的后缀 例如 ./entry ,优先匹配entry.ts,entry.tsx,最后是entry.js
    extensions: [".ts", ".tsx", ".js", ".json", ".less", ".css"],
    // alias: {
    //   'database': path.resolve(__dirname, './middleware/database'),
    //   'config': path.resolve(__dirname, '../'),
    //   '~': path.resolve(__dirname, '../assets/'),
    //   assets: path.resolve(__dirname, '../assets/')
    // }
  },
  performance: {
    hints: false
  }
};
