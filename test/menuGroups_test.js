/**
 * Created by Administrator on 2016/9/25.
 */
const expect = require('chai').expect;
const _ = require('lodash');
const common = require('./common');
const url = common.url;
const utils = require('../common/utils');
const request = require('common-request').request;


describe('menuGroup Test Case:',()=>{
    let menuGroupTestCase = {
        name: '商品管理',
        description: 'datagg',
        uiOrder: 1,
        upLevelMenuGroupHref:'http://localhost:6001/api/v1.0.0/menuGroups/eTUA8Knx9e0OMumDevYQ7g',
      //  menuOrganizationHref: 'http://localhost:6001/api/v1.0.0/menuOrganizations/rIdUW07jGttn5VNGcPvnuQ',
      //  applicationHref:'http://localhost:5000/api/v1.0.0/applications/CQZNqVpEbFxyZ7ayW7x2yA',
    };
    let applicationUUID = 'AppUUIDForTestCase';
    let menuGroupUUID = null;

    let tenantUUID = null;
    let tenantURL = null;

    tenantURL = url /*+ '/directories' + '/zbDG5Ul3MHzHOEBFYyIalQ' */;

    //menuGroupUUID = 'SAVkeDwGSBpGRTwOWRLDLQ';

    describe('create test case:',  ()=>{
        it('success create an menuGroup',  ()=> {
            //this.timeout(0);

            return request.post(`${tenantURL}/menuGroups`,menuGroupTestCase).then( ( {statusCode, body, headers, request} )=>{
                expect(statusCode).to.equal(201);
                expect(headers['content-type']).to.equal('application/json; charset=utf-8');
                expect(body.name).to.equal(menuGroupTestCase.name);

                menuGroupUUID = utils.getResourceUUIDInURL(body.href,'menuGroups');

                console.log('menuGroups test  create  menuGroupUUID  :' + menuGroupUUID + ' body:'+JSON.stringify(body,null,2));
            });
        });
    });
    describe('retrieve test case:', function () {
        it('success retrieve an menuGroup  ', function () {
            //this.timeout(0);

            return request.get(`${tenantURL}/menuGroups/${menuGroupUUID}`,{}).then( ( { statusCode,body,headers,request} )=>{

                console.log('menuGroups test retrieve   :' + JSON.stringify(body,null,2));

                expect(statusCode).to.equal(200);
                expect(headers['content-type']).to.equal('application/json; charset=utf-8');
                //expect(uriReg.applicationURIReg.test(res.headers['location'])).to.be.true;
               // expect(body.name).to.equal(menuGroupTestCase.name);
            });
        });
    });
    describe('update test case:', function () {
        it('success update an menuGroup', function () {
            //this.timeout(0);
           // menuGroupUUID = '7O1PwyXNuUOEXxvRfvbyrQ';
            let updateInfo = {};
            //menuGroupUUID = 'ZPkd6sThTsgNq8M3WzPQnQ';
            updateInfo.status = 'created';
            return request.post(`${tenantURL}/menuGroups/${menuGroupUUID}`,updateInfo).then( ( { statusCode,body,headers,request} )=>{

                console.log('menuGroups test update   :' + JSON.stringify(body,null,2));

                expect(statusCode).to.equal(200);
                expect(headers['content-type']).to.equal('application/json; charset=utf-8');
            });
        });
    });
    describe('list test case:', function () {


        it('list menuGroups  ', function () {
            //this.timeout(0);
            let qs = {
               // name:'*good*',
                //uuid:['3UCHOeNl5tVmN83fkyQfNQ','V1bg0v8SlXKs8OXApykNzg'],
                /*               offset:0,
                               limit:1,
                               createdAt:'[,2018-04-18 18:13:28]'*/
                applicationHref:'http://localhost:5000/api/v1.0.0/applications/CQZNqVpEbFxyZ7ayW7x2yA',
            };
            return request.get(`${tenantURL}/menuGroups`,qs).then( ( { statusCode,body,headers,request} )=>{

                console.log('menuGroups test list   :' + JSON.stringify(body,null,2));

                expect(statusCode).to.equal(200);
                expect(headers['content-type']).to.equal('application/json; charset=utf-8');
                //expect(uriReg.applicationURIReg.test(res.headers['location'])).to.be.true;
            });
        });


        it('list downLevelMenuGroups by menuOrganization ', function () {
            //this.timeout(0);
            let qs = {
                // name:'*good*',
                //uuid:['3UCHOeNl5tVmN83fkyQfNQ','V1bg0v8SlXKs8OXApykNzg'],
                /*               offset:0,
                               limit:1,
                               createdAt:'[,2018-04-18 18:13:28]'*/
               // applicationHref:'http://localhost:5000/api/v1.0.0/applications/CQZNqVpEbFxyZ7ayW7x2yA',
            };

            menuOrganizationUUID = '0vjiGKZ9dvxpoufELryZQw';

            return request.get(`${tenantURL}/menuOrganizations/${menuOrganizationUUID}/downLevelMenuGroups`,qs).then( ( { statusCode,body,headers,request} )=>{

                console.log('menuGroups test downLevelMenuGroups by menuOrganization  :' + JSON.stringify(body,null,2));

                expect(statusCode).to.equal(200);
                expect(headers['content-type']).to.equal('application/json; charset=utf-8');
                //expect(uriReg.applicationURIReg.test(res.headers['location'])).to.be.true;
            });
        });


        it('list downLevelMenuGroups by upMenuGroup ', function () {
            //this.timeout(0);
            let qs = {
                // name:'*good*',
                //uuid:['3UCHOeNl5tVmN83fkyQfNQ','V1bg0v8SlXKs8OXApykNzg'],
                /*               offset:0,
                               limit:1,
                               createdAt:'[,2018-04-18 18:13:28]'*/
                // applicationHref:'http://localhost:5000/api/v1.0.0/applications/CQZNqVpEbFxyZ7ayW7x2yA',
            };

            menuGroupUUID = '7EWAlSlisCxNotZ6fM67YQ';

            return request.get(`${tenantURL}/menuGroups/${menuGroupUUID}/downLevelMenuGroups`,qs).then( ( { statusCode,body,headers,request} )=>{

                console.log('menuGroups test downLevelMenuGroups   :' + JSON.stringify(body,null,2));

                expect(statusCode).to.equal(200);
                expect(headers['content-type']).to.equal('application/json; charset=utf-8');
                //expect(uriReg.applicationURIReg.test(res.headers['location'])).to.be.true;
            });
        });


        it('list treeMenuGroups ', function () {
            //this.timeout(0);
            let qs = {
                // name:'*good*',
                //uuid:['3UCHOeNl5tVmN83fkyQfNQ','V1bg0v8SlXKs8OXApykNzg'],
                /*               offset:0,
                               limit:1,
                               createdAt:'[,2018-04-18 18:13:28]'*/
                // applicationHref:'http://localhost:5000/api/v1.0.0/applications/CQZNqVpEbFxyZ7ayW7x2yA',\
                menuOrganizationHref : 'http://localhost:6001/api/v1.0.0/menuOrganizations/0vjiGKZ9dvxpoufELryZQw',
            };



            return request.get(`${tenantURL}/treeMenuGroups`,qs).then( ( { statusCode,body,headers,request} )=>{

                console.log('menuGroups test downLevelMenuGroups by menuOrganization  :' + JSON.stringify(body,null,2));

                expect(statusCode).to.equal(200);
                expect(headers['content-type']).to.equal('application/json; charset=utf-8');
                //expect(uriReg.applicationURIReg.test(res.headers['location'])).to.be.true;
            });
        });


    });

    describe('delete test case:',()=>{
        it('success delete an menuGroup', function () {
            //this.timeout(0);

           /* return request.delete(`${tenantURL}/menuGroups/${menuGroupUUID}`).then( ( { statusCode,body,headers,request} )=>{
                expect(statusCode).to.equal(204);
            });*/
        });
    });
});