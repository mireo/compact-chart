module.exports = {
	publicPath: process.env.NODE_ENV === 'production' ? '/compact-chart/' : '/',
	chainWebpack: config => {},
	productionSourceMap: false,
	configureWebpack: {
		externals: {
			moment: 'moment'
		}
	}
}