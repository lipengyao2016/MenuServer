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

class BaseOrganizationBusiness extends BaseBusiness
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
        if(!data.menuOrganizationUUID) //数据中没有目录UUID，则检测是否有商户信息
        {
            let ownerHref = data.ownerHref;
            if(ownerHref)
            {
                /*ctx.params.ownerUUID ||*/
               // let ownerUUID =  devUtils.getResourceUUIDInURL(ownerHref,'owners');
                organizationUUID = await this.businesses['menuOrganization'].checkorganization(ownerHref,bCreated);
                if(bCreated)
                {
                    data.menuOrganizationUUID = organizationUUID;
                }
                else
                 {
                    data.menuOrganizationUUID = organizationUUID ? organizationUUID : 'Temp_organization_UUID';
                 }

                delete data.ownerHref;
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


module.exports = BaseOrganizationBusiness;


