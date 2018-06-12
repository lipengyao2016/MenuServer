/**
 * Created by Administrator on 2018/4/24.
 */
const _ = require('lodash');
const moment = require('moment');
const devUtils = require('develop-utils');
const restRouterModel = require('rest-router-model');
let BaseBusiness = restRouterModel.BaseBusiness;
let getSchema = restRouterModel.getSchema;
const BaseProxyTranction = require('./baseProxyTranction');

let parse = restRouterModel.parse;

class OperatorProxy  extends  BaseProxyTranction
{
    constructor(dbOperater,curModel,models)
    {
       super(dbOperater);

       this.knex = dbOperater;
       this.curModel = curModel;
       this.models = models;
      // this.curTable = this.knex(this.curModel.prototype.tableName);
    }


    async updateData(delOperatorUUIDs,addOperators)
    {
        let operatorName = this.models['operator'].prototype.tableName;
        let knex = this.knex;

        let retData =  await this.buildTraction(knex,function (trx) {
              return this.delete(knex,operatorName,'uuid',delOperatorUUIDs,trx)
                .then(data=>{
                    return this.insert(knex,operatorName,addOperators,trx);
                })
        });

        return retData;
    }

}


module.exports = OperatorProxy;


