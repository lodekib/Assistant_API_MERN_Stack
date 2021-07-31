const express=require('express');
const router=express.Router();
const Question= require('./src/models/Questions');

//get all the questions
router.get('/',async(req,res)=>{
   try{
   const questions=await Question.find();
   res.render('pages/index',{data:questions});
   }catch(error){
       return res.status(500).json({'get_error':error});
   }
});

//get one quiz question
router.get('/questions/:id',async(req,res)=>{
  try{
    const _id=req.params.id;
    const question= await Question.findOne({_id});
    if(!question){
      return res.status(404).json({});
    }else{
      return res.status(200).json(question);
    }
  }catch(error){
    return res.status(500).json({"single_fetch":error});
  }
});

//create one quiz question
router.post('/questions', async(req,res)=>{ 
   try{
    const {question,answer}=req.body;
    console.log(req.body);
    const quiz= await Question.create({
       question,
       answer 
    })
    return status(200).json(quiz);
   }catch(e){
     res.status(500).json({"post_error":e});
   }  
});

//update one quiz question
router.put('/questions/:id',async(req,res)=>{
   try{
      const _id=req.params.id;
      const {question,answer}=req.body;
      let quiz=await Question.findOne({_id});
      if(!quiz){
        quiz=await Question.create({
          question,
          answer
        })
        return res.status(200).json(quiz);
      }else{
        quiz.question=question;
        quiz.answer=answer;
        await quiz.save();
        return res.status(200).json(quiz);
      }
   }catch(error){
     return res.status(500).json({"update_error":error});
   }
});

//delete one quiz question
router.delete('/questions/:id',async(req,res)=>{
    try{
      const _id=req.params.id;
      const quiz=await Question.deleteOne({_id});

      if(quiz.deletedCount===0){
        return res.status(404).json();
      }else{
        return res.status(204).json();
      }
    }catch(error){
      return res.status(500).json({"delete_error":error});
    }
});

//root path
// router.get('/',(req,res)=>{
//     res.render('pages/index');
// })

module.exports=router;