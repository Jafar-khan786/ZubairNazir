const users_col = require('../model/users');
const author_posts_col = require('../model/author_posts');
const {isEmpty} = require('../helpar');
const jwt = require('jsonwebtoken');
const my_CONFIG = require('../config/const__.json');

const  {MyBasePath} = require("../image_helper");
  
class orderController {

    static signup = async(req,res)=>{
        try {         let name = req.body.name;
                      let email = req.body.email;
                      let pass = req.body.pass;
                      let address = req.body.address;
                      let mobile = req.body.mobile;
                 
                      if( isEmpty(name) || isEmpty(email) || isEmpty(pass) || isEmpty(address) || isEmpty(mobile)  ){
                        return res.send({"status":false, "msg": "All Field Required","body":''})
                    }
                   
                    let email_check = await users_col.find({email }).countDocuments(); 
     
                    if(email_check >0 ){  
                         return res.status(200).send({"status":false,"msg":'Email already exists ' ,body:''}) ;            
                        }        
                       
                 let mobile_check = await users_col.find({mobile }).countDocuments(); 
                        if(mobile_check >0 ){  
                             return res.status(200).send({"status":false,"msg":'Mobile Number already exists ' ,body:''}) ;            
                            }  



                    let image = ((req.files) && (req.files.user_image != undefined ) && (req.files.user_image.length >0) )? req.files.user_image[0].filename : '';
       
                    let add =new users_col({name,email,pass,address,mobile,image });             
        
                   
                            let allsaveData =  await add.save();
                    if(allsaveData){
        
                                    return res.send({"status":true, "msg": "user add successfully","body": '' })
                    }else{
                        return res.send({"status":true, "msg": "user not added ","body": '' })
                    }
                               
                    
                            } catch (error) { console.log(error);
                                return res.send({"status":false, "msg": "server error","body":''})
                            }
   
    }
    static login = async(req,res)=>{
        try {       
                    let email = req.body.email;
                    let pass = req.body.pass;
          
           if(isEmpty(email) || isEmpty(pass) ){
                return res.send({"status":false, "msg": "All Field Required","body":''})
            }
            
               let  results = await users_col.find({email,pass});

               if(! isEmpty(results)){
                          
                        let u_data = results[0];
                         
                         let token =  await jwt.sign({ user_id: u_data._id,email: u_data.email,name: u_data.name},my_CONFIG.jwt_secret_key, { expiresIn: 60 * 60 });
                        let  sentData =    {user_id: u_data._id,email: u_data.email,name: u_data.name,token,mobile:u_data.mobile};
                        
                        let paths =MyBasePath(req,res); 

                        sentData.image = (u_data.image == '')? '': `${paths}/image/assets/user_img/${u_data.image}` ;

                         if(! isEmpty(token)){
                            return   res.send({"status":true, "msg": " Login successfully","body": sentData }) ; 
                            }          
                       

                        }else{
                            return res.send({"status":false, "msg": "No Data Found!..","body":''})
                        }


                        
                  
            
                    } catch (error) { console.log(error);
                        return res.send({"status":false, "msg": "server error","body":''})
                    }

    }

    static add_post = async(req,res)=>{
        try {  
            let author_post = req.body.author_post;
            let author_id = req.body.author_id;
           
            if( isEmpty(author_post) || isEmpty(author_id)  ){
              return res.send({"status":false, "msg": "All Field Required","body":''})
          }
         let image = ((req.files) && (req.files.post_image != undefined ) && (req.files.post_image.length >0) )? req.files.post_image[0].filename : '';

          let add =new author_posts_col({image,author_post,author_id});             

         
                  let allsaveData =  await add.save();
          if(allsaveData){

                 return res.send({"status":true, "msg": "author post add successfully","body": '' })
          }else{
              return res.send({"status":true, "msg": "author post not added ","body": '' })
          }
                     
          
                  } catch (error) { console.log(error);
                      return res.send({"status":false, "msg": "server error","body":''})
                  } 
        

    }

    static show_post = async(req,res)=>{
        try {
                    let  sentData = [];
                     let paths =MyBasePath(req,res); 
                 let pipeline  = [] ;
                  pipeline.push({ $lookup: {from: 'users', localField: 'author_id', foreignField: '_id', as: 'user_col'} });
            pipeline.push({ $unwind: "$user_col" });    
          
            pipeline.push({ $project: {"author_name":"$user_col.name","author_image":"$user_col.image",
                        "author_address":"$user_col.address","author_post" : 1,"image":1,"date":1 } });

           
            let allUsersData = await author_posts_col.aggregate(pipeline).exec();
            
             

            if(! isEmpty(allUsersData)){

                allUsersData.map((item)=>{
                       
                        item.author_image = ( item.author_image == '')? '': `${paths}/image/assets/user_img/${item.author_image}` ; 
                      

                       item.image = (item.image == '')? '': `${paths}/image/assets/post_img/${item.image}` ;

                       sentData.push(item);
                      
                    });


                     return   res.send({"status":true, "msg": "Success","body": sentData }) ; 
                     

                     }else{
                         return res.send({"status":false, "msg": "No Data Found!..","body":''})
                     }



        } catch (error) {
            
        }

    } 

}


module.exports = orderController;

