const mongoose = require('mongoose') ;

userSchema = mongoose.Schema({
  name: {type:String},
  date: {type:Date},
  organization:{type:String},
  position:{type:String},
  
  
  most:{type:String},
  mostTotal:{type:String},
  least:{type:String},
  leastTotal:{type:String},
  change:{type:String},
  status:{type:Boolean,default:false}
})

module.exports = mongoose.model('user',userSchema)