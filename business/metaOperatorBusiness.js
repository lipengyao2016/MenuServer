/**
 * Created by Administrator on 2018/4/24.
 */
const _ = require('lodash');
const moment = require('moment');
const devUtils = require('develop-utils');
const restRouterModel = require('rest-router-model');
let BaseBusiness = restRouterModel.BaseBusiness;
let getSchema = restRouterModel.getSchema;
const  BaseMetaOrganizationBusiness= require('./baseMetaOrganizationBusiness');
const serverConfig = require('../config/config');
const utils = require('../common/utils');
let parse = restRouterModel.parse;

class MetaOperatorBusiness extends BaseMetaOrganizationBusiness
{
    constructor()
    {
        super();
    }


    async preProcessData(data)
    {
        if(data.menuUUID&& !data.metaMenuUUID)
        {
            let menuData = await  this.models['menu'].getByKeyId(data.menuUUID);
            if(menuData.menuId)
            {
                let metaMenuData = await  this.models['metaMenu'].listAll({menuId:menuData.menuId});
                if(metaMenuData.items.length > 0)
                {
                    data.metaMenuUUID = metaMenuData.items[0].uuid;
                }
                else
                {
                    data.metaMenuUUID = 'unknown_metaMenuUID';
                }

            }
            delete data.menuUUID;
        }

        return data;
    }

    async list(data,ctx)
    {
        await  this.preProcessData(data);

        return super.list(data,ctx);
    }


}


module.exports = MetaOperatorBusiness;


