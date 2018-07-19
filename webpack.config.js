const webpack = require('webpack');
const path = require('path');

const {
    paths,
    outputFiles,
    stats,
    rules,
    plugins,
    resolve,
    IS_DEVELOPMENT,
    IS_PRODUCTION
} = require('./webpack/config');

const devServer = require('./webpack/dev-server').devServer;

const HtmlWebpackPlugin = require('html-webpack-plugin');

const entry = [
    path.join(paths.javascript, 'app.js')
];

plugins.push(
    // Builds index.html from template
    new HtmlWebpackPlugin({
        template: path.join(paths.source, 'index.html'),
        path: paths.build,
        filename: 'index.html',
        minify: {
            collapseWhitespace: true,
            minifyCSS: true,
            minifyJS: true,
            removeComents: true,
            useShortDoctype: true
        }
    })
);

if (IS_DEVELOPMENT) {
    plugins.push(
        // Enable HMR
        new webpack.HotModuleReplacementPlugin(),
        // Don't emmit build when there was an error while compaling
        // No assets are emitted that includes erros
        new webpack.NoEmitOnErrorsPlugin()
    );

    // For IE babel-polyfill has to be loaded before react-hot-loader
    entry.unshift('babel-polyfill');
}


module.exports = {
    mode: IS_PRODUCTION ? 'production' : 'development',
    devtool: IS_PRODUCTION ? false : 'source-map',
    context: paths.javascript,
    watch: IS_DEVELOPMENT,
    entry,
    output: {
        path: paths.build,
        publicPath: '/',
        filename: outputFiles.app
    },
    module: {
        rules
    },
    plugins,
    resolve,
    stats,
    devServer,
    optimization: {
        // Minification
        minimize: IS_PRODUCTION,
        // Creates vendor chunk from modules coming from node_modules folder
        splitChunks: {
            cacheGroups: {
                vendor: {
                    chunks: 'initial',
                    test: path.resolve(__dirname, 'node_modules'),
                    name: 'vendor',
                    filename: outputFiles.vendor,
                    enforce: true,
                }
            }
        }
    }
};
