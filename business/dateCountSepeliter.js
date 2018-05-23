/**
 * Created by Administrator on 2017/2/17.
 */
"use strict";
const _ = require('lodash');
const utils = require('componet-service-framework').utils;
const moment = require('moment');


class DateCountSepeliter {
    constructor() {

    };

    addDate(srcDate,sepeliterTime)
    {
        let curDate = srcDate;
        curDate = curDate.valueOf();
        curDate = curDate +sepeliterTime;
        let newDate = new Date(curDate);
        return newDate;
    }


    addTimeByUnit(srcDate,increase,unit)
    {
        let curDate = _.clone(srcDate);
        if(unit == 'day')
        {
            curDate.setDate(curDate.getDate()+increase);
        }
        else if(unit == 'month')
        {
            curDate.setMonth(curDate.getMonth()+increase);
        }
        else if(unit == 'year')
        {
            curDate.setFullYear(curDate.getFullYear()+increase);
        }

        return curDate;
    }

    resetDate(srcDate,unit)
    {
        let curDate = _.clone(srcDate);
        if(unit == 'day')
        {
            curDate.setHours(0,0,0);
        }
        else if(unit == 'month')
        {
            curDate.setDate(1);
            curDate.setHours(0,0,0);
        }
        else if(unit == 'year')
        {
            curDate.setMonth(1,1);
            curDate.setHours(0,0,0);
        }
        return curDate;
    }


    formatDate(srcDate,unit)
    {
        let curDate = _.clone(srcDate);
        let format ;
        if(unit == 'day')
        {
            format = 'YYYY-MM-DD';
        }
        else if(unit == 'month')
        {
            format = 'YYYY-MM';
        }
        else if(unit == 'year')
        {
            format = 'YYYY';
        }
        let dateTime = moment(curDate).format(format);
        return dateTime;
    }



    speliterDate(beginDateStr,endDateStr,unit)
    {
        let sepeliterTimes;
        let beginDate;
        let endDate;

        beginDate = new Date(beginDateStr);
        endDate = new Date(endDateStr);

        beginDate = this.resetDate(beginDate,unit);
        endDate = this.resetDate(endDate,unit);


        let sepeliteDates = [];

        let middleDate = beginDate;
        let nextDate;

        sepeliteDates.push(this.formatDate(beginDate,unit));

        while(middleDate < endDate)
        {
            nextDate = this.addTimeByUnit(middleDate,1,unit);

            if(nextDate <= endDate)
            {
                sepeliteDates.push(this.formatDate(nextDate,unit));
                middleDate = nextDate;
            }
            else
            {
                middleDate = nextDate;
                break;
            }
        }
        if(nextDate < endDate)
        {
            sepeliteDates.push(this.formatDate(endDate,unit));
        }

        return sepeliteDates;
    }





}

let dateCountSepeliter = new DateCountSepeliter();
module.exports = dateCountSepeliter;