/**
 * Created by Administrator on 2018/4/24.
 */
const _ = require('lodash');
const moment = require('moment');
const devUtils = require('develop-utils');
const restRouterModel = require('rest-router-model');
let BaseBusiness = restRouterModel.BaseBusiness;
let getSchema = restRouterModel.getSchema;
const BaseProxyTranction = require('componet-service-framework').baseProxyTranction;

let parse = restRouterModel.parse;

class MenuProxy  extends  BaseProxyTranction
{
    constructor(dbOperater,curModel,models)
    {
       super(dbOperater);

       this.knex = dbOperater;
       this.curModel = curModel;
       this.models = models;
      // this.curTable = this.knex(this.curModel.prototype.tableName);
    }


    async create(menus,operators)
    {
        /** 2018/6/1  KNEX 的菜单表由全局改为局部，防止事务共享，死锁。
         lpy-modifyed  */

        let menuName = this.curModel.prototype.tableName;
        let operatorName = this.models['operator'].prototype.tableName;
        let knex = this.knex;

        let retData =  await this.buildTraction(knex,function (trx) {
              return this.insert(knex,menuName,menus,trx)
                  .then(data=>{
                      return this.insert(knex,operatorName,operators,trx);
                  })
        });

        return retData;
    }

    async deleteData(menuUUID,operators)
    {
        /** 2018/6/1  KNEX 的菜单表由全局改为局部，防止事务共享，死锁。
         lpy-modifyed  */

        let menuName = this.curModel.prototype.tableName;
        let operatorName = this.models['operator'].prototype.tableName;
        let knex = this.knex;

        let retData =  await this.buildTraction(knex,function (trx) {
              return this.delete(knex,menuName,'uuid',menuUUID,trx)
                .then(data=>{
                    return this.delete(knex,operatorName,'uuid',operators,trx);
                })
        });

        return retData;
    }
    

}


module.exports = MenuProxy;


