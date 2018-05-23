/**
 * Created by Administrator on 2018/1/8.
 */
const log4js = require('./log4js');
const package = require('./package.json');
const config = require('./config/config');
const resourceConfig = require('./config/resourceConfig');

const restRouterModel = require('rest-router-model');

// 依次从系统环境变量、配置文件（配置环境或文件）读取服务端口，默认为3000

const server_name = package.name;
const ip = config.server.domain;
const port = process.env.PORT || config.server.port || '3000';

//let UserBusiness = require('./business/userBusiness');
/*let GoodPackageBusiness = require('./business/goodPackageBusiness');
let GoodsBusiness = require('./business/goodsBusiness');*/

extendBusinesses = {
/*    goodsPackage: new GoodPackageBusiness(),
    goods:new GoodsBusiness(),*/
};

const Koa = require('koa');
const KoaRouter = require('koa-router');
const logger = require('koa-logger');

const appKoa = new Koa();

const app =require('koa-qs')(appKoa, 'extended');

const jsonExpand = require('koa-json-url-expand');

app.use(logger());
app.use(jsonExpand.routerPlugin);

let options = {
    serverName: server_name,
    ip: ip,
    port: port
};
restRouterModel.koaRestRouter(resourceConfig, extendBusinesses, config.knex, options).then(koa_router=>{
    app.use(koa_router.routes());
    let server = app.listen(port);
    server.on('error', onError);
    server.on('listening', onListening);
});




// Event listener for HTTP server "error" event.
function onError(error) {
    if(error.syscall !== 'listen'){ throw error; }
    let bind = typeof port === 'string' ? (`pipe ${port}`) : (`port ${port}`);
    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            console.error('[Server Start] --> '+bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error('[Server Start] --> '+bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
}
//Event listener for HTTP server "listening" event.
function onListening() {
    let addr = this.address();
    let bind = typeof addr === 'string' ? (`pipe ${addr}`) : (`port ${addr.port}`);

    console.log(`[Server Start] --> ${server_name} listening on ${bind}`);
}


