const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

module.exports = env => {
  let entry;
  let output;

  let externals = {
    Vue: {
      commonjs: 'vue',
      commonjs2: 'vue',
      amd: 'vue',
      root: 'vue'
    }
  };

  if (env === 'production') {
    entry = {
      'visibility-sensor': './src/index.vue',
      'visibility-sensor.min': './src/index.vue'
    };

    output = {
      path: path.resolve(__dirname),
      filename: '[name].js',
      library: 'vue-visibility-sensor',
      libraryTarget: 'umd',
      globalObject: 'this'
    };
  }

  if (env === 'test') {
    entry = {
      bundle: './tests/visibility-sensor-spec.js'
    };

    output = {
      path: path.resolve(__dirname, 'tests'),
      filename: '[name].js'
    };

    // we want Vue included in the test bundle
    externals = {};
  }

  if (env === 'example') {
    entry = {
      bundle: './example/main.js'
    };

    output = {
      path: path.resolve(__dirname, 'example'),
      filename: '[name].min.js'
    };

    // we want Vue included in the example bundle
    externals = {};
  }

  return {
    mode: 'production',
    entry: entry,
    output: output,
    optimization: {
      minimizer: [
        new UglifyJsPlugin({
          test: /\.min.js($|\?)/i
        })
      ]
    },
    module: {
      rules: [
        {
          test: /\.vue$/,
          loader: 'vue-loader',
          options: {
            loaders: {
              css: ['vue-style-loader', 'css-loader']
            }
          }
        },
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader'
          }
        }
      ]
    },
    plugins: [
      new VueLoaderPlugin()
    ],
    resolve: {
      alias: {
        'vue$': 'vue/dist/vue.esm.js'
      },
      extensions: ['.vue', '.js']
    },
    externals: externals
  };
};
