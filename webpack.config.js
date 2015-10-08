module.exports = {
	entry: './app/index.js',
	output: {
		path: __dirname + '/public',
		filename: 'app.js'
	},
	module: {
		loaders: [
			{ test: /\.jade$/, loader: 'jade'},
			{ test: /\.css$/, loader: 'style!css'},
			{ test: /\.svg$/, loader: 'raw'},
		]
	}
};