const _ = require('lodash');
const moment = require('moment');
const devUtils = require('develop-utils');
const restRouterModel = require('rest-router-model');
let BaseBusiness = restRouterModel.BaseBusiness;
let getSchema = restRouterModel.getSchema;
const cacheAble = require('componet-service-framework').cacheAble;
const redis = require('../common/redis');


class OrganizationService {
    constructor(organizationModel,dbOperator,dbHostInfo){
         this.organizationModel  = organizationModel;
         this.dbOperator = dbOperator;
         this.dbHostInfo = dbHostInfo;
         this.cacheTime = 60 * 5;
    }

    getKeyName(applicationUUID)
    {
        return this.dbHostInfo + '_' + applicationUUID;
    }

    async getCache(applicationUUID)
    {
        let data =await cacheAble.fromCache(this.getKeyName(applicationUUID),redis);
        return data;
    }

    setCache(applicationUUID,value)
    {
       cacheAble.toCache(this.cacheTime ,this.getKeyName(applicationUUID),redis,value);
    }


    async checkorganization(applicationUUID,applicationHref,bCreated = true)
    {
        let organizationUUID = null;
        let organizationObj =await this.getCache(applicationUUID);
        if(organizationObj)
        {
            organizationUUID = organizationObj.uuid;
        }
        else
         {
            let {items:directories} = await this.organizationModel.list({applicationUUID:applicationUUID});
            if(directories.length>0)
            {
                organizationUUID =  directories[0].uuid;
                this.setCache(applicationUUID,directories[0]);
            }
            else
            {
                if(bCreated)
                {
                    let date = moment().format('YYYY-MM-DD hh:mm:ss');
                    organizationObj = {
                        uuid:devUtils.createUUID(),
                        name:`application-${applicationUUID}`,
                        description:`href: ${applicationHref || null}`,
                        applicationUUID:applicationUUID,
                        applicationHref:applicationHref,
                        status:'enabled',
                        createdAt: date,
                        modifiedAt: date,
                    };
                    let organization = await this.organizationModel.create(organizationObj);
                    organizationUUID = organizationObj.uuid;
                    this.setCache(applicationUUID,organizationObj);
                }
            }
        }
        return organizationUUID;
    }





}
module.exports = OrganizationService;