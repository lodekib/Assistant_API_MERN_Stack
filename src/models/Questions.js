const mongoose=require('mongoose');

const QuestionsSchema=new mongoose.Schema({
 question:{
     type:String,
     required:true
 },
 answer:{
     type:String,
     required:true
 }
});

const Question=mongoose.model('Question',QuestionsSchema);
module.exports=Question;