/**
 * Created by Administrator on 2018/1/15.
 */
module.exports = {
    // 目录
    "directory":{
        rest_api: 'batch' ,
        params: {
            name:{type:'string'},
            description:{type:'string'},
            status:{type:'string',value:'enabled'},
            merchant: {type: 'url'},
            createdAt: {type:'time'},
            modifiedAt:{type:'time'},
        },
    },

    // 货物类型。
    "goodsType": {
        rest_api: /*'base'*/ 'batch',
        //super: 'directory',
        params: {
            name:{type:'string'},
            description:{type:'string'},
            typeCode:{type:'string'},
            level: {type:'number',value:0},

            carbinRadio: {type:'number',value:0},
            waterRadio: {type:'number',value:0},
            costRadio: {type:'number',value:0},

            status:{type:'string',value:'enabled'},
            createdAt: {type:'time'},
            modifiedAt:{type:'time'},
        },
    },

    // 货物包裹
    "goodsPackage":{
        rest_api: 'batch',
        super: 'directory',

        extend_api: [
           // {name: 'create', method: 'POST', url:'/api/:version/merchants/:merchantUUID/customers'},
            {name: 'listPackageTotalStatistics', method: 'GET', url:'/api/:version/goodsPackageTotalStatistics'},
        ],
        params: {
            packageId: {type: 'string'},
            name: {type: 'string'},
            quatity: {type: 'number',value:0},
            weight: {type: 'number',value:0},
            delivery: {type: 'url'},
            deliverySource: {type: 'string'},
            status:{type:'string',value:'created'},
            createdAt: {type:'time'},
            modifiedAt:{type:'time'},
        },
    },

    // 货物
    "goods":{
        rest_api: 'batch',
        super: 'goodsPackage',

        extend_api: [
            // {name: 'create', method: 'POST', url:'/api/:version/merchants/:merchantUUID/customers'},
            {name: 'listGoodsTotalStatistics', method: 'GET', url:'/api/:version/goodsTotalStatistics'},
            {name: 'listGoodsWeightStatistics', method: 'GET', url:'/api/:version/goodsWeightStatistics'},
            {name: 'listGoodsCostStatistics', method: 'GET', url:'/api/:version/goodsCostStatistics'},
        ],

        params: {
            goodsType: {type: 'url',isSaveHref:false},
            sortedRecord: {type: 'url',isSaveHref:false},
            name: {type: 'string'},
            weight: {type: 'number',value:0},
            cost: {type: 'number',value:0},
            carbin: {type: 'number',value:0},
            water: {type: 'number',value:0},
            status:{type:'string',value:'created'},
            createdAt: {type:'time'},
            modifiedAt:{type:'time'},
        },
    },


    // 分拣记录。
    "sortedRecord":{
        rest_api: 'batch',
        super: 'goodsPackage',
        params: {
            sortedAddress: {type: 'string'},
            sortedOperator: {type: 'string'},
            sortedAt: {type: 'time'},
            sortedPlace: {type: 'string'},
            createdAt: {type:'time'},
            modifiedAt:{type:'time'},
        },
    },

};