/**
 * Created by Administrator on 2018/1/8.
 */
const log4js = require('./log4js');
const config = require('./config/config');

config.readConfigServerParams().then(data=>{

    console.log('readConfigServerParams  config:'+ JSON.stringify(config,null,2));

    const package = require('./package.json');
    const resourceConfig = require('./config/resourceConfig');
    const restRouterModel = require('rest-router-model');




// 依次从系统环境变量、配置文件（配置环境或文件）读取服务端口，默认为3000

    const server_name = package.name;
    const ip = config.server.domain;
    const port = process.env.PORT || config.server.port || '3000';



    let BaseOrganizationBusiness = require('./business/baseOrganizationBusiness');
    let MenuBusiness = require('./business/menuBusiness');
    let MenuGroupBusiness = require('./business/menuGroupBusiness');
    let MenuOrganizationBusiness = require('./business/menuOrganizationBusiness');
    let OperatorBusiness = require('./business/operatorBusiness');
    let MetaMenuBusiness = require('./business/metaMenuBusiness');

    let MetaMenuOrganizationBusiness = require('./business/metaMenuOrganizationBusiness');

    let MetaOperatorBusiness = require('./business/metaOperatorBusiness');

    extendBusinesses = {
        menuOrganization: new MenuOrganizationBusiness(),
        menuGroup: new MenuGroupBusiness(),
        menu: new MenuBusiness(),
        operator:new OperatorBusiness(),
        metaMenuOrganization: new MetaMenuOrganizationBusiness(),
        metaMenu:new MetaMenuBusiness(),
        metaOperator:new MetaOperatorBusiness(),
    };

    const Koa = require('koa');
    const KoaRouter = require('koa-router');
    const logger = require('koa-logger');

    const appKoa = new Koa();

    const app =require('koa-qs')(appKoa, 'extended');

    const jsonExpand = require('koa-json-url-expand');


 /*   app.use(async (ctx,next)=>{

        let redis = config.redis;
        if(ctx.method == 'POST' || ctx.method == 'PUT'){

            // delete ctx.request.body.token;

            console.log(`body:\n${JSON.stringify(ctx.request.body,null,2)}`);
        }
        else if(ctx.method == 'GET')
        {
            //delete ctx.query.token;

            console.log(`query:\n${JSON.stringify(ctx.query,null,2)}`);
        }
        await next();
    });*/


    app.use(logger());
    app.use(jsonExpand.routerPlugin);


    let options = {
        serverName: server_name,
        ip: ip,
        port: port
    };

    const EurekaClientConfig = require('./eurekaClientConfig');
    let eurekaClient = new EurekaClientConfig(server_name,config);

    restRouterModel.koaRestRouter(resourceConfig, extendBusinesses, config.knex, options).then(koa_router=>{
        app.use(koa_router.routes());
        let server = app.listen(port);
        server.on('error', onError);
        server.on('listening', onListening);


       let registerServerTimer = setInterval(() => {
           eurekaClient.registerService().then(data=>{
                console.log('register data:' + data);
                clearInterval(registerServerTimer);
            });
        }, 3000);

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

});







