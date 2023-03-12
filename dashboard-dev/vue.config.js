const path = require('path');
const webpack = require('webpack');
var SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin')

function resolveSrc(_path) {
    return path.join(__dirname, _path)
}
module.exports = {
    devServer: {
        proxy: 'https://mainsite.com/',
        },
    outputDir: path.resolve(__dirname, "../dashboard"),
    // publicPath: '/dashboard/',
    publicPath: process.env.NODE_ENV === 'production' ?
        '/' : '/',
    configureWebpack: {
        // Set up all the aliases we use in our app.
        resolve: {
            alias: {
                'src': resolveSrc('src'),
                'chart.js': 'chart.js/dist/Chart.js'
            }
        },
        plugins: [
            new webpack.optimize.LimitChunkCountPlugin({
                maxChunks: 6
            }),
            // new SWPrecacheWebpackPlugin({
            //     cacheId: 'let cook = this.$cookies.get(this.cookieVariable);',
            //     filename: 'service-worker.js',
            //     staticFileGlobs: ['../dashboard/**/*.{js,html,css}','/login'],
            //     minify: true,
            //     stripPrefix: '../dashboard/',
            //     runtimeCaching: [
            //         {
            //             urlPattern: /^https:\/\/fonts\.googleapis\.com\//,
            //             handler: 'cacheFirst'
            //         },
            //         {
            //             urlPattern: /^https:\/\/fonts\.gstatic\.com\//,
            //             handler: 'cacheFirst'
            //         },
            //         {
            //             urlPattern: /^https:\/\/code\.getmdl\.io\//,
            //             handler: 'cacheFirst'
            //         }]
            // })
        ]
    },
    pwa: {
        name: 'My Profile',
        themeColor: '#66615B',
        msTileColor: '#66615B',
        appleMobileWebAppCapable: 'yes',
        appleMobileWebAppStatusBarStyle: '#66615B',
        workboxPluginMode: 'InjectManifest',
        workboxOptions: {
            // swSrc is required in InjectManifest mode.
            swSrc: 'public/service-worker.js',
            // ...other Workbox options...
        },
    },
    css: {
        // Enable CSS source maps.
        sourceMap: process.env.NODE_ENV !== 'production'
    }
};