const { createProxyMiddleware } = require('http-proxy-middleware');

const context = [
    "/weatherforecast",
    "/snl",
    "/portfolios",
    "/scheduler",
];

module.exports = function (app) {
    const appProxy = createProxyMiddleware(context, {
        target: 'https://localhost:7260',
        secure: false
    });

    app.use(appProxy);
};  
