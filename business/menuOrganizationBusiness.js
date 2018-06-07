/**
 * Created by Administrator on 2018/4/24.
 */
const _ = require('lodash');
const moment = require('moment');
const devUtils = require('develop-utils');
const restRouterModel = require('rest-router-model');
let BaseBusiness = restRouterModel.BaseBusiness;
let getSchema = restRouterModel.getSchema;
const  BaseOrganizationBusiness= require('./baseOrganizationBusiness');
const serverConfig = require('../config/config');
const  MenuProxy= require('../proxy/menuProxy');
const utils = require('../common/utils');
const menuOrganizationHelper = require('./menuOrganizationHelper');
const inflection = require( 'inflection' );
const cacheAble = require('componet-service-framework').cacheAble;
const redis = require('../common/redis');


let parse = restRouterModel.parse;

class MenuOrganizationBusiness extends BaseBusiness
{
    constructor()
    {
        super();
        this.cacheTime = 60 * 5;
    }

    getKeyName(ownerUUID)
    {
        return `${serverConfig.knex.connection.host}:${serverConfig.knex.connection.port}` + '_' + ownerUUID;
    }

    async getCache(ownerUUID)
    {
        let data =await cacheAble.fromCache(this.getKeyName(ownerUUID),redis);
        return data;
    }

    setCache(ownerUUID,value)
    {
        cacheAble.toCache(this.cacheTime ,this.getKeyName(ownerUUID),redis,value);
    }


    async create(data,ctx)
    {
        let ownerHref = data.ownerHref;
        if(! data.ownerType)
        {
            let ownerStrs = ownerHref.split('/');;
            if(ownerStrs.length > 2)
            {
                let ownerType = ownerStrs[ownerStrs.length-2];
                data.ownerType = inflection.singularize(ownerType);
            }
        }
        if(!data.name)
        {
            data.name = `owner-${data.ownerUUID}`;
        }
        if(!data.description)
        {
            data.description = `href: ${ownerHref || null}`;
        }

        return super.create(data);

    }


    async list(data,ctx)
    {
        let ownerHref = data.ownerHref;
        if(!data.ownerUUID && data.ownerHref)
        {
            data.ownerUUID = devUtils.getLastResourceUUIDInURL(data.ownerHref);
            delete data.ownerHref;
        }

        let organizationObj =await this.getCache(data.ownerUUID);
        if(organizationObj)
        {
            return organizationObj;
        }

        let ret = await super.list(data);
        if(ret.items.length > 0)
        {
            this.setCache(data.ownerUUID,ret);
        }
        return ret;
    }


    async checkorganization(ownerHref, bCreated = true) {
        let ownerUUID = devUtils.getLastResourceUUIDInURL(ownerHref);
        let organizationUUID = null;

        let {items: directories} = await this.list({ownerUUID: ownerUUID});
        if (directories.length > 0) {
            organizationUUID = directories[0].uuid;
            console.log('MenuOrganizationBusiness->checkorganization find organizationUUID:',organizationUUID);
        }
        else if (bCreated) {
            let organizationData = parse(this.resourceConfig,'menuOrganization',{ownerHref});
            let organization = await this.create(organizationData);
            organizationUUID = organization.uuid;
            console.log('MenuOrganizationBusiness->checkorganization create organizationUUID:',organizationUUID);
        }

        return organizationUUID;
    }

}


module.exports = MenuOrganizationBusiness;


