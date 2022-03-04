const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const BundleAnalyzerPlugin =
  require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
const path = require("path");
const webpack = require("webpack");
const Dotenv = require("dotenv-webpack");
// const CircularDependencyPlugin = require('circular-dependency-plugin');

module.exports = (env = {}, argv) => {
  const webpackMode = argv.mode;
  const { analyze } = env;

  const plugins = [
    new Dotenv({
      path: "./.env.development",
      allowEmptyValues: false,
      safe: true,
      expand: true,
      systemvars: true,
    }),
    new CleanWebpackPlugin(),
    new ForkTsCheckerWebpackPlugin({
      typescript: {
        diagnosticOptions: {
          semantic: true,
          syntactic: true,
        },
      },
    }),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
    new webpack.HotModuleReplacementPlugin(),
    // new CircularDependencyPlugin({
    //   exclude: /node_modules/,
    //   failOnError: true,
    //   allowAsyncCycles: false,
    //   cwd: process.cwd(),
    //   onDetected({
    //     // `paths` will be an Array of the relative module paths that make up the cycle
    //     paths: cyclePaths,
    //     compilation,
    //   }) {
    //     const err = new Error(
    //       `Circular dependency detected!\n * ${cyclePaths.join('\n → ')}`,
    //     );
    //     compilation.warnings.push(err);
    //   },
    // }),
  ];

  if (!!analyze) {
    plugins.push(new BundleAnalyzerPlugin());
  }

  return {
    entry: path.resolve(__dirname, "src/app/index.tsx"),
    mode: webpackMode,
    devServer: {
      historyApiFallback: true,
      port: 8080,
      host: "localhost",
      hot: true,
      liveReload: true,
      // watchContentBase: true,
    },
    target: "web",

    devtool: "eval-cheap-module-source-map",
    cache: {
      name: "AppBuildCache",
      cacheDirectory: path.resolve(__dirname, ".temp_cache"),
      type: "filesystem",
      buildDependencies: {
        config: [__filename],
      },
    },
    watchOptions: {
      aggregateTimeout: 50,
    },
    output: {
      publicPath: "/",
      path: path.join(__dirname, "/dist"),
      filename: "[name].min.js",
      libraryTarget: "umd",
      pathinfo: false,
    },
    stats: {
      modules: false,
    },
    optimization: {
      runtimeChunk: true,
      removeAvailableModules: false,
      removeEmptyChunks: false,
      splitChunks: false,
    },
    resolve: {
      extensions: [".ts", ".tsx", ".js", ".scss", ".svg"],
      alias: {
        "@src": path.resolve(__dirname, "./src/"),
        "@shared": path.resolve(__dirname, "./src/shared/"),
        "@pages": path.resolve(__dirname, "./src/pages/"),
        "@processes": path.resolve(__dirname, "./src/processes/"),
        "@features": path.resolve(__dirname, "./src/features/"),
        "@entities": path.resolve(__dirname, "./src/entities/"),
        "@widgets": path.resolve(__dirname, "./src/widgets/"),
        "@app": path.resolve(__dirname, "./src/app/"),
      },
      symlinks: false,
    },
    module: {
      unsafeCache: true,
      rules: [
        // Specific solution to fix broken compatibility at yaml lib.
        // Remove this rule after the issue will be fixed https://github.com/eemeli/yaml/issues/208
        { test: /\.js$/, type: "javascript/auto" },
        {
          test: /\.css$/,
          use: ["style-loader", "css-loader"],
        },
        {
          test: /\.tsx?$/,
          include: path.resolve(__dirname, "src"),
          use: [
            {
              loader: "babel-loader",
            },
            {
              loader: "ts-loader",
              options: {
                transpileOnly: true,
                configFile:
                  webpackMode === "development"
                    ? "tsconfig.dev.json"
                    : "tsconfig.json",
              },
            },
          ],
          exclude: [/node_modules/],
        },

        {
          test: /\.scss$/,
          use: [
            "style-loader",
            {
              loader: "css-loader",
              options: {
                // importLoaders: 2,
                modules: {
                  localIdentName: "[name]__[local]__[hash:base64:5]",
                },
              },
            },
            { loader: "postcss-loader" },
            {
              loader: "sass-loader",
              options: {
                // Prefer `dart-sass`
                implementation: require("sass"),
              },
            },
          ],
        },
        {
          test: /\.svg$/,
          use: ["@svgr/webpack"],
        },
        { test: /\.(woff|woff2|eot|ttf)$/, type: "asset/resource" },
        {
          test: /\.(png|jp(e*)g|svg|gif)$/,
          use: [
            {
              loader: "file-loader",
              // options: {
              //   name: '[path][name].[ext]?[hash]',
              //   esModule: false,
              // },
            },
          ],
        },
      ],
    },
    plugins: plugins,
  };
};
