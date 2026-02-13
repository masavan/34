const path = require('path');
//const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin');

const TerserPlugin = require('terser-webpack-plugin');
const CssMinimizerWebpackPlugin = require('css-minimizer-webpack-plugin');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');

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
        filename: './[name].[contenthash].js',
    },
    module: {
        rules: [
            {test: /\.css$/i, use:[MiniCssExtractPlugin.loader, 'css-loader']},
            {test: /\.ts$/i, loader: 'ts-loader'},
            {test:  /\.(jpg|png|svg|jpeg|gif)$/,
                type: 'asset/resource',
                generator: {
                    filename: 'assets/images/[name].[contenthash][ext]',
                }},
            {test: /\.(woff|woff2|ttf|eot)$/i,
            type: 'asset/resource',
            generator: {
            filename: 'assets/fonts/[name].[contenthash][ext]', }
             }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({template: './src/index.html'}),
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: '[name].[contenthash].css'
        }),

        /* new CopyWebpackPlugin({
             patterns: [
                 { from: 'src/images', to: 'images' }
             ],
         }),*/
    ],
    optimization: optimization(),
    devServer: {
        static: {
            directory: path.join(__dirname, 'dist'),
        },
        compress: true,
        port: 9000,
        open: true,
        hot: true,
    }
}