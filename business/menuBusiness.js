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


    async create(data,ctx)
    {
        if( !data.operators )
        {
            return super.create(data,ctx);
        }

        let organization = await  this.checkMenuOrganizationByApplication(data,true);

        let operators =data.operators.map(operatorItem =>
        {
            operatorItem.menuUUID = data.uuid;

            /*operatorItem.uuid = devUtils.createUUID();
            operatorItem.createdAt = operatorItem.modifiedAt = moment().format('YYYY-MM-DD HH:mm:ss');
            operatorItem.status = 'enabled';*/

            operatorItem = parse(this.resourceConfig,'operator',operatorItem);
            return operatorItem;
        }
        );
        let menus = data;
        delete menus.operators;

        let retData = await  this.getMenuProxy().create(menus,operators);
        return menus;
    }



    async listTreeMenus(data,ctx)
    {
        let qs = _.clone(data.query);
        let organization = await  this.checkMenuOrganizationByApplication(qs,false);

        if(!qs.menuOrganizationUUID)
        {
            return null;
        }

        let menuOrganizationObj = await this.models['menuOrganization'].getByKeyId(qs.menuOrganizationUUID);

        //{items,size}
        let menuGroupObj = await this.models['menuGroup'].listAll({menuOrganizationUUID:qs.menuOrganizationUUID
            ,orderBy:'uiOrder ASC'});
        let menuGroupUUIDs = menuGroupObj.items.map(menuGroupItem=>menuGroupItem.uuid);

        let menuObj = await this.models['menu'].listAll({menuGroupUUID:menuGroupUUIDs
            ,orderBy:'uiOrder ASC'});
        let menuUUIDs = menuObj.items.map(menuItem=>menuItem.uuid);

        let operatorObj = await this.models['operator'].listAll({menuUUID:menuUUIDs
            ,orderBy:'uiOrder ASC'});


        menuObj.items.map(menuItem=>{
            let operatorByMenus = _.groupBy(operatorObj.items,'menuUUID');
            menuItem.operators = {}
            menuItem.operators.items =operatorByMenus[menuItem.uuid] ?  operatorByMenus[menuItem.uuid] : [];
            menuItem.operators.size = menuItem.operators.items.length;
        })

        menuGroupObj.items.map(menuGroupItem=>{
            let menuByGroups = _.groupBy(menuObj.items,'menuGroupUUID');
            menuGroupItem.menus = {};
            menuGroupItem.menus.items = menuByGroups[menuGroupItem.uuid] ? menuByGroups[menuGroupItem.uuid] : [];
            menuGroupItem.menus.size =  menuGroupItem.menus.items.length ;
        });

        menuOrganizationObj.menuGroups = menuGroupObj;

        return menuOrganizationObj;

    }


}


module.exports = MenuBusiness;


