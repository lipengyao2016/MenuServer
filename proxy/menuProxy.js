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
       this.curTable = this.knex(this.curModel.prototype.tableName);
    }
    



    async create(menus,operators)
    {
        let menuTable = this.curTable ;
        let operatorTable = this.knex(this.models['operator'].prototype.tableName);
        
        let retData =await  this.knex.transaction(function (trx) {
            menuTable.insert(menus).transacting(trx)
                .then(function (menuResults) {
                    console.log('MenuProxy --> create menu db succes name:' + JSON.stringify(menus));
                    return operatorTable.insert(operators).transacting(trx);
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


