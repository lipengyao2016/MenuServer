/**
 * Created by Administrator on 2018/3/1.
 */
const restRouterModel = require('rest-router-model');
let BaseBusiness = restRouterModel.BaseBusiness;

class UserBusiness extends BaseBusiness{
    constructor(abc){
        super();
        this.abc = abc;
    }
    create(data,){
        {

        }
        super.create(data)

    }
    sexSta(){
        return {name:this.name,method:'sexSta',abc:this.abc}
    }
    fun(){
        return {name:this.name,method:'abc',abc:this.abc}
    }

    st(data){
        return {name:this.name,method:'st',abc:this.abc,data,name:this.name,model:this.model,dbOperater:this.dbOperater}
    }
}
module.exports = UserBusiness;