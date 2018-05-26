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


    async listTreeMenuGroups(data,ctx)
    {
        if(data.query.menuOrganizationHref)
        {
            data.query.menuOrganizationUUID = devUtils.getResourceUUIDInURL(data.query.menuOrganizationHref,'menuOrganizations');
        }

        await  this.checkMenuOrganizationByApplication(data.query,false);
        let menuOrganizationUUID = data.query.menuOrganizationUUID;

        let MenuGroupData = await  this.model.listAll({menuOrganizationUUID:menuOrganizationUUID});
        let MenuGroups = MenuGroupData.items.map(menuGroupItem=>_.pick(menuGroupItem,['uuid','name','description','upLevelMenuGroupUUID']));
        let retObj = {
            root:
                {
                    menuOrganizationUUID:menuOrganizationUUID,
                    subMenuGroups:[],
                }
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

        retObj.root.subMenuGroups = parentMenuGroupMap[null];
        this.insertSubmenuGroup(retObj.root,parentMenuGroupMap);

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
    

}


module.exports = MenuGroupBusiness;


