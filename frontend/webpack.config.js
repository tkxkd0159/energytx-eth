import path from 'path';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import TerserPlugin from 'terser-webpack-plugin';
const __dirname = path.resolve();

export default {
  entry: {
    basic: ['./js/bootstrap.js', './js/utils.js'],
    eth: ['./js/metamask.js', './js/abi.js'],
    index: './js/event/e_index.js',
    mypage: './js/event/e_mypage.js',
    register: './js/event/e_register.js',
    market: './js/event/e_market.js',
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist/js'),
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        include: [
            path.resolve(__dirname, './js')
        ],
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ['@babel/preset-env'],
            plugins: ["@babel/plugin-transform-runtime"]
          }
        }
      },
      {
        test: /\.css$/i,
        use: [
          // Creates `style` nodes from JS strings
          "style-loader",
          // Translates CSS into CommonJS
          "css-loader"
        ],
      },
    ]
  },
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin()],
  },
  plugins: [
    new BundleAnalyzerPlugin({
      analyzerMode: 'static',
      reportFilename: './bundle-report.html',
      openAnalyzer: false,
    })
  ],
  devtool: 'source-map',
  mode: 'development',
};