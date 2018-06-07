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


    async syncAppMenus( addMenuOrganizations,
                        modifiedMenuOrganizations,
                        addMenus,
                        addOperators,
                        modifiedMenus,
                        modifiedOperators,
                        delMenus,
                        delOperators)
    {

        let menuName = this.curModel.prototype.tableName;
        let operatorName = this.models['operator'].prototype.tableName;
        let menuOrganizationName = this.models['menuOrganization'].prototype.tableName;
        let knex = this.knex;

        let operatorTable = this.knex(operatorName);
        let menuOrganizationTable = this.knex(menuOrganizationName);
        let menuTable = this.knex(menuName);


        let retData =await  this.knex.transaction(function (trx) {

            Promise.resolve('start').then(data=>{
                if(addMenuOrganizations.uuid)
                {
                    return knex(menuOrganizationName).insert(addMenuOrganizations).transacting(trx).then((addMenuOrganizationResults)=>{
                        console.log('MenuProxy --> syncAppMenus   addMenuOrganizationResults:' + JSON.stringify(addMenuOrganizationResults));
                        return addMenuOrganizationResults;
                    })
                }
                else
                {
                     console.log('MenuProxy --> syncAppMenus   no addMenuOrganizations');
                     return 'no addMenuOrganizations';
                }
            })
                .then(function (results) {


                    if(modifiedMenuOrganizations)
                    {
                        return knex(menuOrganizationName).update(modifiedMenuOrganizations).where('uuid', modifiedMenuOrganizations.uuid).transacting(trx)
                            .then((modifiedMenuOrganizationResults)=>{
                                console.log('MenuProxy -->  syncAppMenus  modifiedMenuOrganizationResults :' + JSON.stringify(modifiedMenuOrganizationResults));
                                return modifiedMenuOrganizationResults;
                            });
                    }
                    else
                    {
                        console.log('MenuProxy --> syncAppMenus   no modifiedMenuOrganizations');
                        return 'no modifiedMenuOrganizations';
                    }
                })
                .then(function (results) {

                    if(addMenus.length > 0)
                    {
                        return knex(menuName).insert(addMenus).transacting(trx).then((addMenuResults)=>{
                            console.log('MenuProxy -->  syncAppMenus  addMenuResults :' + JSON.stringify(addMenuResults));
                            return addMenuResults;
                        })
                    }
                    else
                    {
                        console.log('MenuProxy --> syncAppMenus   no addMenus');
                        return 'no addMenus';
                    }
                })
                .then(function (results) {
                    if(addOperators.length > 0)
                    {
                        return knex(operatorName).insert(addOperators).transacting(trx).then((addOperatorResults)=>{
                            console.log('MenuProxy -->  syncAppMenus  addOperatorResults :' + JSON.stringify(addOperatorResults));
                            return addOperatorResults;
                        })
                    }
                    else
                    {
                        console.log('MenuProxy --> syncAppMenus   no addOperators');
                        return 'no addOperators';
                    }

                })

                .then(function (results) {

                    if(delMenus.length > 0)
                    {
                        return knex(menuName).delete().whereIn('uuid', delMenus).transacting(trx).then((delMenuResults)=>{
                            console.log('MenuProxy -->  syncAppMenus  delMenuResults :' + JSON.stringify(delMenuResults));
                            return delMenuResults;
                        });
                    }
                    else
                    {
                        console.log('MenuProxy --> syncAppMenus   no delMenus');
                        return 'no delMenus';
                    }

                })
                .then(function (results) {

                    if(delOperators.length > 0)
                    {
                        return knex(operatorName).delete().whereIn('uuid', delOperators).transacting(trx).then((delOperatorResults)=>{
                            console.log('MenuProxy -->  syncAppMenus success delOperatorResults :' + JSON.stringify(delOperatorResults));
                            return delOperatorResults;
                        });
                    }
                    else
                    {
                        console.log('MenuProxy --> syncAppMenus   no delOperators');
                        return 'no delOperators';
                    }

                })
                .then(function (results) {

                    if(modifiedMenus.length > 0)
                    {
                        let allUpdateMenus = modifiedMenus.map(updateMenu=>(knex(menuName).update(updateMenu)
                            .where('uuid', updateMenu.uuid).transacting(trx)) );

                        return Promise.all(allUpdateMenus).then((allUpdateMenuResults)=>{
                            console.log('MenuProxy -->  syncAppMenus  allUpdateMenuResults :' + JSON.stringify(allUpdateMenuResults));
                            return allUpdateMenuResults;
                        });
                    }
                    else
                    {
                        console.log('MenuProxy --> syncAppMenus   no modifiedMenus');
                        return 'no modifiedMenus';
                    }

                })
                .then(function (results) {
                    if(modifiedOperators.length > 0)
                    {
                        let allUpdateOperators = modifiedOperators.map(updateOperator=>(knex(operatorName).update(updateOperator)
                            .where('uuid', updateOperator.uuid).transacting(trx)) );

                        return Promise.all(allUpdateOperators).then((allUpdateOperatorResults)=>{
                            console.log('MenuProxy -->  syncAppMenus  allUpdateOperatorResults :' + JSON.stringify(allUpdateOperatorResults));
                            return allUpdateOperatorResults;
                        });
                    }
                    else
                    {
                        console.log('MenuProxy --> syncAppMenus   no modifiedOperators');
                        return 'no modifiedOperators';
                    }

                })
                .then(function (delOperatorResults) {
                    console.log('MenuProxy --> syncAppMenus   success.');
                    trx.commit();
                    return "success";
                })
                .catch(function (error) {
                    console.error('MenuProxy -->  syncAppMenus error :' + error);
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


