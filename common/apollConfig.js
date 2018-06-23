const _ = require('lodash');
const apoll = require('node-apollo');



exports.convertDataToObj = (data,config)=>{
    let destObj = {};
    _.keys(data).map(key=>{
        let keyArray = key.split('.');

        let val = _.get(config,keyArray);
        let newVal;

        if(typeof val == 'number')
        {
            newVal = parseInt(data[key]);
        }
        else if(typeof val == 'boolean')
        {
            newVal =  _.isEqual(data[key],'true');
        }
        else
        {
            newVal = data[key];
        }


        _.set(destObj, keyArray, newVal);
    });

    return _.merge(config,destObj);
};

exports.readConfigFromConfigServer = async (appName,confServerURL,/*intKeys,boolKeys*/ config)=>{

    const server_config = {
        configServerUrl: confServerURL,
        appId: appName,
        clusterName: 'default',
        namespaceName: ['application','TEST1.Common'],
        apolloEnv: 'dev',
    };

    return new Promise(function (resolve, reject) {
        apoll.remoteConfigServiceFromCache(server_config)
            .then((data =>
            {
                // apollo.createEnvFile(data);

               /* intKeys.map(key=>{
                    if(data[key])
                    {
                        data[key] = parseInt(data[key]);
                    }
                })

                boolKeys.map(key=>{
                    if(data[key])
                    {
                        data[key] = _.isEqual(data[key],'true');
                    }
                });*/

                console.log('get server_config from configServer data:' + JSON.stringify(data,null,2));

                resolve(exports.convertDataToObj(data,config));

            }))
            .catch(err => {
                console.error(err);
                reject(err);
            });
    });
};

/*
let intKeys = ['cache.time','server.port','knex.pool.min','knex.pool.max','knex.connection.port'
    ,'eurekaServer.port','redis.port','redis.db'];
let boolKeys = ['cache.open'];

this.readConfigFromConfigServer('MenuServer','http://192.168.7.26:8080/',intKeys,boolKeys).then(data=>{
    console.log('get server_config from data:'+ JSON.stringify(data,null,2));
});*/
