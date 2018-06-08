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
const BaseProxyTranction = require('./baseProxyTranction');

class MetaMenuProxy extends  BaseProxyTranction
{
    constructor(dbOperater,curModel,models)
    {
       super(dbOperater);
       this.knex = dbOperater;
       this.curModel = curModel;
       this.models = models;
    }

    getUpdateValidData(valid)
    {
        return  {
            isValid:valid? 1 : 0,
            modifiedAt : moment().format('YYYY-MM-DD HH:mm:ss'),
        };
    }




    async syncAppMenus( addMenuOrganizations,
                        modifiedMenuOrganizations,
                        addMenus,
                        addOperators,
                        modifiedMenus,
                        modifiedOperators,
                        delMenus,
                        delOperators,
                        addMenuIds,
                        addOperatosIds,
                        delMenuIds,
                        delOperatorIds)
    {

        let metaMenuName = this.curModel.prototype.tableName;
        let metaOperatorName = this.models['metaOperator'].prototype.tableName;
        let metaMenuOrganizationName = this.models['metaMenuOrganization'].prototype.tableName;
        let knex = this.knex;

        let menuName =this.models['menu'].prototype.tableName;
        let operatorName = this.models['operator'].prototype.tableName;


        let retData =  await this.buildTraction(knex,function (trx) {

            /** 2018/6/8  更新菜单组织。
             lpy-modifyed  */
            return this.insert(knex,metaMenuOrganizationName,addMenuOrganizations,trx)
                .then(data=>{
                    return this.update(knex,metaMenuOrganizationName,modifiedMenuOrganizations,trx);
                })
                /** 2018/6/8  更新元菜单和元操作。
                 lpy-modifyed  */
                .then(data=>{
                    return this.insert(knex,metaMenuName,addMenus,trx);
                })
                .then(data=>{
                    return this.insert(knex,metaOperatorName,addOperators,trx);
                })
                .then(data=>{
                    return this.delete(knex,metaMenuName,'uuid',delMenus,trx);
                })
                .then(data=>{
                    return this.delete(knex,metaOperatorName,'uuid',delOperators,trx);
                })
                .then(data=>{
                    return this.update(knex,metaMenuName,modifiedMenus,trx);
                })
                .then(data=>{
                    return this.update(knex,metaOperatorName,modifiedOperators,trx);
                })

            /** 2018/6/8  当新增元菜单和元操作时更新菜单和操作表的isvalid属性为1，反之为0 。
             lpy-modifyed  */
                .then(data=>{
                    return this.batchUpdate(knex,menuName,this.getUpdateValidData(true),'menuId',addMenuIds,trx);
                })
                .then(data=>{
                    return this.batchUpdate(knex,operatorName,this.getUpdateValidData(true),'operatorId',addOperatosIds,trx);
                })
                .then(data=>{
                    return this.batchUpdate(knex,menuName,this.getUpdateValidData(false),'menuId',delMenuIds,trx);
                })
                .then(data=>{
                    return this.batchUpdate(knex,operatorName,this.getUpdateValidData(false),'operatorId',delOperatorIds,trx);
                })

        });

        return retData;

/*        let retData =await  this.knex.transaction(function (trx) {

            Promise.resolve('start').then(data=>{
                if(addMenuOrganizations.uuid)
                {
                    return knex(menuOrganizationName).insert(addMenuOrganizations).transacting(trx).then((addMenuOrganizationResults)=>{
                        console.log('MetaMenuProxy --> syncAppMenus   addMenuOrganizationResults:' + JSON.stringify(addMenuOrganizationResults));
                        return addMenuOrganizationResults;
                    })
                }
                else
                {
                     console.log('MetaMenuProxy --> syncAppMenus   no addMenuOrganizations');
                     return 'no addMenuOrganizations';
                }
            })
                .then(function (results) {

                    if(modifiedMenuOrganizations)
                    {
                        return knex(menuOrganizationName).update(modifiedMenuOrganizations).where('uuid', modifiedMenuOrganizations.uuid).transacting(trx)
                            .then((modifiedMenuOrganizationResults)=>{
                                console.log('MetaMenuProxy -->  syncAppMenus  modifiedMenuOrganizationResults :' + JSON.stringify(modifiedMenuOrganizationResults));
                                return modifiedMenuOrganizationResults;
                            });
                    }
                    else
                    {
                        console.log('MetaMenuProxy --> syncAppMenus   no modifiedMenuOrganizations');
                        return 'no modifiedMenuOrganizations';
                    }
                })
                .then(function (results) {

                    if(addMenus.length > 0)
                    {
                        return knex(metaMenuName).insert(addMenus).transacting(trx).then((addMenuResults)=>{
                            console.log('MetaMenuProxy -->  syncAppMenus  addMenuResults :' + JSON.stringify(addMenuResults));
                            return addMenuResults;
                        })
                    }
                    else
                    {
                        console.log('MetaMenuProxy --> syncAppMenus   no addMenus');
                        return 'no addMenus';
                    }
                })
                .then(function (results) {
                    if(addOperators.length > 0)
                    {
                        return knex(metaOperatorName).insert(addOperators).transacting(trx).then((addOperatorResults)=>{
                            console.log('MetaMenuProxy -->  syncAppMenus  addOperatorResults :' + JSON.stringify(addOperatorResults));
                            return addOperatorResults;
                        })
                    }
                    else
                    {
                        console.log('MetaMenuProxy --> syncAppMenus   no addOperators');
                        return 'no addOperators';
                    }

                })

                .then(function (results) {

                    if(delMenus.length > 0)
                    {
                        return knex(metaMenuName).delete().whereIn('uuid', delMenus).transacting(trx).then((delMenuResults)=>{
                            console.log('MetaMenuProxy -->  syncAppMenus  delMenuResults :' + JSON.stringify(delMenuResults));
                            return delMenuResults;
                        });
                    }
                    else
                    {
                        console.log('MetaMenuProxy --> syncAppMenus   no delMenus');
                        return 'no delMenus';
                    }

                })
                .then(function (results) {

                    if(delOperators.length > 0)
                    {
                        return knex(metaOperatorName).delete().whereIn('uuid', delOperators).transacting(trx).then((delOperatorResults)=>{
                            console.log('MetaMenuProxy -->  syncAppMenus success delOperatorResults :' + JSON.stringify(delOperatorResults));
                            return delOperatorResults;
                        });
                    }
                    else
                    {
                        console.log('MetaMenuProxy --> syncAppMenus   no delOperators');
                        return 'no delOperators';
                    }

                })
                .then(function (results) {

                    if(modifiedMenus.length > 0)
                    {
                        let allUpdateMenus = modifiedMenus.map(updateMenu=>(knex(metaMenuName).update(updateMenu)
                            .where('uuid', updateMenu.uuid).transacting(trx)) );

                        return Promise.all(allUpdateMenus).then((allUpdateMenuResults)=>{
                            console.log('MetaMenuProxy -->  syncAppMenus  allUpdateMenuResults :' + JSON.stringify(allUpdateMenuResults));
                            return allUpdateMenuResults;
                        });
                    }
                    else
                    {
                        console.log('MetaMenuProxy --> syncAppMenus   no modifiedMenus');
                        return 'no modifiedMenus';
                    }

                })
                .then(function (results) {
                    if(modifiedOperators.length > 0)
                    {
                        let allUpdateOperators = modifiedOperators.map(updateOperator=>(knex(metaOperatorName).update(updateOperator)
                            .where('uuid', updateOperator.uuid).transacting(trx)) );

                        return Promise.all(allUpdateOperators).then((allUpdateOperatorResults)=>{
                            console.log('MetaMenuProxy -->  syncAppMenus  allUpdateOperatorResults :' + JSON.stringify(allUpdateOperatorResults));
                            return allUpdateOperatorResults;
                        });
                    }
                    else
                    {
                        console.log('MetaMenuProxy --> syncAppMenus   no modifiedOperators');
                        return 'no modifiedOperators';
                    }
                })

                /!** 2018/6/8  当新增元菜单和元操作时更新菜单和操作表的isvalid属性为1，反之为0 。
                 lpy-modifyed  *!/
                .then(function (results) {

                    if(addMenuIds.length > 0)
                    {
                        return knex(menuName).update({
                            isValid:1,
                            modifiedAt : moment().format('YYYY-MM-DD HH:mm:ss'),
                        }).whereIn('menuId',addMenuIds).transacting(trx).then((addMenuIdsResults)=>{
                            console.log('MetaMenuProxy -->  syncAppMenus  addMenuIdsResults :' + JSON.stringify(addMenuIdsResults));
                            return addMenuIdsResults;
                        })
                    }
                    else
                    {
                        console.log('MetaMenuProxy --> syncAppMenus   no addMenuIds');
                        return 'no addMenuIds';
                    }
                })
                .then(function (results) {
                    if(addOperatosIds.length > 0)
                    {
                        return knex(operatorName).update({
                            isValid:1,
                            modifiedAt : moment().format('YYYY-MM-DD HH:mm:ss'),
                        }).whereIn('operatorId',addOperatosIds).transacting(trx).then((addOperatorIdsResults)=>{
                            console.log('MetaMenuProxy -->  syncAppMenus  addOperatorIdsResults :' + JSON.stringify(addOperatorIdsResults));
                            return addOperatorIdsResults;
                        })
                    }
                    else
                    {
                        console.log('MetaMenuProxy --> syncAppMenus   no addOperatosIds');
                        return 'no addOperatosIds';
                    }

                })

                .then(function (results) {

                    if(delMenuIds.length > 0)
                    {
                        return knex(menuName).update({
                            isValid:0,
                            modifiedAt : moment().format('YYYY-MM-DD HH:mm:ss'),
                        }).whereIn('menuId',delMenuIds).transacting(trx).then((delMenuIdsResults)=>{
                            console.log('MetaMenuProxy -->  syncAppMenus  delMenuIdsResults :' + JSON.stringify(delMenuIdsResults));
                            return delMenuIdsResults;
                        });
                    }
                    else
                    {
                        console.log('MetaMenuProxy --> syncAppMenus   no delMenuIds');
                        return 'no delMenuIds';
                    }

                })
                .then(function (results) {

                    if(delOperatorIds.length > 0)
                    {
                        return knex(operatorName).update({
                            isValid:0,
                            modifiedAt : moment().format('YYYY-MM-DD HH:mm:ss'),
                        }).whereIn('operatorId',addOperatosIds).transacting(trx).then((delOperatorResults)=>{
                            console.log('MetaMenuProxy -->  syncAppMenus success delOperatorResults :' + JSON.stringify(delOperatorResults));
                            return delOperatorResults;
                        });
                    }
                    else
                    {
                        console.log('MetaMenuProxy --> syncAppMenus   no delOperators');
                        return 'no delOperators';
                    }
                })

                
                .then(function (delOperatorResults) {
                    console.log('MetaMenuProxy --> syncAppMenus   success.');
                    trx.commit();
                    return "success";
                })
                .catch(function (error) {
                    console.error('MetaMenuProxy -->  syncAppMenus error :' + error);
                    trx.rollback();
                    throw new Error(error);
                });
        })
            .then(
                inserts=> {
                    return "ok";
                }
            )

        return retData;*/
    }
    

}


module.exports = MetaMenuProxy;


