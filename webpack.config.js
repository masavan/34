const path = require('path');
//const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

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

        ]
    },
    plugins: [
        new HtmlWebpackPlugin({template: './src/index.html'}),
        new CleanWebpackPlugin(),

    ],


}