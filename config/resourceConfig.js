/**
 * Created by Administrator on 2018/1/15.
 */

const config = require('./config');

module.exports = {
    // 组织
    "menuOrganization":{
        rest_api: 'batch' ,

        extend_api: [
            // {name: 'create', method: 'POST', url:'/api/:version/merchants/:merchantUUID/customers'},
            // {name: 'listPackageTotalStatistics', method: 'GET', url:'/api/:version/goodsPackageTotalStatistics'},
            //{name: 'listGoodsCostStatistics', method: 'GET', url:'/api/:version/goodsCostStatistics'},
        ],

        params: {
            name:{type:'string'},
            description:{type:'string'},
            status:{type:'string',value:'enabled'},
            downLevelMenuGroups:{type:'url',isSaveHref:false,isSchema : true,url:`http://${config.server.domain}:${config.server.port}/api/v1/menuOrganizations/`+'${uuid}/downLevelMenuGroups' },
            owner: {type: 'url'},
            ownerType: {type: 'string'},
            version:{type:'string',value:'0.0.0'},
            createdAt: {type:'time'},
            modifiedAt:{type:'time'},
        },
    },

    // 菜单分组。
    "menuGroup": {
        rest_api: /*'base'*/ 'batch',
        super: 'menuOrganization',

        extend_api: [
            {name: 'listDownLevelMenuGroups', method: 'GET', url:'/api/:version/menuGroups/:menuGroupUUID/downLevelMenuGroups'},
            {name: 'listDownLevelMenuGroupByOrganizaions', method: 'GET', url:'/api/:version/menuOrganizations/:menuOrganizationUUID/downLevelMenuGroups'},
           // {name:  'listTreeMenuGroups', method: 'GET', url:'/api/:version/treeMenuGroups'},
        ],

        params: {
            name:{type:'string'},
            description:{type:'string'},
            upLevelMenuGroup:{type:'url',isSaveHref:false,url:`http://${config.server.domain}:${config.server.port}/api/v1/menuGroups/`+'${upLevelMenuGroupUUID}'},
            downLevelMenuGroups:{type:'url',isSaveHref:false,isSchema : true,url:`http://${config.server.domain}:${config.server.port}/api/v1/menuGroups/`+'${uuid}/downLevelMenuGroups' },
            uiOrder: {type:'number',value:0},
            status:{type:'string',value:'enabled'},
            createdAt: {type:'time'},
            modifiedAt:{type:'time'},
        },
    },

    // 菜单
    "menu":{
        rest_api: 'batch',
        super: 'menuGroup',

        extend_api: [
           // {name: 'create', method: 'POST', url:'/api/:version/merchants/:merchantUUID/customers'},
           // {name: 'listPackageTotalStatistics', method: 'GET', url:'/api/:version/goodsPackageTotalStatistics'},
            {name: 'listTreeMenus', method: 'GET', url:'/api/:version/treeMenus'},
            {name: 'syncAppMenus', method: 'POST', url:'/api/:version/syncAppMenus'},
        ],
        params: {
            description: {type: 'string'},
            name: {type: 'string'},
            type: {type: 'number',value:0},
            number: {type: 'string'},
            menuId: {type: 'string'},
            iconHref: {type: 'string'},
            uiOrder: {type: 'number',value:0},

            menuOrganization: {type: 'url',isSaveHref:false},
            status:{type:'string',value:'enabled'},
            createdAt: {type:'time'},
            modifiedAt:{type:'time'},
        },
    },

    // 操作
    "operator":{
        rest_api: 'batch',
        super: 'menu',

        extend_api: [
            // {name: 'create', method: 'POST', url:'/api/:version/merchants/:merchantUUID/customers'},
            //{name: 'listGoodsTotalStatistics', method: 'GET', url:'/api/:version/goodsTotalStatistics'},
           // {name: 'listGoodsWeightStatistics', method: 'GET', url:'/api/:version/goodsWeightStatistics'},
           // {name: 'listGoodsCostStatistics', method: 'GET', url:'/api/:version/goodsCostStatistics'},
        ],

        params: {
            name: {type: 'string'},
            operatorId: {type: 'string'},
            uiOrder: {type: 'number',value:0},
            status:{type:'string',value:'enabled'},
            createdAt: {type:'time'},
            modifiedAt:{type:'time'},
        },
    },



    // 元菜单
    "metaMenu":{
        rest_api: 'batch',
        super: 'menuOrganization',

        extend_api: [
         /*   {name: 'listTreeMenus', method: 'GET', url:'/api/:version/treeMenus'},
            {name: 'syncAppMenus', method: 'POST', url:'/api/:version/syncAppMenus'},*/
        ],
        params: {

            name: {type: 'string'},
            menuId: {type: 'string'},
            status:{type:'string',value:'enabled'},
            createdAt: {type:'time'},
            modifiedAt:{type:'time'},
        },
    },


    // 元操作
    "metaOperator":{
        rest_api: 'batch',
        super: 'metaMenu',

        extend_api: [

        ],
        params: {

            name: {type: 'string'},
            operatorId: {type: 'string'},
            status:{type:'string',value:'enabled'},
            createdAt: {type:'time'},
            modifiedAt:{type:'time'},
        },
    },



};