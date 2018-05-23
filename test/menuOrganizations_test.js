/**
 * Created by Administrator on 2016/9/25.
 */
const expect = require('chai').expect;
const _ = require('lodash');
const common = require('./common');
const url = common.url;
const utils = require('../common/utils');
const request = require('common-request').request;


describe('menuOrganizations Test Case:',()=>{
    let menuOrganizationsTestCase = {
        name:'BQZNqVpEbFxyZ7ayW7x2yA',
        description:'345dfsf',
        applicationHref:'http://localhost:5000/api/v1.0.0/applications/BQZNqVpEbFxyZ7ayW7x2yA',
    };
    let applicationUUID = 'AppUUIDForTestCase';
    let menuOrganizationsUUID = null;

    let tenantUUID = null;
    let tenantURL = null;

    tenantURL = url ;

  //  menuOrganizationsUUID = '4po7G4eCiSztrYzqsyLisg';

    describe('create test case:',  ()=>{
        it('success create an menuOrganizations',  ()=> {
            //this.timeout(0);

            return request.post(`${tenantURL}/menuOrganizations`,menuOrganizationsTestCase).then( ( {statusCode, body, headers, request} )=>{
                expect(statusCode).to.equal(201);
                expect(headers['content-type']).to.equal('application/json; charset=utf-8');
                expect(body.name).to.equal(menuOrganizationsTestCase.name);

                menuOrganizationsUUID = utils.getResourceUUIDInURL(body.href,'menuOrganizations');

                console.log('menuOrganizationss test  create  menuOrganizationsUUID  :' + menuOrganizationsUUID +
                    ' body:'+JSON.stringify(body,null,2));
            });
        });
    });
    describe('retrieve test case:', function () {
        it('success retrieve an menuOrganizations  ', function () {
            //this.timeout(0);

            return request.get(`${tenantURL}/menuOrganizations/${menuOrganizationsUUID}`,{}).then( ( { statusCode,body,headers,request} )=>{

                console.log('menuOrganizationss test retrieve   :' + JSON.stringify(body,null,2));

                expect(statusCode).to.equal(200);
                expect(headers['content-type']).to.equal('application/json; charset=utf-8');
                //expect(uriReg.applicationURIReg.test(res.headers['location'])).to.be.true;
               // expect(body.name).to.equal(menuOrganizationsTestCase.name);
            });
        });
    });
    describe('update test case:', function () {
        it('success update an menuOrganizations', function () {
            //this.timeout(0);
           // menuOrganizationsUUID = '7O1PwyXNuUOEXxvRfvbyrQ';
            let updateInfo = {};
            updateInfo.description = 'lpy descript';
            return request.post(`${tenantURL}/menuOrganizations/${menuOrganizationsUUID}`,updateInfo).then( ( { statusCode,body,headers,request} )=>{

                console.log('menuOrganizationss test update   :' + JSON.stringify(body,null,2));

                expect(statusCode).to.equal(200);
                expect(headers['content-type']).to.equal('application/json; charset=utf-8');
                expect(body.description).to.equal(updateInfo.description);
                //expect(uriReg.applicationURIReg.test(res.headers['location'])).to.be.true;
            });
        });
    });
    describe('list test case:', function () {
        it('list menuOrganizationss by all', function () {
            //this.timeout(0);
            let merchantLists = [
                'RQZNqVpEbFxyZ7ayW7x2yA',
                'PQZNqVpEbFxyZ7ayW7x2yA'];
            let qs = {
               // name:'*abinet*',
                //uuid:['3UCHOeNl5tVmN83fkyQfNQ','V1bg0v8SlXKs8OXApykNzg'],
 /*               offset:0,
                limit:1,
                createdAt:'[,2018-04-18 18:13:28]'*/
            };

            return request.get(`${tenantURL}/menuOrganizations/listAll`,qs).then( ( { statusCode,body,headers,request} )=>{

                console.log('menuOrganizationss test list   :' + JSON.stringify(body,null,2));

                expect(statusCode).to.equal(200);
                expect(headers['content-type']).to.equal('application/json; charset=utf-8');
                //expect(uriReg.applicationURIReg.test(res.headers['location'])).to.be.true;
            });
        });


        it('list menuOrganizationss  ', function () {
            //this.timeout(0);
            let merchantLists = [
                'RQZNqVpEbFxyZ7ayW7x2yA',
                'PQZNqVpEbFxyZ7ayW7x2yA'];
            let qs = {
                name:'*good*',
                //uuid:['3UCHOeNl5tVmN83fkyQfNQ','V1bg0v8SlXKs8OXApykNzg'],
                /*               offset:0,
                               limit:1,
                               createdAt:'[,2018-04-18 18:13:28]'*/
            };
            return request.get(`${tenantURL}/menuOrganizations`,qs).then( ( { statusCode,body,headers,request} )=>{

                console.log('menuOrganizationss test list   :' + JSON.stringify(body,null,2));

                expect(statusCode).to.equal(200);
                expect(headers['content-type']).to.equal('application/json; charset=utf-8');
                //expect(uriReg.applicationURIReg.test(res.headers['location'])).to.be.true;
            });
        });
    });

    describe('delete test case:',()=>{
        it('success delete an menuOrganizations', function () {
            //this.timeout(0);

          /*  return request.delete(`${tenantURL}/menuOrganizations/${menuOrganizationsUUID}`).then( ( { statusCode,body,headers,request} )=>{
                expect(statusCode).to.equal(204);
            });*/
        });
    });
});