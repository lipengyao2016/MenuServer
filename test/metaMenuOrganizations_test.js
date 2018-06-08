/**
 * Created by Administrator on 2016/9/25.
 */
const expect = require('chai').expect;
const _ = require('lodash');
const common = require('./common');
const url = common.url;
const utils = require('../common/utils');
const request = require('common-request').request;


describe('metaMenuOrganizations Test Case:',()=>{
    let metaMenuOrganizationsTestCase = {
       // ownerHref:'http://localhost:5000/api/v1.0.0/businessFormat/EQZNqVpEbFxyZ7ayW7x2yA',
        applicationHref:'http://localhost:5000/api/v1.0.0/applications/RQZNqVpEbFxyZ7ayW7x2yA',
    };
    let applicationUUID = 'AppUUIDForTestCase';
    let metaMenuOrganizationsUUID = null;

    let tenantUUID = null;
    let tenantURL = null;

    tenantURL = url ;

  //  metaMenuOrganizationsUUID = '4po7G4eCiSztrYzqsyLisg';

    describe('create test case:',  ()=>{
        it('success create an metaMenuOrganizations',  ()=> {
            //this.timeout(0);

            return request.post(`${tenantURL}/metaMenuOrganizations`,metaMenuOrganizationsTestCase).then( ( {statusCode, body, headers, request} )=>{
                expect(statusCode).to.equal(201);
                expect(headers['content-type']).to.equal('application/json; charset=utf-8');

                metaMenuOrganizationsUUID = utils.getResourceUUIDInURL(body.href,'metaMenuOrganizations');

                console.log('metaMenuOrganizationss test  create  metaMenuOrganizationsUUID  :' + metaMenuOrganizationsUUID +
                    ' body:'+JSON.stringify(body,null,2));
            });
        });
    });
    describe('retrieve test case:', function () {
        it('success retrieve an metaMenuOrganizations  ', function () {
            //this.timeout(0);

            return request.get(`${tenantURL}/metaMenuOrganizations/${metaMenuOrganizationsUUID}`,{}).then( ( { statusCode,body,headers,request} )=>{

                console.log('metaMenuOrganizationss test retrieve   :' + JSON.stringify(body,null,2));

                expect(statusCode).to.equal(200);
                expect(headers['content-type']).to.equal('application/json; charset=utf-8');
                //expect(uriReg.applicationURIReg.test(res.headers['location'])).to.be.true;
               // expect(body.name).to.equal(metaMenuOrganizationsTestCase.name);
            });
        });
    });
    describe('update test case:', function () {
        it('success update an metaMenuOrganizations', function () {
            //this.timeout(0);
           // metaMenuOrganizationsUUID = '7O1PwyXNuUOEXxvRfvbyrQ';
            let updateInfo = {};
            updateInfo.description = 'lpy descript';
            return request.post(`${tenantURL}/metaMenuOrganizations/${metaMenuOrganizationsUUID}`,updateInfo).then( ( { statusCode,body,headers,request} )=>{

                console.log('metaMenuOrganizationss test update   :' + JSON.stringify(body,null,2));

                expect(statusCode).to.equal(200);
                expect(headers['content-type']).to.equal('application/json; charset=utf-8');
                expect(body.description).to.equal(updateInfo.description);
                //expect(uriReg.applicationURIReg.test(res.headers['location'])).to.be.true;
            });
        });
    });
    describe('list test case:', function () {


        it('list metaMenuOrganizationss  ', function () {
            //this.timeout(0);
            let merchantLists = [
                'RQZNqVpEbFxyZ7ayW7x2yA',
                'PQZNqVpEbFxyZ7ayW7x2yA'];
            let qs = {
               // name:'*good*',
                //uuid:['3UCHOeNl5tVmN83fkyQfNQ','V1bg0v8SlXKs8OXApykNzg'],
                /*               offset:0,
                               limit:1,
                               createdAt:'[,2018-04-18 18:13:28]'*/
                applicationHref:'http://localhost:5000/api/v1.0.0/applications/AQZNqVpEbFxyZ7ayW7x2yA',
            };
            return request.get(`${tenantURL}/metaMenuOrganizations`,qs).then( ( { statusCode,body,headers,request} )=>{

                console.log('metaMenuOrganizationss test list   :' + JSON.stringify(body,null,2));

                expect(statusCode).to.equal(200);
                expect(headers['content-type']).to.equal('application/json; charset=utf-8');
                //expect(uriReg.applicationURIReg.test(res.headers['location'])).to.be.true;
            });
        });
    });

    describe('delete test case:',()=>{
        it('success delete an metaMenuOrganizations', function () {
            //this.timeout(0);

          /*  return request.delete(`${tenantURL}/metaMenuOrganizations/${metaMenuOrganizationsUUID}`).then( ( { statusCode,body,headers,request} )=>{
                expect(statusCode).to.equal(204);
            });*/
        });
    });
});