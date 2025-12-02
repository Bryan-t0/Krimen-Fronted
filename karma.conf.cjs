const path = require('path')

module.exports = function (config) {
  config.set({
    frameworks: ['jasmine'],
    files: [{ pattern: 'tests/**/*.spec.@(js|jsx)', watched: false }],
    preprocessors: { 'tests/**/*.spec.@(js|jsx)': ['webpack', 'sourcemap'] },
    plugins: [
      'karma-jasmine',
      'karma-webpack',
      'karma-sourcemap-loader',
      'karma-chrome-launcher',
      'karma-coverage'
    ],
    browsers: ['ChromeHeadless'],
    singleRun: true,
    autoWatch: false,
    logLevel: config.LOG_INFO,
    reporters: ['progress', 'coverage'],
    coverageReporter: {
      dir: 'coverage',
      reporters: [
        { type: 'html', subdir: 'html' },
        { type: 'text-summary' },
        { type: 'lcovonly', subdir: '.', file: 'lcov.info' }
      ]
    },
    webpack: {
      mode: 'development',
      devtool: 'inline-source-map',
      module: {
        rules: [
          {
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            use: {
              loader: 'babel-loader',
              options: {
                plugins: ['babel-plugin-istanbul'],
                presets: [
                  ['@babel/preset-env', { targets: { chrome: '120' } }],
                  ['@babel/preset-react', { runtime: 'automatic' }]
                ]
              }
            }
          },
          { test: /\.css$/, use: ['style-loader', 'css-loader'] },
          { test: /\.(png|jpg|jpeg|gif|svg)$/i, type: 'asset/resource' }
        ]
      },
      resolve: {
        extensions: ['.js', '.jsx'],
        alias: { '@': path.resolve(__dirname, 'src') }
      }
    },
    client: { jasmine: { random: false }, clearContext: false }
  })
}
