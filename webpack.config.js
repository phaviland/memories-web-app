const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

const config = {
    module: {
        rules: [
            {
                test: /\.(jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: { presets: ['@babel/preset-react'] }
                }
            }
        ]
    }
}
const serverConfig = Object.assign({}, config, {
    entry: './src/server/index.js',
    node: { fs: 'empty', net: 'empty', __dirname: false, __filename: false, },
    target: 'node',
    output: {
        filename: 'server.js',
        path: path.resolve(__dirname, 'dist'),
    }
});

const clientConfig = Object.assign({}, config, {
    entry: './src/client/index.jsx',
    target: 'web',
    output: {
        filename: 'client.js',
        path: path.resolve(__dirname, 'dist'),
    },
    devtool: 'source-map',
    mode: 'development',
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/server/index.html',
            inject: false
        }),
        new webpack.DefinePlugin({
            __API__: JSON.stringify("http://localhost:3000")
        })
      ]
});

module.exports = [clientConfig, serverConfig];