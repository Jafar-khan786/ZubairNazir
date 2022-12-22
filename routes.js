var express = require('express'),
   routes = express.Router();
const {img_upload} = require('./image_helper');

const user_img =  img_upload('./assets/user_img','user_image');
const post_img =  img_upload('./assets/post_img','post_image');

  



var userController = require('./controller/userController');
const{check_user} = require('./Middleware');

routes.post('/signup',user_img,userController.signup);
routes.post('/login',userController.login);
routes.post('/add_post',check_user,post_img,userController.add_post);
routes.get('/show_post',check_user,userController.show_post);

//routes.get('/get_user_login_history/:id?',check_user ,userController.get_user_login_history);







module.exports = routes; 
