/**
 * Created by Administrator on 2016/9/25.
 */
const expect = require('chai').expect;
const _ = require('lodash');
const common = require('./common');
const url = common.url;
const utils = require('../common/utils');
const request = require('common-request').request;


describe('goodsPackage Test Case:',()=>{
    let goodsPackageTestCase = {
        packageId: '6547821511',
        name: 'wwww de baoguo',
        quatity: 3,
        weight: 3.5,
        deliveryHref: 'http://192.168.7.150:5027/api/v1.0.0/tenants/LQ7lVK4LzvZeDAa1ydy3ag/customerDirectorys/6f0gDCh3gy8QAKPXBpEdtA/customers/Hyh9P6DdMLL5BaSubP3oAw',
        deliverySource: 'cabinet',
        directoryUUID:'6VDu6PAOWAwEMYRXhoZyjg',
    };
    let applicationUUID = 'AppUUIDForTestCase';
    let goodsPackageUUID = null;

    let tenantUUID = null;
    let tenantURL = null;

    tenantURL = url /*+ '/directories' + '/zbDG5Ul3MHzHOEBFYyIalQ' */;

    //goodsPackageUUID = 'SAVkeDwGSBpGRTwOWRLDLQ';

    describe('create test case:',  ()=>{
        it('success create an goodsPackage',  ()=> {
            //this.timeout(0);

            return request.post(`${tenantURL}/goodsPackages`,goodsPackageTestCase).then( ( {statusCode, body, headers, request} )=>{
                expect(statusCode).to.equal(201);
                expect(headers['content-type']).to.equal('application/json; charset=utf-8');
                expect(body.name).to.equal(goodsPackageTestCase.name);

                goodsPackageUUID = utils.getResourceUUIDInURL(body.href,'goodsPackages');

                console.log('goodsPackages test  create  goodsPackageUUID  :' + goodsPackageUUID + ' body:'+JSON.stringify(body));
            });
        });
    });
    describe('retrieve test case:', function () {
        it('success retrieve an goodsPackage  ', function () {
            //this.timeout(0);

            return request.get(`${tenantURL}/goodsPackages/${goodsPackageUUID}`,{}).then( ( { statusCode,body,headers,request} )=>{

                console.log('goodsPackages test retrieve   :' + JSON.stringify(body));

                expect(statusCode).to.equal(200);
                expect(headers['content-type']).to.equal('application/json; charset=utf-8');
                //expect(uriReg.applicationURIReg.test(res.headers['location'])).to.be.true;
               // expect(body.name).to.equal(goodsPackageTestCase.name);
            });
        });
    });
    describe('update test case:', function () {
        it('success update an goodsPackage', function () {
            //this.timeout(0);
           // goodsPackageUUID = '7O1PwyXNuUOEXxvRfvbyrQ';
            let updateInfo = {};
            goodsPackageUUID = 'ZPkd6sThTsgNq8M3WzPQnQ';
            updateInfo.status = 'created';
            return request.post(`${tenantURL}/goodsPackages/${goodsPackageUUID}`,updateInfo).then( ( { statusCode,body,headers,request} )=>{

                console.log('goodsPackages test update   :' + JSON.stringify(body));

                expect(statusCode).to.equal(200);
                expect(headers['content-type']).to.equal('application/json; charset=utf-8');
                expect(body.description).to.equal(updateInfo.description);
                //expect(uriReg.applicationURIReg.test(res.headers['location'])).to.be.true;
            });
        });
    });
    describe('list test case:', function () {


        it('list goodsPackages  ', function () {
            //this.timeout(0);
            let qs = {
               // name:'*good*',
                //uuid:['3UCHOeNl5tVmN83fkyQfNQ','V1bg0v8SlXKs8OXApykNzg'],
                /*               offset:0,
                               limit:1,
                               createdAt:'[,2018-04-18 18:13:28]'*/
            };
            return request.get(`${tenantURL}/goodsPackages`,qs).then( ( { statusCode,body,headers,request} )=>{

                console.log('goodsPackages test list   :' + JSON.stringify(body));

                expect(statusCode).to.equal(200);
                expect(headers['content-type']).to.equal('application/json; charset=utf-8');
                //expect(uriReg.applicationURIReg.test(res.headers['location'])).to.be.true;
            });
        });


        it('list goodsPackageTotalStatistics  ', function () {
            //this.timeout(0);
            let qs = {
                // name:'*good*',
                //uuid:['3UCHOeNl5tVmN83fkyQfNQ','V1bg0v8SlXKs8OXApykNzg'],
                /*               offset:0,
                               limit:1,*/
                               createdAt:'[2017-01-22 18:13:28,2018-05-18 18:13:28]',
                               unit:'year',
            };
            return request.get(`${tenantURL}/goodsPackageTotalStatistics`,qs).then( ( { statusCode,body,headers,request} )=>{

                console.log('goodsPackageTotalStatistics test list   :' + JSON.stringify(body,null,2));

                expect(statusCode).to.equal(200);
                expect(headers['content-type']).to.equal('application/json; charset=utf-8');
                //expect(uriReg.applicationURIReg.test(res.headers['location'])).to.be.true;
            });
        });

    });

    describe('delete test case:',()=>{
        it('success delete an goodsPackage', function () {
            //this.timeout(0);

           /* return request.delete(`${tenantURL}/goodsPackages/${goodsPackageUUID}`).then( ( { statusCode,body,headers,request} )=>{
                expect(statusCode).to.equal(204);
            });*/
        });
    });
});