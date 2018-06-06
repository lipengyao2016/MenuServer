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
        name: '角色管理qq',
        description: 'sadfsaga',
        type: 0,
        number: '01',
         menuId: '4578sdfs875d4',
         uiOrder:3,
        // menuGroupHref:'http://localhost:6001/api/v1.0.0/menuGroups/6cVizWBnkIRlGHCttOmspg',
         //menuOrganizationHref: 'http://localhost:6001/api/v1.0.0/menuOrganizations/0vjiGKZ9dvxpoufELryZQw',

         applicationHref:'http://192.168.7.26:6000/api/v1.0.0/applications/Sad9YHDXhm9cyMeoNvr2ig',

       /*  operators:[
             {
                 name: '角色列表bb',
                 operatorId:'wefasdgsagsd8',
             },
             {
                 name: '新增角色cc',
                 operatorId:'wefasdgsagsd9',
             },
         ],*/
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


        it('success batchUpdate an menus',  ()=> {
            //this.timeout(0);

            let updateMenus = {
                uuid:['mzNYalrUcBWrGsbxEsQcAQ','8KMwPfurIZoEHfENAShS6g'],
                description:'ccc',
                menuGroupUUID:'Y9ItzadYabvitqDcPHZpUQ',
            };
            return request.post(`${url}/menus/batchUpdate`,updateMenus).then( ( {statusCode, body, headers, request} )=>{
                expect(statusCode).to.equal(200);

                console.log('menus test  batchUpdate  body:'+JSON.stringify(body,null,2));
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
                applicationHref:'http://192.168.7.26:6000/api/v1.0.0/applications/Sad9YHDXhm9cyMeoNvr2ig',
                expand:'operators',
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
                applicationHref:'http://192.168.7.26:6000/api/v1.0.0/applications/Sad9YHDXhm9cyMeoNvr2ig',
             //   menuOrganizationHref : 'http://localhost:6001/api/v1.0.0/menuOrganizations/rIdUW07jGttn5VNGcPvnuQ',
            };
            return request.get(`${url}/treeMenus`,qs).then( ( { statusCode,body,headers,request} )=>{

                console.log('menus test treeMenus   :' + JSON.stringify(body));

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