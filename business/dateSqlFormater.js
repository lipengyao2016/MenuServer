const moment = require('moment');
const _ = require('lodash');

exports.getDateFormat = function(unit)
{
    let dateFormat;
    if(unit == 'day')
    {
        return  `DATE_FORMAT(createdAt,'%Y-%m-%d') ` ;
    }
    else if(unit == 'month')
    {
        return `DATE_FORMAT(createdAt,'%Y-%m') `;
    }
    else if(unit == 'year')
    {
        return `DATE_FORMAT(createdAt,'%Y') `;
    }
    else
    {
        return null;
    }
}