const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
var UnminifiedWebpackPlugin = require('unminified-webpack-plugin');

module.exports = {
    entry: {
        "javascripts/app" : __dirname + '/src/resources/typescript/app.ts'
        },
    output: {
      filename: '[name].min.js',
      path : __dirname + "/src/public/",
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js"],
        plugins: [new TsconfigPathsPlugin({
            configFile:  "./src/resources/tsconfig.json"
        }
        )],
    },
    module: {
        rules: [
            { test: /\.tsx?$/, use : { loader: 'ts-loader' , options : { transpileOnly : true } } }
        ]
    },
    plugins : [
        new UglifyJsPlugin({
            uglifyOptions :{
                compress : {warnings: false}
            }
        }),
        new UnminifiedWebpackPlugin()
    ]
  };