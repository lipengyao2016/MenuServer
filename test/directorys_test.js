/**
 * Created by Administrator on 2016/9/25.
 */
const expect = require('chai').expect;
const _ = require('lodash');
const common = require('./common');
const url = common.url;
const utils = require('../common/utils');
const request = require('common-request').request;


describe('directory Test Case:',()=>{
    let directoryTestCase = {
        name:'simple 444 directory',
        description:'goods 444 description info',
        merchantHref:'http://localhost:5006/api/v1.0.0/merchants/DQZNqVpEbFxyZ7ayW7x2yA',
    };
    let applicationUUID = 'AppUUIDForTestCase';
    let directoryUUID = null;

    let tenantUUID = null;
    let tenantURL = null;

    tenantURL = url ;

  //  directoryUUID = '4po7G4eCiSztrYzqsyLisg';

    describe('create test case:',  ()=>{
        it('success create an directory',  ()=> {
            //this.timeout(0);



            return request.post(`${tenantURL}/directories`,directoryTestCase).then( ( {statusCode, body, headers, request} )=>{
                expect(statusCode).to.equal(201);
                expect(headers['content-type']).to.equal('application/json; charset=utf-8');
                expect(body.name).to.equal(directoryTestCase.name);

                directoryUUID = utils.getResourceUUIDInURL(body.href,'directories');

                console.log('directorys test  create  directoryUUID  :' + directoryUUID +
                    ' body:'+JSON.stringify(body,null,2));
            });
        });
    });
    describe('retrieve test case:', function () {
        it('success retrieve an directory  ', function () {
            //this.timeout(0);

            return request.get(`${tenantURL}/directories/${directoryUUID}`,{}).then( ( { statusCode,body,headers,request} )=>{

                console.log('directorys test retrieve   :' + JSON.stringify(body,null,2));

                expect(statusCode).to.equal(200);
                expect(headers['content-type']).to.equal('application/json; charset=utf-8');
                //expect(uriReg.applicationURIReg.test(res.headers['location'])).to.be.true;
               // expect(body.name).to.equal(directoryTestCase.name);
            });
        });
    });
    describe('update test case:', function () {
        it('success update an directory', function () {
            //this.timeout(0);
           // directoryUUID = '7O1PwyXNuUOEXxvRfvbyrQ';
            let updateInfo = {};
            updateInfo.description = 'lpy descript';
            return request.post(`${tenantURL}/directories/${directoryUUID}`,updateInfo).then( ( { statusCode,body,headers,request} )=>{

                console.log('directorys test update   :' + JSON.stringify(body,null,2));

                expect(statusCode).to.equal(200);
                expect(headers['content-type']).to.equal('application/json; charset=utf-8');
                expect(body.description).to.equal(updateInfo.description);
                //expect(uriReg.applicationURIReg.test(res.headers['location'])).to.be.true;
            });
        });
    });
    describe('list test case:', function () {
        it('list directorys by all', function () {
            //this.timeout(0);
            let merchantLists = [
                'RQZNqVpEbFxyZ7ayW7x2yA',
                'PQZNqVpEbFxyZ7ayW7x2yA'];
            let qs = {
               // name:'*abinet*',
                //uuid:['3UCHOeNl5tVmN83fkyQfNQ','V1bg0v8SlXKs8OXApykNzg'],
 /*               offset:0,
                limit:1,
                createdAt:'[,2018-04-18 18:13:28]'*/
            };

            return request.get(`${tenantURL}/directories/listAll`,qs).then( ( { statusCode,body,headers,request} )=>{

                console.log('directorys test list   :' + JSON.stringify(body,null,2));

                expect(statusCode).to.equal(200);
                expect(headers['content-type']).to.equal('application/json; charset=utf-8');
                //expect(uriReg.applicationURIReg.test(res.headers['location'])).to.be.true;
            });
        });


        it('list directorys  ', function () {
            //this.timeout(0);
            let merchantLists = [
                'RQZNqVpEbFxyZ7ayW7x2yA',
                'PQZNqVpEbFxyZ7ayW7x2yA'];
            let qs = {
                name:'*good*',
                //uuid:['3UCHOeNl5tVmN83fkyQfNQ','V1bg0v8SlXKs8OXApykNzg'],
                /*               offset:0,
                               limit:1,
                               createdAt:'[,2018-04-18 18:13:28]'*/
            };
            return request.get(`${tenantURL}/directories`,qs).then( ( { statusCode,body,headers,request} )=>{

                console.log('directorys test list   :' + JSON.stringify(body,null,2));

                expect(statusCode).to.equal(200);
                expect(headers['content-type']).to.equal('application/json; charset=utf-8');
                //expect(uriReg.applicationURIReg.test(res.headers['location'])).to.be.true;
            });
        });
    });

    describe('delete test case:',()=>{
        it('success delete an directory', function () {
            //this.timeout(0);

          /*  return request.delete(`${tenantURL}/directories/${directoryUUID}`).then( ( { statusCode,body,headers,request} )=>{
                expect(statusCode).to.equal(204);
            });*/
        });
    });
});