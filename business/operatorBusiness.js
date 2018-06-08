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
const  MenuProxy= require('../proxy/menuProxy');
const utils = require('../common/utils');

let parse = restRouterModel.parse;

class OperatorBusiness extends BaseOrganizationBusiness
{
    constructor()
    {
        super();
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


    async create(data,ctx)
    {
        data = await  this.preProcessOperatorData(data);
        return super.create(data);
    }


    async batchCreate(data,ctx)
    {
        let operators = [];
        for(let i = 0;i < data.length;i++)
        {
            let curData = await  this.preProcessOperatorData(data[i]);
            operators.push(curData);
        }

        return super.batchCreate(operators);
    }


}


module.exports = OperatorBusiness;


