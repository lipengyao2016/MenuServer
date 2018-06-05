const _ = require('lodash');
const moment = require('moment');
const devUtils = require('develop-utils');
const restRouterModel = require('rest-router-model');
let BaseBusiness = restRouterModel.BaseBusiness;
let getSchema = restRouterModel.getSchema;
const cacheAble = require('componet-service-framework').cacheAble;
const redis = require('../common/redis');
let parse = restRouterModel.parse;

class MenuOrganizationHelper {
    constructor(){

    }


    async createOrganizations(applicationHref,version,uuid)
    {
        let applicationUUID = devUtils.getLastResourceUUIDInURL(applicationHref);
        let date = moment().format('YYYY-MM-DD hh:mm:ss');
        let organizationObj = {
            uuid:uuid ? uuid : devUtils.createUUID(),
            name:`application-${applicationUUID}`,
            description:`href: ${applicationHref || null}`,
            applicationUUID:applicationUUID,
            applicationHref:applicationHref,
            version:version ? version : '0.0.0',
            status:'enabled',
            createdAt: date,
            modifiedAt: date,
        };

        return organizationObj;
    }


}


module.exports = new MenuOrganizationHelper();