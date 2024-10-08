// nodejs核心模块，直接使用
const os = require("os");
const path = require('path');
const ESLintWebpackPlugin = require("eslint-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const PreloadWebpackPlugin = require("@vue/preload-webpack-plugin");

// cpu核数
const threads = os.cpus().length;


// 获取处理样式的Loaders
// 抽取相同代码
const getStyleLoaders = (preProcessor) => {
    return [
        // 替代了 style-loader, 因为这里是需要将  css 文件单独抽成文件，而不是直接插入 html 中
        MiniCssExtractPlugin.loader,
        "css-loader",
        {
            loader: "postcss-loader",
            options: {
                postcssOptions: {
                    plugins: [
                        "postcss-preset-env", // 能解决大多数样式兼容性问题
                    ],
                },
            },
        },
        preProcessor,
    ].filter(Boolean);
};

module.exports = {
    entry: './src/main.js',
    output: {
        path: path.resolve(__dirname, '../dist'),
        // 自动将上次打包目录资源清空, webpack 4之后内置了 clean 插件
        clean: true,
        // filename: 'static/js/main.js',
        filename: "static/js/[name].[contenthash:8].js", // 入口文件打包输出资源命名方式
        chunkFilename: "static/js/[name].[contenthash:8].chunk.js", // 动态导入输出资源命名方式
        assetModuleFilename: "static/media/[name].[hash][ext]", // 图片、字体等资源命名方式（注意用hash）
    },
    module: {
        rules: [
            {
                oneOf: [

                    {
                        // 用来匹配 .css 结尾的文件
                        test: /\.css$/,
                        // use 数组里面 Loader 执行顺序是从右到左
                        // use: ["style-loader", "css-loader"],
                        use: getStyleLoaders(),
                    },
                    {
                        // 用来处理 less 资源
                        test: /\.less$/,
                        // use: ["style-loader", "css-loader", "less-loader"],
                        use: getStyleLoaders("less-loader"),
                    },
                    {
                        // 用来处理 sass 资源
                        test: /\.s[ac]ss$/,
                        // use: ["style-loader", "css-loader", "sass-loader"],
                        use: getStyleLoaders("sass-loader"),
                    },
                    {
                        // 用来处理 stylus 资源
                        test: /\.styl$/,
                        // use: ["style-loader", "css-loader", "stylus-loader"],
                        use: getStyleLoaders("stylus-loader"),
                    },
                    {
                        // 用来处理图片资源，小于10kb的图片会被base64处理
                        // 优点：减少请求数量（减少http请求）
                        // 缺点：图片体积会更大（文件请求速度更慢）
                        test: /\.(png|jpe?g|gif|webp)$/,
                        type: "asset",
                        parser: {
                            dataUrlCondition: {
                                // 以 data URI 形式内置到 js 中
                                maxSize: 10 * 1024 // 小于10kb的图片会被base64处理
                            }
                        },
                    },
                    {
                        // 用来处理其他资源
                        test: /\.(ttf|woff2?|map4|map3|avi)$/,
                        type: "asset/resource",
                    },
                    {
                        // 用来处理 js 资源
                        test: /\.js$/,
                        exclude: /node_modules/, // 排除node_modules代码不编译
                        // loader: "babel-loader",
                        use: [
                            {
                                loader: "thread-loader", // 开启多进程
                                options: {
                                    workers: threads, // 数量
                                },
                            },
                            {
                                loader: "babel-loader",
                                options: {
                                    cacheDirectory: true, // 开启babel编译缓存
                                    plugins: ["@babel/plugin-transform-runtime"], // 减少代码体积
                                },
                            },
                        ],
                    },
                ]
            }
        ],
    },
    plugins: [
        new ESLintWebpackPlugin({
            // 指定检查文件的根目录, 只会检查以该目录为根的文件
            // 比如：指定根目录为 src ，则只会检查 src 目录下的文件
            context: path.resolve(__dirname, "src"),
            exclude: "node_modules", // 默认值
            threads, // 开启多进程
        }),
        new HtmlWebpackPlugin({
            // 以 public/index.html 为模板创建文件
            // 新的html文件有两个特点：1. 内容和源文件一致 2. 自动引入打包生成的js等资源
            template: path.resolve(__dirname, "../public/index.html"),
        }),
        // 提取css成单独文件
        new MiniCssExtractPlugin({
            // 定义输出文件名和目录
            // filename: "static/css/main.css",
            filename: "static/css/[name].[contenthash:8].css",
            chunkFilename: "static/css/[name].[contenthash:8].chunk.css",
        }),
        new PreloadWebpackPlugin({
            rel: "preload", // preload兼容性更好
            as: "script",
            // rel: 'prefetch' // prefetch兼容性更差
        }),
    ],
    optimization: {
        minimize: true,
        minimizer: [
            // css压缩也可以写到optimization.minimizer里面，效果一样的
            new CssMinimizerPlugin(),
            // 当生产模式会默认开启TerserPlugin，但是我们需要进行其他配置，就要重新写了
            new TerserPlugin({
                parallel: threads // 开启多进程
            }),
        ],
        // 代码分割配置
        splitChunks: {
            chunks: "all", // 对所有模块都进行分割
        },
        // 提取runtime文件
        runtimeChunk: {
            name: (entrypoint) => `runtime~${entrypoint.name}`, // runtime文件命名规则
        },
    },
    mode: 'production',
    devtool: 'source-map'
};