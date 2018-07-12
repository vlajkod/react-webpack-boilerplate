module.exports = {
    plugins: {
        'postcss-import': {
            path: 'src/scss/',
        },
        'postcss-preset-env': {
            browsers: [
            'last 2 versions',
            '> 1%',
            ]
        }
    }
};
  