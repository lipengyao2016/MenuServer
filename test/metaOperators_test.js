/**
 * Created by Administrator on 2016/9/25.
 */
const expect = require('chai').expect;
const _ = require('lodash');
const common = require('./common');
const url = common.url;
const utils = require('../common/utils');
const request = require('common-request').request;


describe('metaOperator Test Case:',()=>{
    let metaOperatorTestCase =[
        {
        name:'创建业态',
        operatorId:'45ertedfg02',
        metaMenuHref: 'http://localhost:6001/api/v1.0.0/metaMenus/J8stpO0RGQnf4UTDKM1H9Q',
    },
       /* {
            name:'添加角色',
            operatorId:'45ertedfg03',
            metaMenuHref: 'http://localhost:6001/api/v1.0.0/metaMenus/Bd4g7vLe9xbwJCEJy0wdyg',
        },
        {
            name:'添加菜单',
            operatorId:'45ertedfg04',
            metaMenuHref: 'http://localhost:6001/api/v1.0.0/metaMenus/7WvJioK5ziQzVqTT5eDBBg',
        },
        {
            name:'添加门店',
            operatorId:'45ertedfg05',
            metaMenuHref: 'http://localhost:6001/api/v1.0.0/metaMenus/TOSkzGil5QL1c7JyA9UT9g',
        },*/
    ];
    let applicationUUID = 'AppUUIDForTestCase';
    let metaOperatorUUID = null;

    let tenantUUID = null;
    let tenantURL = null;

    tenantURL = url ;

    //metaOperatorUUID = 'SAVkeDwGSBpGRTwOWRLDLQ';

    describe('create test case:',  ()=>{
        it('success create an metaOperator',  ()=> {
            //this.timeout(0);

   /*         return request.post(`${tenantURL}/metaOperators`,metaOperatorTestCase).then( ( {statusCode, body, headers, request} )=>{
                expect(statusCode).to.equal(201);
                expect(headers['content-type']).to.equal('application/json; charset=utf-8');;

                metaOperatorUUID = utils.getResourceUUIDInURL(body.href,'metaOperators');

                console.log('metaOperators test  create  metaOperatorUUID  :' + metaOperatorUUID + ' body:'+JSON.stringify(body,null,2));
            });*/
        });


        it('success batchCreate an metaOperator',  ()=> {
            //this.timeout(0);

            return request.post(`${tenantURL}/metaOperators/batchCreate`,metaOperatorTestCase).then( ( {statusCode, body, headers, request} )=>{
                expect(statusCode).to.equal(201);
                expect(headers['content-type']).to.equal('application/json; charset=utf-8');;


                console.log('metaOperators test  create  body:'+JSON.stringify(body,null,2));
            });
        });

    });
    describe('retrieve test case:', function () {
        it('success retrieve an metaOperator  ', function () {
            //this.timeout(0);

            return request.get(`${tenantURL}/metaOperators/${metaOperatorUUID}`,{}).then( ( { statusCode,body,headers,request} )=>{

                console.log('metaOperators test retrieve   :' + JSON.stringify(body,null,2));

                expect(statusCode).to.equal(200);
                expect(headers['content-type']).to.equal('application/json; charset=utf-8');
                //expect(uriReg.applicationURIReg.test(res.headers['location'])).to.be.true;
               // expect(body.name).to.equal(metaOperatorTestCase.name);
            });
        });
    });
    describe('update test case:', function () {
        it('success update an metaOperator', function () {
            //this.timeout(0);
           // metaOperatorUUID = '7O1PwyXNuUOEXxvRfvbyrQ';
            let updateInfo = {};
            updateInfo.operatorId = '789wefsdf';
            return request.post(`${tenantURL}/metaOperators/${metaOperatorUUID}`,updateInfo).then( ( { statusCode,body,headers,request} )=>{

                console.log('metaOperators test update   :' + JSON.stringify(body,null,2));

                expect(statusCode).to.equal(200);
                expect(headers['content-type']).to.equal('application/json; charset=utf-8');
                expect(body.description).to.equal(updateInfo.description);
                //expect(uriReg.applicationURIReg.test(res.headers['location'])).to.be.true;
            });
        });
    });
    describe('list test case:', function () {


        it('list metaOperators  ', function () {
            //this.timeout(0);
            let qs = {
               // name:'*good*',
                //uuid:['3UCHOeNl5tVmN83fkyQfNQ','V1bg0v8SlXKs8OXApykNzg'],
                /*               offset:0,
                               limit:1,
                               createdAt:'[,2018-04-18 18:13:28]'*/

                //metaMenuUUID: 'GYa1rEV0N1OrCDKKvK0zrg',
                menuUUID: 'Gw9ByeNPFhvtxehpON9DSg',
            };
            return request.get(`${tenantURL}/metaOperators`,qs).then( ( { statusCode,body,headers,request} )=>{

                console.log('metaOperators test list   :' + JSON.stringify(body,null,2));

                expect(statusCode).to.equal(200);
                expect(headers['content-type']).to.equal('application/json; charset=utf-8');
                //expect(uriReg.applicationURIReg.test(res.headers['location'])).to.be.true;
            });
        });
    });

    describe('delete test case:',()=>{
        it('success delete an metaOperator', function () {
            //this.timeout(0);

           /* return request.delete(`${tenantURL}/metaOperators/${metaOperatorUUID}`).then( ( { statusCode,body,headers,request} )=>{
                expect(statusCode).to.equal(204);
            });*/
        });
    });
});