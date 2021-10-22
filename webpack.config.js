const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetWebpackPlugin = require('optimize-css-assets-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const ImageminPlugin = require('imagemin-webpack');

const isDev = process.env.NODE_ENV === 'development';
const isProd = !isDev;

const filename = (ext) => isDev ? `[name].${ext}` : `[name].[contenthash].${ext}`;

const optimization = () => {
  const configObj = {
    splitChunks: {
      chunks: 'all'
    }
  };

  if (isProd) {
    configObj.minimizer = [
      new OptimizeCssAssetWebpackPlugin(),
      new TerserWebpackPlugin()
    ];
  }

  return configObj;
};

const plugins = () => {
  const basePlugins = [
    new HTMLWebpackPlugin({
      chunks: ['index'],
      template: path.resolve(__dirname, './src/index.html'),
      filename: 'index.html',
      minify: {
        collapseWhitespace: isProd
      }
    }),
    new HTMLWebpackPlugin({
      chunks: ['checkout'],
      template: path.resolve(__dirname, './src/checkout.html'),
      filename: 'checkout.html',
      minify: {
        collapseWhitespace: isProd
      }
    }),
    new HTMLWebpackPlugin({
      chunks: ['cart'],
      template: path.resolve(__dirname, './src/cart.html'),
      filename: 'cart.html',
      minify: {
        collapseWhitespace: isProd
      }
    }),
    new HTMLWebpackPlugin({
      chunks: ['productList'],
      template: path.resolve(__dirname, './src/productList.html'),
      filename: 'productList.html',
      minify: {
        collapseWhitespace: isProd
      }
    }),
    new HTMLWebpackPlugin({
      chunks: ['productPage'],
      template: path.resolve(__dirname, './src/productPage.html'),
      filename: 'productPage.html',
      minify: {
        collapseWhitespace: isProd
      }
    }),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: `./css/${filename('css')}`
    }),
  ];

  if (isProd) {
    basePlugins.push(
      new ImageminPlugin({
        bail: false,
        cache: true,
        imageminOptions: {
          plugins: [
            ["gifsicle", { interlaced: true }],
            ["jpegtran", { progressive: true }],
            ["optipng", { optimizationLevel: 5 }],
            [
              "svgo",
              {
                plugins: [
                  {
                    removeViewBox: false
                  }
                ]
              }
            ]
          ]
        }
      })
    )
  }

  return basePlugins;
};

module.exports = {
  context: path.resolve(__dirname, './'),
  mode: 'development',
  entry: {
    index: './src/js/homepage/index.js',
    checkout: './src/js/checkout/checkout.js',
    cart: './src/js/cart/cart.js',
    productList: './src/js/productList/productList.js',
    productPage: './src/js/productPage/productPage.js',
  },
  output: {
    filename: `./js/${filename('js')}`,
    path: path.resolve(__dirname, 'dist'),
    publicPath: ''
  },
  devServer: {
    historyApiFallback: true,
    contentBase: path.resolve(__dirname, 'app'),
    open: true,
    compress: true,
    hot: true,
    port: 3000,
  },
  optimization: optimization(),
  plugins: plugins(),
  devtool: isProd ? false : 'source-map',
  module: {
    rules: [
      {
        test: /\.html$/,
        loader: 'html-loader',
      },
      {
        test: /\.css$/i,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: isDev
            },
          },
          'css-loader'
        ],
      },
      {
        test: /\.s[ac]ss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: (resourcePath, context) => {
                return path.relative(path.dirname(resourcePath), context) + '/';
              },
            }
          },
          'css-loader',
          'sass-loader'
        ],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.(gif|png|jpe?g|svg)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              outputPath: './images/'
            }
          },
          {
            loader: 'image-webpack-loader',
            options: {
              name: `${filename('[ext]')}`,
              bypassOnDebug: true,
              disable: true,
            },
          }
        ]
      },
      {
        test: /\.hbs$/,
        use: 'handlebars-loader',
      },
      {
        test: /\.(?:|woff2)$/,
        use: [{
          loader: 'file-loader',
          options: {
            name: `./fonts/${filename('[ext]')}`
          }
        }],
      },
    ]
  }
};

