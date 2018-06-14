/**
 * Created by Administrator on 2016/9/25.
 */
const expect = require('chai').expect;
const _ = require('lodash');
const common = require('./common');
const url = common.url;
const utils = require('../common/utils');
const request = require('common-request').request;


describe('operator Test Case:',()=>{
    let operatorTestCase = {
       // name:'添加商户',
      //  operatorId:'45ertedfg34',
       // uiOrder:2,
        menuHref: 'http://localhost:6001/api/v1.0.0/menus/PWLhNmRHYuAaGeKrWuasrQ',
        metaOperatorUUID:'LrmWXTvdcnSQhCopNVM4NQ',
    };


    let batchOperatorTestCase = [
        {
        menuUUID: 'Gw9ByeNPFhvtxehpON9DSg',
        metaOperatorUUID:'sYL7DjzBos6JFbQwnXb1xA',
    },
        {
          menuUUID: '2aBWApoB2BsrEOheFEuXHg',
          metaOperatorUUID:'yrA5iZrWKdv7MCLARhFrcg',
        },
    ];

    let applicationUUID = 'AppUUIDForTestCase';
    let operatorUUID = null;

    let tenantUUID = null;
    let tenantURL = null;

    tenantURL = url ;

    operatorUUID = 'H50Eki2dcEAcVrpXuifRaA';

    describe('create test case:',  ()=>{
        it('success create an operator',  ()=> {
            //this.timeout(0);

            return request.post(`${tenantURL}/operators`,operatorTestCase).then( ( {statusCode, body, headers, request} )=>{
                expect(statusCode).to.equal(201);
                expect(headers['content-type']).to.equal('application/json; charset=utf-8');

                operatorUUID = utils.getResourceUUIDInURL(body.href,'operators');

                console.log('operators test  create   body:'+JSON.stringify(body,null,2));
            });
        });


        it('success batchCreate an operator',  ()=> {
            //this.timeout(0);

            return request.post(`${tenantURL}/operators/batchCreate`,batchOperatorTestCase).then( ( {statusCode, body, headers, request} )=>{
                expect(statusCode).to.equal(201);
                expect(headers['content-type']).to.equal('application/json; charset=utf-8');


                console.log('operators test  batchCreate   body:'+JSON.stringify(body,null,2));
            });
        });

    });
    describe('retrieve test case:', function () {
        it('success retrieve an operator  ', function () {
            //this.timeout(0);

            return request.get(`${tenantURL}/operators/${operatorUUID}`,{}).then( ( { statusCode,body,headers,request} )=>{

                console.log('operators test retrieve   :' + JSON.stringify(body,null,2));

                expect(statusCode).to.equal(200);
                expect(headers['content-type']).to.equal('application/json; charset=utf-8');
                //expect(uriReg.applicationURIReg.test(res.headers['location'])).to.be.true;
               // expect(body.name).to.equal(operatorTestCase.name);
            });
        });
    });
    describe('update test case:', function () {
        it('success update an operator', function () {
            //this.timeout(0);
           // operatorUUID = '7O1PwyXNuUOEXxvRfvbyrQ';
            let updateInfo = {};
            updateInfo.operatorId = '789wefsdf';
            return request.post(`${tenantURL}/operators/${operatorUUID}`,updateInfo).then( ( { statusCode,body,headers,request} )=>{

                console.log('operators test update   :' + JSON.stringify(body,null,2));

                expect(statusCode).to.equal(200);
                expect(headers['content-type']).to.equal('application/json; charset=utf-8');
                expect(body.description).to.equal(updateInfo.description);
                //expect(uriReg.applicationURIReg.test(res.headers['location'])).to.be.true;
            });
        });

        it('success batchDeleteByMenus an operator', function () {
            //this.timeout(0);
            // operatorUUID = '7O1PwyXNuUOEXxvRfvbyrQ';
            let updateInfo = {
                menuUUIDs:['Gw9ByeNPFhvtxehpON9DSg','2aBWApoB2BsrEOheFEuXHg','FbdiOQsNdBqy9bTjYDjcbw'],
            };
            return request.post(`${tenantURL}/clearOperatorsByMenus`,updateInfo).then( ( { statusCode,body,headers,request} )=>{

                console.log('operators test update   :' + JSON.stringify(body,null,2));

                expect(statusCode).to.equal(200);
                expect(headers['content-type']).to.equal('application/json; charset=utf-8');
                expect(body.description).to.equal(updateInfo.description);
                //expect(uriReg.applicationURIReg.test(res.headers['location'])).to.be.true;
            });
        });

    });
    describe('list test case:', function () {


        it('list operators  ', function () {
            //this.timeout(0);
            let qs = {
               // name:'*good*',
                //uuid:['3UCHOeNl5tVmN83fkyQfNQ','V1bg0v8SlXKs8OXApykNzg'],
                /*               offset:0,
                               limit:1,
                               createdAt:'[,2018-04-18 18:13:28]'*/
            };
            return request.get(`${tenantURL}/operators`,qs).then( ( { statusCode,body,headers,request} )=>{

                console.log('operators test list   :' + JSON.stringify(body,null,2));

                expect(statusCode).to.equal(200);
                expect(headers['content-type']).to.equal('application/json; charset=utf-8');
                //expect(uriReg.applicationURIReg.test(res.headers['location'])).to.be.true;
            });
        });
    });

    describe('delete test case:',()=>{
        it('success delete an operator', function () {
            //this.timeout(0);

           /* return request.delete(`${tenantURL}/operators/${operatorUUID}`).then( ( { statusCode,body,headers,request} )=>{
                expect(statusCode).to.equal(204);
            });*/
        });
    });
});