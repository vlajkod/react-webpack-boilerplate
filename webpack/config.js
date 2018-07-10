const webpack = require('webpack');
const path = require('path');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const outputFiles = require('./output-files').outputFiles;

const paths = {
    source: path.join(__dirname, '../src'),
    assets: path.join(__dirname, '../src/assets/'),
    css: path.join(__dirname, '../src/css/'),
    fonts: path.join(__dirname, '../src/assets/fonts/'),
    images: path.join(__dirname, '../src/assets/img'),
    javascript: path.join(__dirname, '../src/js'),
    svg: path.join(__dirname, '../src/assets/svg'),
    build: path.join(__dirname, '../build')
};

const NODE_ENV = process.env.NODE_ENV || 'development';

const IS_DEVELOPMENT = NODE_ENV === 'development';
const IS_PRODUCTION = NODE_ENV === 'production';


/*******
 * PLUGINS
 **********/
// Shared plugins
const plugins = [
    // Extracts CSS to a file
    new MiniCssExtractPlugin({
        filename: outputFiles.css
    }),
    // Injects env variables to our app
    new webpack.DefinePlugin({
        'process.env': {
            NODE_ENV: JSON.stringify(NODE_ENV)
        }
    })
];

if (IS_DEVELOPMENT) {
    // Shared development plugins
    plugins.push(
        // Enables pretty names instead of index
        new webpack.NamedModulesPlugin()
    );
}
/*****
 * RULES
 *****/

const rules = [
    // Babel loader
    {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: [ 'babel-loader']
    },
    // SVG are imported as react components
    {
        test: /\.svg$/,
        use: [
            {
                loader: 'babel-loader'
            },
            {
                loader: 'react-svg-loader',
                options: {
                    svgo: {
                        plugins: [
                            {
                                removeTitle: true
                            }
                        ],
                        floatPrecision: 3
                    }
                }
            }
        ],
        include: paths.svg
    },
    // Images
    {
        test: /\.(png|gif|jpg|svg)$/,
        include: paths.images,
        use: [
            {
                loader: 'file-loader',
                options: {
                    name: 'app/assets/[name]-[hash].[ext]'
                }
            }
        ]
    },
    // Fonts
    {
        test: /\.(eot|ttf|woff|woff2)$/,
        include: paths.fonts,
        use: [
            {
                loader: 'file-loader',
                options: {
                    name: 'app/fonts/[name]-[hash].[ext]'
                }
            }
        ]
    }
]

// For production ExtractTextPlugin is used
if (IS_PRODUCTION) {
    rules.push(
        {
            test: /\.css$/,
            use: [
                MiniCssExtractPlugin.loader,
                {
                    loader: 'css-loader',
                    options: {
                        importLoaders: 1,
                        minimize: true
                    }
                }
            ]
        }
    );
} else {
    rules.push(
        {
            test: /\.css$/,
            exclude: /node_modules/,
            use: [
                {
                    loader: 'style-loader',
                    options: {
                        sourceMap: true
                    }
                }, 
                {
                    loader: 'css-loader',
                    options: {
                        importLoaders: 1,
                        sourceMap: true
                    }
                }
            ]
        }
    )
}


const stats = {
    colors: true,
    assets: true,
    children: false,
    chunks: false,
    hash: false,
    modules: false,
    publicPath: false,
    timings: true,
    version: false,
    warnings: true
};


const resolve = {
    extensions: ['.webpack-loader.js', '.web-loader.js', '.loader.js', '.js', '.jsx'],
    modules: [
        'node_modules',
        paths.javascript,
        paths.css,
        paths.assets
    ]
};

module.exports = {
    IS_DEVELOPMENT,
    IS_PRODUCTION,
    NODE_ENV,
    paths,
    stats,
    outputFiles,
    plugins,
    rules,
    stats,
    resolve
};
