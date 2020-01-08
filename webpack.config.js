const path = require('path');

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
    mode: 'development'
});

module.exports = [clientConfig, serverConfig];