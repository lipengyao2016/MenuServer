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
        //name: '测试管理q',
         description: 'sadfsaga',
         //type: 0,
         //number: '01',
         //menuId: '4578sdfs875d4',
        // uiOrder:3,
         menuGroupHref:'http://localhost:6001/api/v1.0.0/menuGroups/8pyNRzO52CiVjCP3Nfbvvw',
         //menuOrganizationHref: 'http://localhost:6001/api/v1.0.0/menuOrganizations/0vjiGKZ9dvxpoufELryZQw',
          metaMenuUUID:'7WvJioK5ziQzVqTT5eDBBg',

          //ownerHref:'http://192.168.7.26:6000/api/v1.0.0/owners/EQZNqVpEbFxyZ7ayW7x2yA',

          bCreatedOperators:true,

 /*        operators:[
             {
                /!* name: '角色列表bb',
                 operatorId:'wefasdgsagsd8',*!/
                 metaOperatorUUID:'XhrWZ9wVsCOPySzDIWtZnw',
             },
         ],*/
    };


    let batchMenusTestCase =[
        {
            menuGroupHref:'http://localhost:6001/api/v1.0.0/menuGroups/JZv0qnDunAAcE1U5QGqW7Q',
            metaMenuUUID:'TOSkzGil5QL1c7JyA9UT9g',
            bCreatedOperators:true,
        },
        {
            menuGroupHref:'http://localhost:6001/api/v1.0.0/menuGroups/JZv0qnDunAAcE1U5QGqW7Q',
            metaMenuUUID:'rx6BA4IqXIMSCni5aW53fg',
            bCreatedOperators:true,
        },
        ];


    let ownerUUID = 'AppUUIDForTestCase';
    let menusUUID = null;

    let tenantUUID = null;
    let tenantURL = null;

    tenantURL = url /*+ '/directories' + '/zbDG5Ul3MHzHOEBFYyIalQ' + '/menusPackages' + '/n97eIgDCIO6wecGkvc19UQ'*/ ;

    menusUUID = 'PWLhNmRHYuAaGeKrWuasrQ';

    describe('create test case:',  ()=>{
        it('success create an menus',  ()=> {
            //this.timeout(0);

            return request.post(`${url}/menus`,menusTestCase).then( ( {statusCode, body, headers, request} )=>{
                expect(statusCode).to.equal(201);
                expect(headers['content-type']).to.equal('application/json; charset=utf-8');

                menusUUID = utils.getResourceUUIDInURL(body.href,'menus');

                console.log('menus test  create  menusUUID  :' + menusUUID + ' body:'+JSON.stringify(body,null,2));
            });
        });

        it('success batchCreate an menus',  ()=> {
            //this.timeout(0);

            return request.post(`${url}/menus/batchCreate`,batchMenusTestCase).then( ( {statusCode, body, headers, request} )=>{
                expect(statusCode).to.equal(201);
                expect(headers['content-type']).to.equal('application/json; charset=utf-8');

                console.log('menus test  create   body:'+JSON.stringify(body,null,2));
            });
        });


    });
    describe('retrieve test case:', function () {
        it('success retrieve an menus  ', function () {
            //this.timeout(0);

            return request.get(`${tenantURL}/menus/${menusUUID}`,{}).then( ( { statusCode,body,headers,request} )=>{

                console.log('menus test retrieve   :' + JSON.stringify(body,null,2));

                expect(statusCode).to.equal(200);
                expect(headers['content-type']).to.equal('application/json; charset=utf-8');
                //expect(uriReg.ownerURIReg.test(res.headers['location'])).to.be.true;
               // expect(body.name).to.equal(menusTestCase.name);
            });
        });
    });
    describe('update test case:', function () {
        it('success update an menus', function () {
            //this.timeout(0);
           // menusUUID = '7O1PwyXNuUOEXxvRfvbyrQ';
            let updateInfo = {};
            updateInfo.description = 'qqq';
            return request.post(`${tenantURL}/menus/${menusUUID}`,updateInfo).then( ( { statusCode,body,headers,request} )=>{

                console.log('menus test update   :' + JSON.stringify(body,null,2));

                expect(statusCode).to.equal(200);
                expect(headers['content-type']).to.equal('application/json; charset=utf-8');
                expect(body.description).to.equal(updateInfo.description);
                //expect(uriReg.ownerURIReg.test(res.headers['location'])).to.be.true;
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
                ownerHref:'http://localhost:5000/api/v1.0.0/applications/BQZNqVpEbFxyZ7ayW7x2yA',
                expand:'operators',
            };
            return request.get(`${url}/menus`,qs).then( ( { statusCode,body,headers,request} )=>{

                console.log('menus test list   :' + JSON.stringify(body,null,2));

                expect(statusCode).to.equal(200);
                expect(headers['content-type']).to.equal('application/json; charset=utf-8');
                //expect(uriReg.ownerURIReg.test(res.headers['location'])).to.be.true;
            });
        });


        it('list treeMenus  ', function () {
            //this.timeout(0);
            let qs = {
                //ownerHref:'http://192.168.7.26:6000/api/v1.0.0/owners/Sad9YHDXhm9cyMeoNvr2ig',
                ownerHref:'http://localhost:5000/api/v1.0.0/applications/BQZNqVpEbFxyZ7ayW7x2yA',
             //   menuOrganizationHref : 'http://localhost:6001/api/v1.0.0/menuOrganizations/rIdUW07jGttn5VNGcPvnuQ',
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