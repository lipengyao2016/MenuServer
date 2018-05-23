/**
 * Created by Administrator on 2018/4/24.
 */
const _ = require('lodash');
const moment = require('moment');
const devUtils = require('develop-utils');
const restRouterModel = require('rest-router-model');
let BaseBusiness = restRouterModel.BaseBusiness;
let getSchema = restRouterModel.getSchema;
const serverConfig = require('../config/config');
const returnResources = require('./returnResources');
const dateSqlFormater = require('./dateSqlFormater');

class GoodsBusiness extends BaseBusiness
{
    constructor()
    {
        super();
        
/*        this.name = name;
        this.model = model;
        this.dbOperater = dbOperater;
        this.resourceConfig = resourceConfig;
        this.models = models;*/
    }



    async listGoodsTotalStatistics(data,ctx){

        let knex = this.dbOperater;
        let qsbuilder = knex(this.model.prototype.tableName);
        let queryString2SQL = this.model.queryString2SQL;

        let unit = data.query.unit;
        let dateFormat = dateSqlFormater.getDateFormat(data.query.unit);
        if(!dateFormat)
        {
            console.error('GoodsBusiness -> listGoodsTotalStatistics unit is not day or month, invaid!!! unit:');
        }
        delete data.query.unit;

        let queryStr = queryString2SQL(qsbuilder,data.query);

        let allSelectSql = `${dateFormat} as unitDate`;

        let queryPromise =   qsbuilder.select(knex.raw(allSelectSql)).sum('weight as sumWeight')
            .groupBy('unitDate').orderByRaw('unitDate asc,sumWeight desc');


        let retData = await  queryPromise;

        retData = returnResources.generatePackageTotalStatisticsRetJSON(retData,data.query.createdAt,unit);

        return retData;
    }


    makeArraySql(dataArrays,key,aggerFunc,aggerName)
    {
        let retSqls = [];
        let i = 0;
        for(i = 0;i < dataArrays.length;i++)
        {
            let curData = dataArrays[i];
            if(i == 0)
            {
                retSqls.push(`${aggerFunc}(CASE WHEN ${key} <= ${curData} THEN 1 ELSE 0 END) AS ${curData}_${aggerName}`);

                let nextData = dataArrays[i+1];
                retSqls.push(`${aggerFunc}(CASE WHEN ${key} > ${curData} AND ${key} <= ${nextData} THEN 1 ELSE 0 END) AS ${curData}_${nextData}_${aggerName}`);

            }
            else if(i == dataArrays.length - 1)
            {
                retSqls.push(`${aggerFunc}(CASE WHEN ${key} > ${curData} THEN 1 ELSE 0 END) AS ${curData}_${aggerName}`);
            }
            else
            {
                let nextData = dataArrays[i+1];
                retSqls.push(`${aggerFunc}(CASE WHEN ${key} > ${curData} AND ${key} <= ${nextData} THEN 1 ELSE 0 END) AS ${curData}_${nextData}_${aggerName}`);
            }
        }

        return retSqls;
    }


    async listGoodsWeightStatistics(data,ctx){

        let knex = this.dbOperater;
        let qsbuilder = knex(this.model.prototype.tableName);
        let queryString2SQL = this.model.queryString2SQL;

        let weightArrays = data.query.weightArrays;
        delete data.query.weightArrays;

        queryString2SQL(qsbuilder,data.query);

        qsbuilder.select(knex.raw('goodsPackageUUID')).sum('weight as packageWeight')
            .groupBy('goodsPackageUUID').orderByRaw('packageWeight desc');

        let innerSql = qsbuilder.toString();

        let weightSqls = this.makeArraySql(weightArrays,'packageWeight','SUM','weight').join(',');

        let allSql = `SELECT ${weightSqls} from (${innerSql}) t`;

        console.log('listGoodsWeightStatistics-> ' + allSql);

        let retData = await  knex.raw(allSql);

        return retData[0];
    }



    async listGoodsCostStatistics(data,ctx){

        let knex = this.dbOperater;
        let qsbuilder = knex(this.model.prototype.tableName);
        let queryString2SQL = this.model.queryString2SQL;

        let costArrays = data.query.costArrays;
        delete data.query.costArrays;

        queryString2SQL(qsbuilder,data.query);

        qsbuilder.select(knex.raw('goodsPackageUUID')).sum('cost as packageCost')
            .groupBy('goodsPackageUUID').orderByRaw('packageCost desc');

        let innerSql = qsbuilder.toString();

        let costSqls = this.makeArraySql(costArrays,'packageCost','SUM','cost').join(',');

        let allSql = `SELECT ${costSqls} from (${innerSql}) t`;

        console.log('listGoodsCostStatistics-> ' + allSql);

        let retData = await  knex.raw(allSql);

        return retData[0];
    }

}


module.exports = GoodsBusiness;


