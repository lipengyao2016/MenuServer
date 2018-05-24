/**
 * Created by Administrator on 2016/9/25.
 */
const expect = require('chai').expect;
const _ = require('lodash');
const common = require('./common');
const url = common.url;
const utils = require('../common/utils');
const request = require('common-request').request;


describe('menus Test Case:',()=>{
    let menusTestCase =
        {
        name: '商户设置kk',
        description: 'sadfsaga',
        type: 0,
        number: '01',
         menuId: '4578sdfs875b1',
         uiOrder:2,
         menuGroupHref:'http://localhost:6001/api/v1.0.0/menuGroups/2FyMZ8JQaJsLADNMHMpOgw',
         //menuOrganizationHref: 'http://localhost:6001/api/v1.0.0/menuOrganizations/0vjiGKZ9dvxpoufELryZQw',

         applicationHref:'http://localhost:5000/api/v1.0.0/applications/CQZNqVpEbFxyZ7ayW7x2yA',

         operators:[
             {
                 name: '商户编辑0',
                 operatorId:'wefasdgsagsb2',
             },
             {
                 name: '商户编辑1',
                 operatorId:'wefasdgsagsb3',
             },
         ],
    };


    let applicationUUID = 'AppUUIDForTestCase';
    let menusUUID = null;

    let tenantUUID = null;
    let tenantURL = null;

    tenantURL = url /*+ '/directories' + '/zbDG5Ul3MHzHOEBFYyIalQ' + '/menusPackages' + '/n97eIgDCIO6wecGkvc19UQ'*/ ;

    //menusUUID = 'SAVkeDwGSBpGRTwOWRLDLQ';

    describe('create test case:',  ()=>{
        it('success create an menus',  ()=> {
            //this.timeout(0);

            return request.post(`${url}/menus`,menusTestCase).then( ( {statusCode, body, headers, request} )=>{
                expect(statusCode).to.equal(201);
                expect(headers['content-type']).to.equal('application/json; charset=utf-8');
                expect(body.name).to.equal(menusTestCase.name);

                menusUUID = utils.getResourceUUIDInURL(body.href,'menus');

                console.log('menus test  create  menusUUID  :' + menusUUID + ' body:'+JSON.stringify(body,null,2));
            });
        });
    });
    describe('retrieve test case:', function () {
        it('success retrieve an menus  ', function () {
            //this.timeout(0);

            return request.get(`${tenantURL}/menus/${menusUUID}`,{}).then( ( { statusCode,body,headers,request} )=>{

                console.log('menus test retrieve   :' + JSON.stringify(body));

                expect(statusCode).to.equal(200);
                expect(headers['content-type']).to.equal('application/json; charset=utf-8');
                //expect(uriReg.applicationURIReg.test(res.headers['location'])).to.be.true;
               // expect(body.name).to.equal(menusTestCase.name);
            });
        });
    });
    describe('update test case:', function () {
        it('success update an menus', function () {
            //this.timeout(0);
           // menusUUID = '7O1PwyXNuUOEXxvRfvbyrQ';
            let updateInfo = {};
            updateInfo.number = '05';
            return request.post(`${tenantURL}/menus/${menusUUID}`,updateInfo).then( ( { statusCode,body,headers,request} )=>{

                console.log('menus test update   :' + JSON.stringify(body));

                expect(statusCode).to.equal(200);
                expect(headers['content-type']).to.equal('application/json; charset=utf-8');
                expect(body.description).to.equal(updateInfo.description);
                //expect(uriReg.applicationURIReg.test(res.headers['location'])).to.be.true;
            });
        });
    });
    describe('list test case:', function () {


        it('list menus  ', function () {
            //this.timeout(0);
            let qs = {
               // name:'*menu*',
                //uuid:['3UCHOeNl5tVmN83fkyQfNQ','V1bg0v8SlXKs8OXApykNzg'],
                /*               offset:0,
                               limit:1,
                               createdAt:'[,2018-04-18 18:13:28]'*/
                //menusPackageUUID:'xAdNYJaUdyyXyFmd1rFkUg',
               // orderBy:'uiOrder DESC',
                applicationHref:'http://localhost:5000/api/v1.0.0/applications/CQZNqVpEbFxyZ7ayW7x2yA',
            };
            return request.get(`${url}/menus`,qs).then( ( { statusCode,body,headers,request} )=>{

                console.log('menus test list   :' + JSON.stringify(body,null,2));

                expect(statusCode).to.equal(200);
                expect(headers['content-type']).to.equal('application/json; charset=utf-8');
                //expect(uriReg.applicationURIReg.test(res.headers['location'])).to.be.true;
            });
        });


        it('list treeMenus  ', function () {
            //this.timeout(0);
            let qs = {
                applicationHref:'http://localhost:5000/api/v1.0.0/applications/CQZNqVpEbFxyZ7ayW7x2yA',
            };
            return request.get(`${url}/treeMenus`,qs).then( ( { statusCode,body,headers,request} )=>{

                console.log('menus test treeMenus   :' + JSON.stringify(body,null,2));

                expect(statusCode).to.equal(200);
                expect(headers['content-type']).to.equal('application/json; charset=utf-8');
            });
        });



    });

    describe('delete test case:',()=>{
        it('success delete an menus', function () {
            //this.timeout(0);

           /* return request.delete(`${tenantURL}/menus/${menusUUID}`).then( ( { statusCode,body,headers,request} )=>{
                expect(statusCode).to.equal(204);
            });*/
        });
    });
});