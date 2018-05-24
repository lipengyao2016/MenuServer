/**
 * Created by Administrator on 2018/4/24.
 */
const _ = require('lodash');
const moment = require('moment');
const devUtils = require('develop-utils');
const restRouterModel = require('rest-router-model');
let BaseBusiness = restRouterModel.BaseBusiness;
let getSchema = restRouterModel.getSchema;
const  OrganizationService= require('./organizationService');
const serverConfig = require('../config/config');

class BaseOrganizationBusiness extends BaseBusiness
{
    constructor()
    {
        super();
        this.organizationService = null;
    }


    getorganizationService()
    {
        if(!this.organizationService)
        {
            this.organizationService = new OrganizationService(this.models['menuOrganization'],this.dbOperater,
                `${serverConfig.knex.connection.host}:${serverConfig.knex.connection.port}`);
        }
        return this.organizationService;

    }

    async create(data,ctx)
    {
        let organization = await  this.checkMenuOrganizationByApplication(data,true);
        return super.create(data);
    }

    async checkMenuOrganizationByApplication(data,bCreated )
    {
        let organizationUUID;
        if(!data.menuOrganizationUUID) //数据中没有目录UUID，则检测是否有商户信息
        {
            let applicationHref = data.applicationHref;
            if(applicationHref)
            {
                /*ctx.params.applicationUUID ||*/
                let applicationUUID =  devUtils.getResourceUUIDInURL(applicationHref,'applications');
                organizationUUID = await this.getorganizationService().checkorganization(applicationUUID,applicationHref,bCreated);
                if(bCreated)
                {
                    data.menuOrganizationUUID = organizationUUID;
                }
                else
                 {
                    data.menuOrganizationUUID = organizationUUID ? organizationUUID : 'Temp_organization_UUID';
                 }

                delete data.applicationHref;
            }
        }

        return organizationUUID;
    }

    async list(data,ctx){

        let qs = _.clone(data);
        let organization = await  this.checkMenuOrganizationByApplication(qs,false);

        /*let {items,size} =*/ return await super.list(qs);
    }
}


module.exports = BaseOrganizationBusiness;


