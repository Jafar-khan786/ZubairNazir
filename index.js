var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
const my_CONFIG = require('./config/const__.json');
const path = require('path');

const routes = require('./routes');
var app = express();
 const port = my_CONFIG.port ||4300;

                    
 var mongoose = require('mongoose');
 mongoose.set('strictQuery', false);
 mongoose.connect('mongodb://localhost:27017/social_platform_db');
 var db = mongoose.connection;
 db.on('error', console.error.bind(console, 'connection error:'));
 
 db.once('open', function callback () {
   console.log("mongodb database connected");
 });



app.use(cors());

app.use(bodyParser.json());
 

app.get('/', function (req, res, ) {
   return res.json({msg: 'This is Home Page'});
})
 
app.use("/api/",routes);


app.use('/image/assets/:par1?/:img?', function (req, res, ) {
          let par1 = req.params.par1;
          let img = req.params.img;
          let full_path = path.join(__dirname+`/assets/${par1}/${img}`);
       
        return   res.sendFile(full_path);
    })




app.listen(port, function () {
  console.log('CORS-enabled web server listening on port'+port);
})