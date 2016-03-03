var webpack = require("webpack");
var path = require('path');

module.exports = {

     
  entry: ['./demo.js'],
  output: {
    path:path.join(__dirname, 'public'),
    publicPath : "http://localhost:3000/myproject/react-touch-swiper/public",
    filename: 'public.js'
  },

  module: {

    loaders: [
      { test: /\.js$/, loader: 'babel?presets=react' },
      {
        test:/\.png$/,loader:"url-loader?limit=8142"
      },
      {
        test:/\.css$/,loader:"style-loader!css-loader"
      },{
        test: require.resolve('react'), loader: 'expose?React'
      },{
        test: require.resolve('react-dom'), loader: 'expose?ReactDOM'
      }
    ]
  }
 
};
