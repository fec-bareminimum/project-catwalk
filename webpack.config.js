const path = require("path")

module.exports = {
  watch: true,
  mode: "none",
  entry: path.resolve(__dirname, "client", "src", "index.jsx"),
  output: {
    path: path.resolve(__dirname, "client", "dist"),
    filename: "bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.jsx$/,
        exclude: ["/node_modules/"],
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-react", "@babel/preset-env"],
          },
        },
      },
    ],
  },
  watchOptions: {
    ignored: /node_modules/,
    aggregateTimeout: 200,
    poll: 1000,
  },
}
