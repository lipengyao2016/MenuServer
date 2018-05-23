/**
 * Created by Administrator on 2016/9/25.
 */
const expect = require('chai').expect;
const _ = require('lodash');
const common = require('./common');
const url = common.url;
const utils = require('../common/utils');
const request = require('common-request').request;


describe('sortedRecords Test Case:',()=>{
    let sortedRecordsTestCase = {
        sortedAddress: 'baoanyy',
        sortedOperator: 'liming333',
        sortedAt: '2018-9-13 10:00:00',
        sortedPlace: '45784512623545',
        goodsPackageUUID:'LTqEX5zIjezT2VXdZ0N98w',
        uuid:'06Ghw1jTPmELzgZQeJAFNw',
    };
    let applicationUUID = 'AppUUIDForTestCase';
    let sortedRecordsUUID = null;

    let tenantUUID = null;
    let tenantURL = null;

    tenantURL = url + '/directories' + '/zbDG5Ul3MHzHOEBFYyIalQ' + '/goodsPackages' + '/LTqEX5zIjezT2VXdZ0N98w' ;

    //sortedRecordsUUID = 'SAVkeDwGSBpGRTwOWRLDLQ';

    describe('create test case:',  ()=>{
        it('success create an sortedRecords',  ()=> {
            //this.timeout(0);

            return request.post(`${url}/sortedRecords`,sortedRecordsTestCase).then( ( {statusCode, body, headers, request} )=>{
                expect(statusCode).to.equal(201);
                expect(headers['content-type']).to.equal('application/json; charset=utf-8');
                expect(body.name).to.equal(sortedRecordsTestCase.name);

                sortedRecordsUUID = utils.getResourceUUIDInURL(body.href,'sortedRecords');

                console.log('sortedRecords test  create  sortedRecordsUUID  :' + sortedRecordsUUID + ' body:'+JSON.stringify(body,null,2));
            });
        });
    });
    describe('retrieve test case:', function () {
        it('success retrieve an sortedRecords  ', function () {
            //this.timeout(0);

            return request.get(`${tenantURL}/sortedRecords/${sortedRecordsUUID}`,{}).then( ( { statusCode,body,headers,request} )=>{

                console.log('sortedRecords test retrieve   :' + JSON.stringify(body,null,2));

                expect(statusCode).to.equal(200);
                expect(headers['content-type']).to.equal('application/json; charset=utf-8');
                //expect(uriReg.applicationURIReg.test(res.headers['location'])).to.be.true;
               // expect(body.name).to.equal(sortedRecordsTestCase.name);
            });
        });
    });
    describe('update test case:', function () {
        it('success update an sortedRecords', function () {
            //this.timeout(0);
           // sortedRecordsUUID = '7O1PwyXNuUOEXxvRfvbyrQ';
            let updateInfo = {};
            updateInfo.sortedPlace = '4578451262323';
            return request.post(`${tenantURL}/sortedRecords/${sortedRecordsUUID}`,updateInfo).then( ( { statusCode,body,headers,request} )=>{

                console.log('sortedRecords test update   :' + JSON.stringify(body,null,2));

                expect(statusCode).to.equal(200);
                expect(headers['content-type']).to.equal('application/json; charset=utf-8');
                expect(body.description).to.equal(updateInfo.description);
                //expect(uriReg.applicationURIReg.test(res.headers['location'])).to.be.true;
            });
        });
    });
    describe('list test case:', function () {


        it('list sortedRecords  ', function () {
            //this.timeout(0);
            let qs = {
               // name:'*sortedRecord*',
                //uuid:['3UCHOeNl5tVmN83fkyQfNQ','V1bg0v8SlXKs8OXApykNzg'],
                /*               offset:0,
                               limit:1,
                               createdAt:'[,2018-04-18 18:13:28]'*/
            };
            return request.get(`${tenantURL}/sortedRecords`,qs).then( ( { statusCode,body,headers,request} )=>{

                console.log('sortedRecords test list   :' + JSON.stringify(body,null,2));

                expect(statusCode).to.equal(200);
                expect(headers['content-type']).to.equal('application/json; charset=utf-8');
                //expect(uriReg.applicationURIReg.test(res.headers['location'])).to.be.true;
            });
        });
    });

    describe('delete test case:',()=>{
        it('success delete an sortedRecords', function () {
            //this.timeout(0);

           /* return request.delete(`${tenantURL}/sortedRecords/${sortedRecordsUUID}`).then( ( { statusCode,body,headers,request} )=>{
                expect(statusCode).to.equal(204);
            });*/
        });
    });
});