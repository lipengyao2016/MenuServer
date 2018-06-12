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
const  MetaMenuProxy= require('../proxy/metaMenuProxy');
const utils = require('../common/utils');
let parse = restRouterModel.parse;

class MetaMenuBusiness extends BaseMetaOrganizationBusiness
{
    constructor()
    {
        super();
    }

    getProxy()
    {
        if(!this.proxy)
        {
            this.proxy = new MetaMenuProxy(this.dbOperater,this.model,this.models);
        }
        return this.proxy;
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
        let bMenuOrganizationCreated = menuOrganizationUpData.bCreated;
        delete menuOrganizationUpData.bCreated;

        if(bMenuOrganizationCreated)
        {
           menuOrganizationUpData = parse(this.resourceConfig,'metaMenuOrganization',menuOrganizationUpData);
           menuOrganizationUpData = this.businesses['metaMenuOrganization'].preOrganizationData(menuOrganizationUpData);
           addMenuOrganizations = menuOrganizationUpData;
        }
        else
        {
            modifiedMenuOrganizations = menuOrganizationUpData;
            modifiedMenuOrganizations.modifiedAt = moment().format('YYYY-MM-DD HH:mm:ss');
        }

        let addMenuIds = [],addOperatosIds=[];

        let  addMenuRets = addMenus.map(menuItem=> {
            addMenuIds.push(menuItem.menuId);
            return parse(this.resourceConfig,'metaMenu',menuItem)});
        let modifiedMenuRets = modifiedMenus.map(menuItem=> {
            menuItem.modifiedAt = moment().format('YYYY-MM-DD HH:mm:ss');
            return menuItem;
        });

        let addOperatorRets = addOperators.map(operatorItem=> {
            addOperatosIds.push(operatorItem.operatorId);
           return parse(this.resourceConfig,'metaOperator',operatorItem)});

        let modifiedOperatorRets = modifiedOperators.map(operatorItem=> {
            operatorItem.modifiedAt = moment().format('YYYY-MM-DD HH:mm:ss');
            return operatorItem;
        });


        let delMenuUUIDs=[],delMenuIds=[],delOperatorUUIDs=[],delOperatorIds=[];
        delMenus.map(delMenu=>{
            delMenuUUIDs.push(delMenu.uuid);
            delMenuIds.push(delMenu.menuId);
        });
        delOperators.map(delOperator=>{
            delOperatorUUIDs.push(delOperator.uuid);
            delOperatorIds.push(delOperator.operatorId);
        })



        let retData = await  this.getProxy().syncAppMenus(addMenuOrganizations,modifiedMenuOrganizations,
            addMenuRets,addOperatorRets,modifiedMenuRets,modifiedOperatorRets,delMenuUUIDs,delOperatorUUIDs,
            addMenuIds,addOperatosIds,delMenuIds,delOperatorIds);

        return {menuOrganizationUpData};
    }


    async listUnAllocatedMetaMenus(data,ctx)
    {
        let qs = _.clone(data.query);
        let applicationHref = qs.applicationHref;
        let ownerHref = qs.ownerHref;
        if(!ownerHref)
        {
            ownerHref = applicationHref;
        }
        let organization = await  this.checkMenuOrganizationByOwner(qs,false);
        let metaMenusObjs = await this.model.listAll({metaMenuOrganizationUUID:qs.metaMenuOrganizationUUID});

        let menusObjs = await this.businesses['menu'].listAll({applicationHref,ownerHref});

        let unAllocMetaMenus = {
            size:0,
            items:[],
        };

        metaMenusObjs.items.map(metaMenuItem=>{
            let metaMenuData = _.find(menusObjs.items,menuItem=>_.isEqual(menuItem.menuId,metaMenuItem.menuId));
            if(!metaMenuData)
            {
                unAllocMetaMenus.items.push(_.pick(metaMenuItem,['uuid','name','menuId']));
            }
        });
        unAllocMetaMenus.size = unAllocMetaMenus.items.length;

        return unAllocMetaMenus;
    }


}


module.exports = MetaMenuBusiness;


