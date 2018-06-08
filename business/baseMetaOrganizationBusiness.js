/**
 * Created by Administrator on 2018/4/24.
 */
const _ = require('lodash');
const moment = require('moment');
const devUtils = require('develop-utils');
const restRouterModel = require('rest-router-model');
let BaseBusiness = restRouterModel.BaseBusiness;
let getSchema = restRouterModel.getSchema;
const serverConfig = require('../config/config');

class BaseMetaOrganizationBusiness extends BaseBusiness
{
    constructor()
    {
        super();
        this.organizationService = null;
    }


    async create(data,ctx)
    {
        let organization = await  this.checkMenuOrganizationByOwner(data,true);
        return super.create(data);
    }

    async checkMenuOrganizationByOwner(data,bCreated )
    {
        let organizationUUID;
        if(!data.metaMenuOrganizationUUID) //数据中没有目录UUID，则检测是否有商户信息
        {
            let applicationHref = data.applicationHref;
            if(applicationHref)
            {
                /*ctx.params.ownerUUID ||*/
               // let ownerUUID =  devUtils.getResourceUUIDInURL(ownerHref,'owners');
                organizationUUID = await this.businesses['metaMenuOrganization'].checkorganization(data.applicationHref,bCreated);
                if(bCreated)
                {
                    data.metaMenuOrganizationUUID = organizationUUID;
                }
                else
                 {
                    data.metaMenuOrganizationUUID = organizationUUID ? organizationUUID : 'Temp_organization_UUID';
                 }

                delete data.applicationHref;
            }
        }

        console.log('checkMenuOrganizationByowner organizationUUID:' + organizationUUID);

        return organizationUUID;
    }

    async list(data,ctx){

        let qs = _.clone(data);
        let organization = await  this.checkMenuOrganizationByOwner(qs,false);

        /*let {items,size} =*/ return await super.list(qs);
    }
}


module.exports = BaseMetaOrganizationBusiness;


