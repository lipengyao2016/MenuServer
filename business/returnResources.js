"use strict";
const querystring = require('querystring');
const _ = require('lodash');
const moment = require('moment');

const  dateCountSepeliter= require('./dateCountSepeliter');

/*let dateArray = dateCountSepeliter.speliterDate('2017-04-22 18:13:28','2018-05-3 18:13:28','year');
console.log(JSON.stringify(dateArray,null,2));*/

// PackageTotalStatistics
exports.generatePackageTotalStatisticsRetJSON = (stats,dateQueryStr,unit) => {

     let dateTimes = dateQueryStr.replace(/(\[)|(\])|(\")/g,"").split(',');
     let dateArray =  dateCountSepeliter.speliterDate(dateTimes[0],dateTimes[1],unit);
     let retObj = dateArray.map(singleDate=>{
         let stat = _.find(stats, item=>item.unitDate==singleDate);
         if(!stat)
         {
             return {unitDate:singleDate,count:0};
         }
         else
         {
             return stat;
         }
     });

     return retObj;
};


