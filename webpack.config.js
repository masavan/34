const path = require('path');
//const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin');

const TerserPlugin = require('terser-webpack-plugin');
const CssMinimizerWebpackPlugin = require('css-minimizer-webpack-plugin');

const optimization = () => ({
    splitChunks: {
        chunks: 'all',
    },
    minimizer: [
        new CssMinimizerWebpackPlugin(),
        new TerserPlugin()
    ]
});

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: './[name].bundle.js',
    },
    module: {
        rules: [
            {test: /\.css$/i, use:['style-loader', 'css-loader']},
            {test: /\.ts$/i, loader: 'ts-loader'},
            {test:  /\.(jpg|png|svg|jpeg|gif)$/,
                type: 'asset/resource',
                generator: {
                    filename: 'assets/images/[name].[hash][ext]', // Шаблон імені файлу для зображень
                }},
            {test: /\\.(woff|woff2|ttf|eot)$/i,
            type: 'asset/resource',
            generator: {
            filename: 'assets/fonts/[name].[hash][ext]', }
             }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({template: './src/index.html'}),
        new CleanWebpackPlugin(),
        new CopyWebpackPlugin({
            patterns: [
                { from: 'src/images', to: 'images' }
            ],
        }),
    ],
    optimization: optimization(),
}