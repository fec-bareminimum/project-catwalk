const path = require("path")
const HtmlWebPackPlugin = require("html-webpack-plugin")

module.exports = {
  watch: true,
  mode: "production",
  entry: path.resolve(__dirname, "client", "src", "index.jsx"),
  output: {
    path: path.resolve(__dirname, "client", "build"),
    filename: "[name].[chunkhash].bundle.js",
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: path.resolve(__dirname, "client", "public", "index.html"),
      filename: "./index.html",
      title: "Project Catwalk",
      meta: {
        viewport:
          "width=device-width, initial-scale=1,viewport-fit=cover, shrink-to-fit=no",
        "theme-color": "#42b029",
        "apple-mobile-web-app-status-bar-style": "#42b029",
        "og:title": "Project-catwalk",
        "og:description": "MPV online-retail frontend client",
        "content-type": {
          "http-equiv": "content-type",
          content: "text/html; charset=UTF-8",
        },
      },
      minify: {
        collapseWhitespace: true,
        removeComments: true,
        removeRedundantAttributes: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
        useShortDoctype: true,
      },
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[ext]",
              outputPath: "fonts/",
            },
          },
        ],
      },
      {
        test: /\.jsx$/,
        exclude: ["/node_modules/"],
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-react"],
          },
        },
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader",
          },
        ],
      },
    ],
  },
  watchOptions: {
    ignored: /node_modules/,
    aggregateTimeout: 200,
    poll: 1000,
  },
}
