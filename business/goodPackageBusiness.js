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

class GoodPackageBusiness extends BaseBusiness
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




    async listPackageTotalStatistics(data,ctx){

        let knex = this.dbOperater;
        let qsbuilder = knex(this.model.prototype.tableName);
        let queryString2SQL = this.model.queryString2SQL;

        let unit = data.query.unit;
        let dateFormat = dateSqlFormater.getDateFormat(data.query.unit);
        if(!dateFormat)
        {
            console.error('GoodPackageBusiness -> listPackageTotalStatistics unit is not day or month, invaid!!! unit:');
        }
        delete data.query.unit;

        let queryStr = queryString2SQL(qsbuilder,data.query);

        let allSelectSql = `${dateFormat} as unitDate`;

        let queryPromise =   qsbuilder.select(knex.raw(allSelectSql)).count('id as count')
            .groupBy('unitDate').orderByRaw('unitDate asc,count desc');


        let retData = await  queryPromise;

        retData = returnResources.generatePackageTotalStatisticsRetJSON(retData,data.query.createdAt,unit);

        return retData;

    }
}


module.exports = GoodPackageBusiness;


