module.exports = {
    css: {
        loaderOptions: {
            sass: {
                data: `@import "@/assets/variable.scss";`
            }
        }
    },
    lintOnSave: process.env.NODE_ENV !== 'production',
    devServer: {
        proxy: {
            '^/api': {
                target: 'www.example.com',
                ws: true,
                changeOrigin: true,
                pathRewrite: {
                    '^/api': '/'
                }
            }
        },
        overlay: {
            warnings: true,
            errors: true
        }
    }
}
