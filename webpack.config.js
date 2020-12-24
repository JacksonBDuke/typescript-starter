const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const pkg = require('./package.json');

const MINIFY = (process.env.MINIFY === 'true');
console.log(`Minify: ${MINIFY}`);

const MINIMIZERS = MINIFY
    ? [
        new UglifyJsPlugin({
            "cache": true,
            "parallel": true,
            "uglifyOptions": {
                "compress": true,
                "ecma": 2020,
                "mangle": true
            },
            "sourceMap": true
        })
    ]
    : [];

module.exports = {
    target: 'node',
    optimization: {
        minimizer: MINIMIZERS
    },
    entry: './src/main.ts',
    module: {
        rules: [
            {
                test: /\.ts$/,
                loader: 'babel-loader'
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.ts']
    },
    output: {
        path: resolve('dist'),
        filename: MINIFY ? `${pkg.name}.min.js` : `${pkg.name}.js`,
        library: {
            type: "umd",
            name: pkg.libraryName
        },
    },
    plugins: [
    ]
};

function resolve() {
    const args = [__dirname].concat(Array.from(arguments));
    return path.join.apply(path, args);
}