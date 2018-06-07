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

class MenuBusiness extends BaseOrganizationBusiness
{
    constructor()
    {
        super();
    }

    getMenuProxy()
    {
        if(!this.menuProxy)
        {
            this.menuProxy = new MenuProxy(this.dbOperater,this.model,this.models);
        }
        return this.menuProxy;
    }

    async preProcessMenuData(data)
    {
        if(data.menuGroupUUID)
        {
            let menuGroupObj = await this.models['menuGroup'].getByKeyId(data.menuGroupUUID);
            data.menuOrganizationUUID = menuGroupObj.menuOrganizationUUID;
        }

        if(data.metaMenuUUID)
        {
            let menuMetaObj = await this.models['metaMenu'].getByKeyId(data.metaMenuUUID);
            if(!data.menuId)
            {
                data.menuId = menuMetaObj.menuId;
            }
            if(!data.name)
            {
                data.name = menuMetaObj.name;
            }

            if(!data.operators)
            {
                data.operators = [];
            }
            if(data.bCreatedOperators)
            {
                let metaOperatorData = await  this.models['metaOperator'].listAll({metaMenuUUID:data.metaMenuUUID});

                metaOperatorData.items.map(metaOperatorItem=>{
                    data.operators.push({
                        name:metaOperatorItem.name,
                        operatorId:metaOperatorItem.operatorId,
                    });
                })
            }

            delete data.metaMenuUUID;
            delete  data.bCreatedOperators;

            data.operators = data.operators.map(operatorItem =>
            {
                operatorItem.menuUUID = data.uuid;
                operatorItem = parse(this.resourceConfig,'operator',operatorItem);
                return operatorItem;
            } );
        }

        let organization = await  this.checkMenuOrganizationByOwner(data,true);

        return data;
    }


    async create(data,ctx)
    {
        data = await  this.preProcessMenuData(data);

        let operators = data.operators;
        let menu = data;
        delete menu.operators;

        let menus = [];
        menus.push(menu);

        let retData = await  this.getMenuProxy().create(menus,operators);
        return menu;
    }


    async batchCreate(data,ctx)
    {
        let menus = [],operators = [];
        for(let i = 0;i < data.length;i++)
        {
            let curData = await  this.preProcessMenuData(data[i]);

            let tempOperators = curData.operators;
            let tempMenu = curData;
            delete curData.operators;
            menus.push(tempMenu);
            operators = operators.concat(tempOperators);
        }

        let retData = await  this.getMenuProxy().create(menus,operators);
        return menus;
    }


    async listTreeMenuGroups(menuOrganizationUUID)
    {
        let MenuGroupData = await  this.models['menuGroup'].listAll({menuOrganizationUUID:menuOrganizationUUID
            ,orderBy:'uiOrder ASC'});
        let MenuGroups = MenuGroupData.items.map(menuGroupItem=>
            // _.pick(menuGroupItem,['uuid','name','description','upLevelMenuGroupUUID'])
            utils.excludeAttrData(menuGroupItem,['id','createdAt','modifiedAt','menuOrganizationUUID'])
        );
        let retObj = {
            menuOrganizationUUID:menuOrganizationUUID,
            subMenuGroups:[],
            flatMenuGroups:MenuGroupData.items,
        };

        let parentMenuGroupMap = {};
        MenuGroups.map(menuGroupItem=>{
            if(!parentMenuGroupMap[menuGroupItem.upLevelMenuGroupUUID])
            {
                parentMenuGroupMap[menuGroupItem.upLevelMenuGroupUUID] = [menuGroupItem];
            }
            else
            {
                parentMenuGroupMap[menuGroupItem.upLevelMenuGroupUUID].push(menuGroupItem);
            }
        });

        retObj.subMenuGroups = parentMenuGroupMap[null];
        this.insertSubmenuGroup(retObj,parentMenuGroupMap);

        return retObj;

    }

    insertSubmenuGroup(curMenuGroup,parentMenuGroupMap)
    {
        //console.log('insertSubmenuGroup start curMenuGroup:' + JSON.stringify(curMenuGroup));

        curMenuGroup.subMenuGroups.map(submenuGroupItem=>{

            submenuGroupItem.subMenuGroups = parentMenuGroupMap[submenuGroupItem.uuid] ? parentMenuGroupMap[submenuGroupItem.uuid] : [];

            //console.log('insertSubmenuGroup start submenuGroupItem:' + JSON.stringify(submenuGroupItem));

            if(submenuGroupItem.subMenuGroups && submenuGroupItem.subMenuGroups.length > 0)
            {
                //console.log('insertSubmenuGroup again insertSubmenuGroup  start submenuGroupItem:' + JSON.stringify(submenuGroupItem));
                this.insertSubmenuGroup(submenuGroupItem,parentMenuGroupMap);
                //console.log('insertSubmenuGroup again insertSubmenuGroup  end submenuGroupItem:' + JSON.stringify(submenuGroupItem));
            }

            //console.log('insertSubmenuGroup end submenuGroupItem:' + JSON.stringify(submenuGroupItem));
        });

        // console.log('insertSubmenuGroup end curMenuGroup:' + JSON.stringify(curMenuGroup));
    }



    async listTreeMenus(data,ctx)
    {
        let qs = _.clone(data.query);

        if(qs.menuOrganizationHref)
        {
            qs.menuOrganizationUUID = devUtils.getResourceUUIDInURL(qs.menuOrganizationHref,'menuOrganizations');
        }

        let organization = await  this.checkMenuOrganizationByOwner(qs,false);

        if(!qs.menuOrganizationUUID)
        {
            return null;
        }

        let menuOrganizationObj = await this.models['menuOrganization'].getByKeyId(qs.menuOrganizationUUID);

        menuOrganizationObj = utils.excludeAttrData(menuOrganizationObj,['id','createdAt','modifiedAt']);

        if(!menuOrganizationObj)
        {
            return null;
        }

        //{items,size}
        let menuGroupObj = /*await this.models['menuGroup'].listAll({menuOrganizationUUID:qs.menuOrganizationUUID
            ,orderBy:'uiOrder ASC'})*/
         await this.listTreeMenuGroups(qs.menuOrganizationUUID);

        let menuGroupUUIDs = menuGroupObj.flatMenuGroups.map(menuGroupItem=>menuGroupItem.uuid);

        let menuObj = await this.models['menu'].listAll({menuGroupUUID:menuGroupUUIDs
            ,orderBy:'uiOrder ASC'});
        let menuUUIDs = menuObj.items.map(menuItem=>menuItem.uuid);

        let operatorObj = await this.models['operator'].listAll({menuUUID:menuUUIDs
            ,orderBy:'uiOrder ASC'});

        operatorObj.items = operatorObj.items.map(operatorItem=>utils.excludeAttrData(operatorItem,['id','createdAt','modifiedAt']));

        let operatorByMenus = _.groupBy(operatorObj.items,'menuUUID');


        menuObj.items = menuObj.items.map(menuItem=>{
            menuItem.operators = {};
            menuItem.operators =operatorByMenus[menuItem.uuid] ?  operatorByMenus[menuItem.uuid] : [];
           // menuItem.operators.size = menuItem.operators.items.length;

            return utils.excludeAttrData(menuItem,['id','createdAt','modifiedAt','menuOrganizationUUID'])
        })

        let menuByGroups = _.groupBy(menuObj.items,'menuGroupUUID');

        let retObj = {
            menuOrganization:menuOrganizationObj,
            subMenuGroups:menuGroupObj.subMenuGroups,
        }

        retObj.subMenuGroups.map(subMenuGroupItem=>this.addMenusToMenuGroups(subMenuGroupItem,menuByGroups));

        return retObj;
    }

    addMenusToMenuGroups(curMenuGroups,menuByGroups)
    {
        if(curMenuGroups.subMenuGroups.length <= 0)
        {
            curMenuGroups.menus = {};
            curMenuGroups.menus = menuByGroups[curMenuGroups.uuid] ? menuByGroups[curMenuGroups.uuid] : [];
           // curMenuGroups.menus.size =  curMenuGroups.menus.items.length ;
        }

        curMenuGroups.subMenuGroups.map(subMenuGroupItem=>this.addMenusToMenuGroups(subMenuGroupItem,menuByGroups));

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


module.exports = MenuBusiness;


