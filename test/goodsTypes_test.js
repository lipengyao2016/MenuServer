/**
 * Created by Administrator on 2016/9/25.
 */
const expect = require('chai').expect;
const _ = require('lodash');
const common = require('./common');
const url = common.url;
const utils = require('../common/utils');
const request = require('common-request').request;


describe('goodsType Test Case:',()=>{
    let goodsTypeTestCase = {
        name:'其它',
        description:'回收衣服',
        typeCode:'05',
        level: 4,

        carbinRadio: 2.1,
        waterRadio: 3.0,
        costRadio: 1.3,
    };
    let applicationUUID = 'AppUUIDForTestCase';
    let goodsTypeUUID = null;

    let tenantUUID = null;
    let tenantURL = null;

    tenantURL = url ;

    //goodsTypeUUID = 'SAVkeDwGSBpGRTwOWRLDLQ';

    describe('create test case:',  ()=>{
        it('success create an goodsType',  ()=> {
            //this.timeout(0);



            return request.post(`${tenantURL}/goodsTypes`,goodsTypeTestCase).then( ( {statusCode, body, headers, request} )=>{
                expect(statusCode).to.equal(201);
                expect(headers['content-type']).to.equal('application/json; charset=utf-8');
                expect(body.name).to.equal(goodsTypeTestCase.name);

                goodsTypeUUID = utils.getResourceUUIDInURL(body.href,'goodsTypes');

                console.log('goodsTypes test  create  goodsTypeUUID  :' + goodsTypeUUID + ' body:'+JSON.stringify(body));
            });
        });
    });
    describe('retrieve test case:', function () {
        it('success retrieve an goodsType  ', function () {
            //this.timeout(0);

            return request.get(`${tenantURL}/goodsTypes/${goodsTypeUUID}`,{}).then( ( { statusCode,body,headers,request} )=>{

                console.log('goodsTypes test retrieve   :' + JSON.stringify(body));

                expect(statusCode).to.equal(200);
                expect(headers['content-type']).to.equal('application/json; charset=utf-8');
                //expect(uriReg.applicationURIReg.test(res.headers['location'])).to.be.true;
               // expect(body.name).to.equal(goodsTypeTestCase.name);
            });
        });
    });
    describe('update test case:', function () {
        it('success update an goodsType', function () {
            //this.timeout(0);
           // goodsTypeUUID = '7O1PwyXNuUOEXxvRfvbyrQ';
            let updateInfo = {};
            updateInfo.description = 'lpy descript';
            return request.post(`${tenantURL}/goodsTypes/${goodsTypeUUID}`,updateInfo).then( ( { statusCode,body,headers,request} )=>{

                console.log('goodsTypes test update   :' + JSON.stringify(body));

                expect(statusCode).to.equal(200);
                expect(headers['content-type']).to.equal('application/json; charset=utf-8');
                expect(body.description).to.equal(updateInfo.description);
                //expect(uriReg.applicationURIReg.test(res.headers['location'])).to.be.true;
            });
        });
    });
    describe('list test case:', function () {


        it('list goodsTypes  ', function () {
            //this.timeout(0);
            let qs = {
               // name:'*good*',
                //uuid:['3UCHOeNl5tVmN83fkyQfNQ','V1bg0v8SlXKs8OXApykNzg'],
                /*               offset:0,
                               limit:1,
                               createdAt:'[,2018-04-18 18:13:28]'*/
            };
            return request.get(`${tenantURL}/goodsTypes`,qs).then( ( { statusCode,body,headers,request} )=>{

                console.log('goodsTypes test list   :' + JSON.stringify(body,null,2));

                expect(statusCode).to.equal(200);
                expect(headers['content-type']).to.equal('application/json; charset=utf-8');
                //expect(uriReg.applicationURIReg.test(res.headers['location'])).to.be.true;
            });
        });
    });

    describe('delete test case:',()=>{
        it('success delete an goodsType', function () {
            //this.timeout(0);

           /* return request.delete(`${tenantURL}/goodsTypes/${goodsTypeUUID}`).then( ( { statusCode,body,headers,request} )=>{
                expect(statusCode).to.equal(204);
            });*/
        });
    });
});