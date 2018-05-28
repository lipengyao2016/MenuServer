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



let parse = restRouterModel.parse;

class MenuGroupBusiness extends BaseOrganizationBusiness
{
    constructor()
    {
        super();
    }



    async create(data,ctx)
    {
        if( ! data.upLevelMenuGroupUUID )
        {
            return super.create(data,ctx);
        }

        let upLevelMenuGroupUUID = data.upLevelMenuGroupUUID;

        let upMenuGroupObj =  await this.model.getByKeyId(upLevelMenuGroupUUID);

        data.menuOrganizationUUID = upMenuGroupObj.menuOrganizationUUID;
        data.upLevelMenuGroupUUID = upLevelMenuGroupUUID;

        return super.create(data,ctx);
    }

    async listDownLevelMenuGroups(data,ctx)
    {
        let upLevelMenuGroupUUID = ctx.params.menuGroupUUID;
        data.query.upLevelMenuGroupUUID = upLevelMenuGroupUUID;

        let retData =  await this.model.list(data.query);

        return getSchema().generateListResourceSchema('menuGroup',retData.items,data.query.offset,retData.size,ctx);
    }

    async listDownLevelMenuGroupByOrganizaions(data,ctx)
    {
        let menuOrganizationUUID = ctx.params.menuOrganizationUUID;
        data.query.menuOrganizationUUID = menuOrganizationUUID;
        data.query.upLevelMenuGroupUUID = null;

        let retData =  await this.model.list(data.query);

        return getSchema().generateListResourceSchema('menuGroup',retData.items,data.query.offset,retData.size,ctx);
    }


    

}


module.exports = MenuGroupBusiness;


