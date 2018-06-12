/**
 * Created by Administrator on 2018/4/24.
 */
const _ = require('lodash');
const moment = require('moment');
const devUtils = require('develop-utils');
const restRouterModel = require('rest-router-model');
let BaseBusiness = restRouterModel.BaseBusiness;
let getSchema = restRouterModel.getSchema;
const  BaseOrganizationBusiness= require('./baseOrganizationBusiness');
const serverConfig = require('../config/config');
const  OperatorProxy= require('../proxy/operatorProxy');
const utils = require('../common/utils');

let parse = restRouterModel.parse;

class OperatorBusiness extends BaseOrganizationBusiness
{
    constructor()
    {
        super();
    }

    getProxy()
    {
        if(!this.proxy)
        {
            this.proxy = new OperatorProxy(this.dbOperater,this.model,this.models);
        }
        return this.proxy;
    }



    async preProcessOperatorData(data)
    {
        if(data.metaOperatorUUID)
        {
            let metaOperatorData = await  this.models['metaOperator'].getByKeyId(data.metaOperatorUUID);
            if(!data.name)
            {
                data.name = metaOperatorData.name;
            }
            if(!data.operatorId)
            {
                data.operatorId = metaOperatorData.operatorId;
            }
            delete  data.metaOperatorUUID;
        }
        return data;
    }

    async getOldOperatorData(menuUUID)
    {
        let oldOperatorData = await  this.model.listAll({menuUUID});
        return oldOperatorData.items.map(operatorItem=>operatorItem.uuid);
    }


    async create(data,ctx)
    {
        let oldOperatorUUIDs = [];
        if(data.menuUUID)
        {
            oldOperatorUUIDs = await  this.getOldOperatorData(data.menuUUID);
        }

        data = await  this.preProcessOperatorData(data);

        //return super.create(data,ctx);

        let retData = await this.getProxy().updateData(oldOperatorUUIDs,data);
        return data;
    }


    async batchCreate(data,ctx)
    {
        let oldOperatorUUIDs = [];
        if(data[0].menuUUID)
        {
            oldOperatorUUIDs = await  this.getOldOperatorData(data[0].menuUUID);
        }

        let operators = [];
        for(let i = 0;i < data.length;i++)
        {
            let curData = await  this.preProcessOperatorData(data[i]);
            operators.push(curData);
        }

        //return super.batchCreate(operators);

        let retData = await this.getProxy().updateData(oldOperatorUUIDs,operators);
        return operators;
    }


}


module.exports = OperatorBusiness;


