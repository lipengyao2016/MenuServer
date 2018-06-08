/**
 * Created by Administrator on 2018/4/24.
 */
const _ = require('lodash');
const moment = require('moment');
const devUtils = require('develop-utils');
const restRouterModel = require('rest-router-model');
let BaseBusiness = restRouterModel.BaseBusiness;
let getSchema = restRouterModel.getSchema;


let parse = restRouterModel.parse;

class MenuProxy 
{
    constructor(dbOperater,curModel,models)
    {
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

        
        let retData =await  knex.transaction(function (trx) {
            knex(menuName).insert(menus).transacting(trx)
                .then(function (menuResults) {
                    console.log('MenuProxy --> create menu db succes name:' + JSON.stringify(menuResults));
                    if(operators.length > 0)
                    {
                        return knex(operatorName).insert(operators).transacting(trx);
                    }
                    else
                    {
                        return 'no operators';
                    }
                })
                .then(function (operatorResults) {
                    console.log('MenuProxy -->  create success operatorResults :' + JSON.stringify(operatorResults));
                    trx.commit();
                    return "success";
                })
                .catch(function (error) {
                    console.error('MenuProxy -->  create error :' + error);
                    trx.rollback();
                    throw new Error(error);
                });

/*            menuTable.delete().whereIn('uuid', ['MJ4Hj4YVytC3nVPvj78JAA']).transacting(trx).then(function (updateResult) {
               console.log('MenuProxy -->  create success updateResult :' + JSON.stringify(updateResult));
                let menus = {uuid:'8KMwPfurIZoEHfENAShS6g',name:'xxx'};
                return menuTable.update(menus).where('uuid', menus.uuid).transacting(trx);
           })
               .then(function (delMenuResults) {
                   console.log('MenuProxy -->  create success delMenuResults :' + JSON.stringify(delMenuResults));
                   trx.rollback();
                   return "success";
               })
               .catch(function (error) {
                   console.error('MenuProxy -->  create error :' + error);
                   trx.rollback();
                   throw new Error(error);
               });*/
        })
        .then(
                inserts=> {
                    return "ok";
                }
            )

        return retData;
    }

    

}


module.exports = MenuProxy;


