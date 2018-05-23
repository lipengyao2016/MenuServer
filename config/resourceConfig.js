/**
 * Created by Administrator on 2018/1/15.
 */
module.exports = {
    // 组织
    "menuOrganization":{
        rest_api: 'batch' ,
        params: {
            name:{type:'string'},
            description:{type:'string'},
            status:{type:'string',value:'enabled'},
            application: {type: 'url'},
            createdAt: {type:'time'},
            modifiedAt:{type:'time'},
        },
    },

    // 菜单分组。
    "menuGroup": {
        rest_api: /*'base'*/ 'batch',
        super: 'menuOrganization',
        params: {
            name:{type:'string'},
            description:{type:'string'},
            upLevelMenuGroupUUID:{type:'string'},
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


};