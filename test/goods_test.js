/**
 * Created by Administrator on 2016/9/25.
 */
const expect = require('chai').expect;
const _ = require('lodash');
const common = require('./common');
const url = common.url;
const utils = require('../common/utils');
const request = require('common-request').request;


describe('goods Test Case:',()=>{
    let goodsTestCase = [
        {
        goodsTypeHref: 'http://localhost:5702/api/v1.0.0/goodsTypes/pnv6eG8STBSMzvfbl2WHKw',
        name: '女孩包包yy',
        weight: 2.5,
        cost: 40.5,
        carbin: 30.4,
        water: 20.5,
        goodsPackageUUID:'n97eIgDCIO6wecGkvc19UQ',
         sortedRecordHref:'http://localhost:5702/api/v1.0.0/sortedRecords/CGa3pnuOxMjD9JiBKSgYLw',
    },
        {
            goodsTypeHref: 'http://localhost:5702/api/v1.0.0/goodsTypes/yhBtXPHFyWUwBToPnt1U6Q',
            name: '女孩鞋子yy',
            weight: 2.5,
            cost: 40.5,
            carbin: 30.4,
            water: 20.5,
            goodsPackageUUID:'n97eIgDCIO6wecGkvc19UQ',
            sortedRecordHref:'http://localhost:5702/api/v1.0.0/sortedRecords/CGa3pnuOxMjD9JiBKSgYLw',
        },
    ];
    let applicationUUID = 'AppUUIDForTestCase';
    let goodsUUID = null;

    let tenantUUID = null;
    let tenantURL = null;

    tenantURL = url + '/directories' + '/zbDG5Ul3MHzHOEBFYyIalQ' + '/goodsPackages' + '/n97eIgDCIO6wecGkvc19UQ' ;

    //goodsUUID = 'SAVkeDwGSBpGRTwOWRLDLQ';

    describe('create test case:',  ()=>{
        it('success create an goods',  ()=> {
            //this.timeout(0);

            return request.post(`${url}/goods/batchCreate`,goodsTestCase).then( ( {statusCode, body, headers, request} )=>{
                expect(statusCode).to.equal(201);
                expect(headers['content-type']).to.equal('application/json; charset=utf-8');
                expect(body.name).to.equal(goodsTestCase.name);

                goodsUUID = utils.getResourceUUIDInURL(body.href,'goods');

                console.log('goods test  create  goodsUUID  :' + goodsUUID + ' body:'+JSON.stringify(body,null,2));
            });
        });
    });
    describe('retrieve test case:', function () {
        it('success retrieve an goods  ', function () {
            //this.timeout(0);

            return request.get(`${tenantURL}/goods/${goodsUUID}`,{}).then( ( { statusCode,body,headers,request} )=>{

                console.log('goods test retrieve   :' + JSON.stringify(body));

                expect(statusCode).to.equal(200);
                expect(headers['content-type']).to.equal('application/json; charset=utf-8');
                //expect(uriReg.applicationURIReg.test(res.headers['location'])).to.be.true;
               // expect(body.name).to.equal(goodsTestCase.name);
            });
        });
    });
    describe('update test case:', function () {
        it('success update an goods', function () {
            //this.timeout(0);
           // goodsUUID = '7O1PwyXNuUOEXxvRfvbyrQ';
            let updateInfo = {};
            updateInfo.water = 25.9;
            return request.post(`${tenantURL}/goods/${goodsUUID}`,updateInfo).then( ( { statusCode,body,headers,request} )=>{

                console.log('goods test update   :' + JSON.stringify(body));

                expect(statusCode).to.equal(200);
                expect(headers['content-type']).to.equal('application/json; charset=utf-8');
                expect(body.description).to.equal(updateInfo.description);
                //expect(uriReg.applicationURIReg.test(res.headers['location'])).to.be.true;
            });
        });
    });
    describe('list test case:', function () {


        it('list goods  ', function () {
            //this.timeout(0);
            let qs = {
               // name:'*good*',
                //uuid:['3UCHOeNl5tVmN83fkyQfNQ','V1bg0v8SlXKs8OXApykNzg'],
                /*               offset:0,
                               limit:1,
                               createdAt:'[,2018-04-18 18:13:28]'*/
                goodsPackageUUID:'xAdNYJaUdyyXyFmd1rFkUg',
            };
            return request.get(`${url}/goods`,qs).then( ( { statusCode,body,headers,request} )=>{

                console.log('goods test list   :' + JSON.stringify(body,null,2));

                expect(statusCode).to.equal(200);
                expect(headers['content-type']).to.equal('application/json; charset=utf-8');
                //expect(uriReg.applicationURIReg.test(res.headers['location'])).to.be.true;
            });
        });



        it('list goodsTotalStatistics  ', function () {
            //this.timeout(0);
            let qs = {
                // name:'*good*',
                //uuid:['3UCHOeNl5tVmN83fkyQfNQ','V1bg0v8SlXKs8OXApykNzg'],
                /*               offset:0,
                               limit:1,*/
                createdAt:'[2017-01-22 18:13:28,2018-05-18 18:13:28]',
                unit:'year',
            };
            return request.get(`${url}/goodsTotalStatistics`,qs).then( ( { statusCode,body,headers,request} )=>{

                console.log('goodsPackageTotalStatistics test list   :' + JSON.stringify(body,null,2));

                expect(statusCode).to.equal(200);
                expect(headers['content-type']).to.equal('application/json; charset=utf-8');
                //expect(uriReg.applicationURIReg.test(res.headers['location'])).to.be.true;
            });
        });


        it('list goodsWeightStatistics  ', function () {
            //this.timeout(0);
            let qs = {
                // name:'*good*',
                //uuid:['3UCHOeNl5tVmN83fkyQfNQ','V1bg0v8SlXKs8OXApykNzg'],
                /*               offset:0,
                               limit:1,*/
                createdAt:'[2017-01-22 18:13:28,2018-05-18 18:13:28]',
                weightArrays:[500,3000,6000,10000,30000],
            };
            return request.get(`${url}/goodsWeightStatistics`,qs).then( ( { statusCode,body,headers,request} )=>{

                console.log('goodsWeightStatistics test list   :' + JSON.stringify(body,null,2));

                expect(statusCode).to.equal(200);
                expect(headers['content-type']).to.equal('application/json; charset=utf-8');
                //expect(uriReg.applicationURIReg.test(res.headers['location'])).to.be.true;
            });
        });


        it('list goodsCostStatistics  ', function () {
            //this.timeout(0);
            let qs = {
                // name:'*good*',
                //uuid:['3UCHOeNl5tVmN83fkyQfNQ','V1bg0v8SlXKs8OXApykNzg'],
                /*               offset:0,
                               limit:1,*/
                createdAt:'[2017-01-22 18:13:28,2018-05-18 18:13:28]',
                costArrays:[1000,5000,10000,20000,50000],
            };
            return request.get(`${url}/goodsCostStatistics`,qs).then( ( { statusCode,body,headers,request} )=>{

                console.log('goodsCostStatistics test list   :' + JSON.stringify(body,null,2));

                expect(statusCode).to.equal(200);
                expect(headers['content-type']).to.equal('application/json; charset=utf-8');
                //expect(uriReg.applicationURIReg.test(res.headers['location'])).to.be.true;
            });
        });



    });

    describe('delete test case:',()=>{
        it('success delete an goods', function () {
            //this.timeout(0);

           /* return request.delete(`${tenantURL}/goods/${goodsUUID}`).then( ( { statusCode,body,headers,request} )=>{
                expect(statusCode).to.equal(204);
            });*/
        });
    });
});