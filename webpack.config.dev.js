const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const fs = require('fs');
const srcRoot = path.resolve(__dirname, 'src');
const devPath = path.resolve(__dirname, 'dev');
const pageDir = path.resolve(srcRoot, 'page');
const mainFile = 'index.js';

function getHtmlArray(entryMap){
    let htmlArray = [];
    Object.keys(entryMap).forEach((key)=>{
        let fullPathName = path.resolve(pageDir, key);
        let fileName = path.resolve(fullPathName, key + '.html');

        if (fs.existsSync(fileName)) {
            htmlArray.push(new HtmlWebpackPlugin({
                filename: key + '.html',
                template: fileName,
                chunks: [ 'common', key]
            }));
        }


    });
    return htmlArray;
}

// 获取page下的文件中index.js，形成map
// { 
//    index: '/Users/apple/mt_h5_app/src/page/index/index.js',
//    ...
//}
function getEntry(){
    let entryMap = {};

    fs.readdirSync(pageDir).forEach((pathname)=>{
        let fullPathName = path.resolve(pageDir, pathname);
        let stat = fs.statSync(fullPathName);
        let fileName = path.resolve(fullPathName, mainFile);

        if (stat.isDirectory() && fs.existsSync(fileName)) {
            entryMap[pathname] = fileName;
        }
    });

    return entryMap;

}

const entryMap = getEntry();
const htmlArray = getHtmlArray(entryMap);

module.exports = {
    mode: 'development',
    devServer: {
        contentBase: devPath, //告诉服务器从哪里提供内容,只在需要提供静态文件时是必要的
        hot: true
    },
    entry: entryMap,
    resolve: {
        alias: {
            component: path.resolve(srcRoot, 'component')
        },
        extensions: ['.js','.jsx']
    },
    output: {
        path: devPath,
        filename: '[name].min.js'
    },
    module: {
        rules: [
            { test: /\.(js|jsx)$/, use: [{loader: 'babel-loader'},{loader: 'eslint-loader'}],include: srcRoot},
            { test: /\.css$/ , use:['style-loader',{'loader':'css-loader',options:{minimize: true}}] ,include: srcRoot},
            { test: /\.scss$/ , use:['style-loader','css-loader','sass-loader', {
                loader: 'sass-resources-loader',
                options: {
                    resources: srcRoot + '/component/rem_function.scss'
                }
            }], include: srcRoot},
            { test: /\.(png|jpg|jpeg)$/, use: 'url-loader?limit=8192' , include: srcRoot}
        ]
    },
    optimization: {
        splitChunks:{
            cacheGroups:{
                common: {
                    test: /[\\/]node_modules[\\/]/,
                    chunks: 'all',
                    name: 'common'
                }
            }
        }
    },
    plugins: [
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new MiniCssExtractPlugin({
            filename: "[name].css",
            chunkFilename: "[id].css"
        })
    ].concat(htmlArray)
};