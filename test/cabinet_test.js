/**
 * Created by Administrator on 2016/9/25.
 */

const request = require('request-promise');
const expect = require('chai').expect;
const _ = require('lodash');
const common = require('./common');
const url = common.url;
const utils = require('../common/utils');



describe('Cabinet Test Case:',function () {
    let directoryUUID  = null;
    describe('cabinet test case:',  function (){
        let cabinetUUID = null;
        it('create a cabinet test case:',  function (){
            //this.timeout(0);
            let  options = {
                body: {
                    name:'测试-柜子',
                    number: '00001',
                    address: '富贵小区一栋',
                    boxCount: 50,
                    usedCount: 20,
                    noticerHref: `http://192.168.7.150:5003/api/v1.0.0/userOrganizations/WbmY5fQqhDTEpZr414YSpg/users/OSU4FWmXO88AyFnKc3JlBw`
                },
                json: true, simple: true, resolveWithFullResponse: true
            };

            return request.post(`${url}/directories/3UCHOeNl5tVmN83fkyQfNQ/cabinets`,options)
                .then(function ({statusCode,body,headers,request}) {
                    expect(statusCode).to.equal(201);
                    console.log('statusCode:',statusCode);
                    console.log('body:',JSON.stringify(body,null,2));
                    cabinetUUID = utils.getResourceUUIDInURL(body.href,'cabinets');
                })
        });


        it('create a boxx test case:',  function (){
            //this.timeout(0);
            let  options = {
                body: {
                    number:'111'
                },
                json: true, simple: true, resolveWithFullResponse: true
            };

            return request.post(`${url}/cabinets/j4JqRf3mmDwWU9R820DDew/boxes`,options)
                .then(function ({statusCode,body,headers,request}) {
                    expect(statusCode).to.equal(201);
                    console.log('statusCode:',statusCode);
                    console.log('body:',JSON.stringify(body,null,2));
                })
        });


        it('get a cabinet test case:',  function (){
            //this.timeout(0);

            let  options = {
                json: true, simple: true, resolveWithFullResponse: true
            };
            return request.get(`${url}/cabinets/${cabinetUUID}`,options)
                .then(function ({statusCode,body,headers,request}) {
                    expect(statusCode).to.equal(200);
                    console.log('statusCode:',statusCode);
                    console.log('body:',JSON.stringify(body,null,2));
                })
        });
        it('update a cabinet test case:',  function (){
            //this.timeout(0);

            let  options = {
                body:{usedCount: 30},
                json: true, simple: false, resolveWithFullResponse: true
            };
            return request.post(`${url}/cabinets/${cabinetUUID}`,options)
                .then(function ({statusCode,body,headers,request}) {
                    expect(statusCode).to.equal(200);
                    console.log('statusCode:',statusCode);
                    console.log('body:',JSON.stringify(body,null,2));
                })
        });

        it('list cabinets test case:',  function (){
            //this.timeout(0);

            let  options = {
                qs: {limit: 3},
                json: true, simple: true, resolveWithFullResponse: true
            };
            return request.get(`${url}/cabinets`,options)
                .then(function ({statusCode,body,headers,request}) {
                    expect(statusCode).to.equal(200);
                    console.log('statusCode:',statusCode);
                    console.log('body:',JSON.stringify(body,null,2));
                })
        });
        // it('delete a cabinet test case:',  function (){
        //     //this.timeout(0);
        //
        //     let  options = {
        //         json: true, simple: false, resolveWithFullResponse: true
        //     };
        //     return request.delete(`${url}/cabinets/${cabinetUUID}`,options)
        //         .then(function ({statusCode,body,headers,request}) {
        //             expect(statusCode).to.equal(204);
        //             console.log('statusCode:',statusCode);
        //             console.log('body:',JSON.stringify(body,null,2));
        //         })
        // });
    });
});