const {
    IS_PRODUCTION,
    paths,
    stats
} = require('./config');

const devServer = {
    contentBase: IS_PRODUCTION ? paths.build : paths.source,
    historyApiFallback: true,
    compress: IS_PRODUCTION,
    inline: !IS_PRODUCTION,
    hot: !IS_PRODUCTION,
    host: '0.0.0.0',
    disableHostCheck: true,
    overlay: true,
    stats
};

module.exports = {
    devServer
};
