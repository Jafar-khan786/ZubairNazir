const mongoose = require('mongoose');

const Schema = mongoose.Schema;

            
const Userschema = new Schema({
                             
         name: { type: String, default: ''},
         email: { type: String,unique: true, default: ''},
         mobile: { type: Number,unique: true,default: 0},
         pass: { type: String,default: ''},
         address: { type: String, default: ''},
         image: { type: String,default: '' },
         active_status: { type: Boolean ,default : 1}
        
});


module.exports = mongoose.model('users', Userschema);

