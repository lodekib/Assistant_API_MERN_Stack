const express=require('express');
const mongoose=require('mongoose');
const bodyParser=require('body-parser');
const app=express();
const cors=require('cors');
const routes=require('../routes')
const db=mongoose.connection;
require('dotenv').config();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(routes);

app.set('view engine','ejs');

app.use(express.static('public'));

mongoose.connect(process.env.DATABASE_URL,{useNewUrlParser:true,useUnifiedTopology:true});
db.on('error',(error)=>console.error(error));
db.once('open',()=>console.log('Database connected'));



app.listen(process.env.PORT,()=>{
    console.log('API is up and running!');
});