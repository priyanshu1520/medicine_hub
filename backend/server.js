const express=require('express');
const app = express();
const db=require('./db');
const userroute=require('./routes/userRoutes.js');
const medicineroute=require('./routes/medicineRoutes.js');
const bodyParser=require('body-parser');
const cors=require('cors');
app.use(bodyParser.json());
require('dotenv').config();
const PORT=process.env.PORT||3000;
app.use(cors());
app.use('/user',userroute)
app.use('/medicine',medicineroute)
app.listen(3000,()=>{
    console.log('connected to server 3000');
});