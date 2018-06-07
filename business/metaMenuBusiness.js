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

let parse = restRouterModel.parse;

class MetaMenuBusiness extends BaseOrganizationBusiness
{
    constructor()
    {
        super();
    }


    async syncAppMenus(data,ctx)
    {
        let {   menuOrganizationUpData,
            addMenus,
            addOperators,
            modifiedMenus,
            modifiedOperators,
            delMenus,
            delOperators} = data.body;
        let addMenuOrganizations = {},modifiedMenuOrganizations = {};
        if(menuOrganizationUpData.bCreated)
        {
           menuOrganizationUpData = menuOrganizationHelper.createOrganizations(menuOrganizationUpData.uuid,
               menuOrganizationUpData.applicationHref,menuOrganizationUpData.version);
            addMenuOrganizations = menuOrganizationUpData;
        }
        else
        {
            delete menuOrganizationUpData.bCreated;
            modifiedMenuOrganizations = menuOrganizationUpData;
            modifiedMenuOrganizations.modifiedAt = moment().format('YYYY-MM-DD HH:mm:ss');
        }

        let  addMenuRets = addMenus.map(menuItem=> parse(this.resourceConfig,'menu',menuItem));
        let modifiedMenuRets = modifiedMenus.map(menuItem=> {
            menuItem.modifiedAt = moment().format('YYYY-MM-DD HH:mm:ss');
            return menuItem;
        });

        let addOperatorRets = addOperators.map(operatorItem=> parse(this.resourceConfig,'operator',operatorItem));
        let modifiedOperatorRets = modifiedOperators.map(operatorItem=> {
            operatorItem.modifiedAt = moment().format('YYYY-MM-DD HH:mm:ss');
            return operatorItem;
        });


        let retData = await  this.getMenuProxy().syncAppMenus(addMenuOrganizations,modifiedMenuOrganizations,
            addMenuRets,addOperatorRets,modifiedMenuRets,modifiedOperatorRets,delMenus,delOperators);

        return {menuOrganizationUpData};
    }


}


module.exports = MetaMenuBusiness;


