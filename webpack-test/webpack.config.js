const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    devtool: 'eval-source-map',
    entry: __dirname + "/app/main.js",
    output : {
        path : __dirname + "/build",
        filename : "bundle.js"
    },
    devServer: {
        contentBase: "./build",//本地服务器所加载的页面所在的目录
        historyApiFallback: true,//不跳转
        inline: true//实时刷新
    },
    module : {
        rules: [
            {
                test : /(\.jsx|\.js)$/,
                use : {
                    loader: "babel-loader",
                    options : {
                        presets : [
                            "es2015", "react"
                        ]
                    }
                },
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: "style-loader"
                    }, {
                        loader: "css-loader",
                        options: {
                            modules: true
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new webpack.BannerPlugin('miaoxingman@gmail.com'),
        new HtmlWebpackPlugin({
            template: __dirname + "/app/index.tmpl.html"
        })
    ],
}