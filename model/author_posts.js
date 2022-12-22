const mongoose = require('mongoose');

const Schema = mongoose.Schema;

            
const author_schema = new Schema({
                             
        author_id:{ type: Schema.Types.ObjectId,  ref: 'users', required: true },
         author_post: { type: String, default: ''},
         image: { type: String,default: '' },
         date :{ type:Date , default :Date.now()  }
        
});


module.exports = mongoose.model('author_posts', author_schema);

