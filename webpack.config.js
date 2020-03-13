module.exports = {
  devServer: {
     hot: true,
     port: 9000

  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loaders: ["babel-loader"],
      },
    ]
  }
};