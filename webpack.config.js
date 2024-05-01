const path = require('path')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')
const WebpackShellPluginNext = require('webpack-shell-plugin-next')

module.exports = {
  mode: 'production',
  target: 'node',
  module: {
    rules: [
      {
        test: /\.ts?$/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              transpileOnly: true
            }
          }
        ],
        exclude: /node_modules/
      }
    ]
  },
  plugins: [
    new ForkTsCheckerWebpackPlugin({
      typescript: {
        mode: 'write-references',
        configOverwrite: {
          compilerOptions: {
            declaration: true,
            declarationDir: path.resolve(__dirname, 'src/types/'),
            outDir: path.resolve(__dirname, 'build')
          }
        }
      }
    }),
    new WebpackShellPluginNext({
      onBuildEnd: {
        scripts: [
          'echo "#!/usr/bin/env node" | cat - build/cli.js > temp && mv temp build/cli.js'
        ],
        blocking: true,
        parallel: false
      }
    })
  ],
  resolve: {
    extensions: ['.ts', '.js'],
    alias: {
      '@': path.resolve(__dirname, 'src/')
    }
  },
  entry: {
    index: './src/index.ts',
    cli: './src/cli.ts'
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'build/')
  }
}
