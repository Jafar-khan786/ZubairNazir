const jwt       = require('jsonwebtoken');
const my_CONFIG = require('./config/const__.json');

const {isEmpty} = require('./helpar');

const check_user = async(req,res,next) =>{
  
    try {
        var token = req.headers['token']; 

       // console.log("token is  == ",token);
            if(isEmpty(token)){
                return res.send({"status":false, "msg": "Token is Required " ,"logout":true ,"body":''})
            }

        var u_info = await jwt.verify(token, my_CONFIG.jwt_secret_key);
        if(u_info){
            req.body.user_id = u_info.user_id;
        console.log( "middleware is call ==",  u_info);
        next();
        }
      } catch(err) {  console.log(err);
          return res.send({"status":false, "msg": "Invalid Token","logout":true ,"body":''})
      }   

}

module.exports = {check_user};