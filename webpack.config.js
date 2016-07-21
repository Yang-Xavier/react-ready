/* you should put all src file to ./src .
   npm install -g webpack webpack-dev-server
   npm install --save-dev \
      webpack webpack-dev-server \
      babel-loader babel-core babel-preset-es2015\
      css-loader style-loader \
      url-loader file-loader \
      react react-dom babel-preset-react \

*/
let join = require('path').join
let entry_dir = join(__dirname, './src')
let webpack = require('webpack')
let node_env = process.env.NODE_ENV

let uglifyJsPlugin = webpack.optimize.UglifyJsPlugin
let devFlagPlugin = new webpack.DefinePlugin({
  //You can enable some codes only in development environment with environment flags.
  __DEV__: JSON.stringify('value')
})
let isDebug = true

if(node_env === 'production'){
  isDebug = false
}

let webpackconfig= {
  devtool: isDebug ? 'eval' : '#source-map',
  entry: {
    //name: path
    rootPage: [join(entry_dir, './entry_root.jsx')],
    signPage: [join(entry_dir, './entry_index.jsx')],
    loginPage: [join(entry_dir, './entry_login.jsx')],
    errorPage: [join(entry_dir, './entry_error.jsx')],
	materil: [join(entry_dir,'./entry.jsx')],
  },
  output: {
    path: join(__dirname, './static/dist'),
    publicPath: '/static/dist/', //uri while web set run
	filename: '[name].js'
  },
  module: {
    loaders:[
      {
        test: /\.js[x]?$/,
        exclude: /node_modules/,
		loader: 'babel-loader',
        query: {
          presets: ['react','es2015']
        } 
      },
	  { //Only do this use to local css!
		test: /\.css$/,
		loader: 'style-loader!css-loader?modules',
	  },
	  { //url-loader transforms image files. If the image size is smaller than 8192 bytes, it will be transformed into Data URL otherwise, it will be transformed into normal URL. 
	    test: /\.(png|jpg)$/,
		loader: 'url-loader',
		query: {
		  limit: 8192
		}
	  },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url-loader?limit=10000&minetype=application/font-woff'
      },
      {
        test: /\.(ttf|eot|svg)$/,
        loader: 'file-loader' 
      }
    ]
  },
  plugins: [
    new uglifyJsPlugin({
      //UglifyJs Plugin will minify output(bundle.js) JS codes.http://webpack.github.io/docs/list-of-plugins.html#uglifyjsplugin
      compress: {
        warnings: false
      }
    }),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify(node_env)
      }
    }),
    devFlagPlugin
  ],
  devServer: {
    hot: true,
    proxy: {
      '/api/*': {
        target: 'http://localhost:3000',
        secure: false,
      },
    }
  }
}


module.exports = webpackconfig
