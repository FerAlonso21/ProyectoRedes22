const express = require('express');
const app = express();
const cors = require('cors');
const morgan=require('morgan');

const port =(process.env.port || 3000);

//
const marvelRoutes=require('./Routes/Marvel')
const NyRoutes=require('./Routes/NyTimes')
const ownRoutes=require('./Routes/Own')

//Middlewares
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.static('public'));
app.use('/files',express.static(__dirname+'/public'))
//EndPoints
 app.use('/marvel',marvelRoutes)
 app.use('/nytimes',NyRoutes)
 app.use('/own',ownRoutes)


//Main Route
app.use('/',(req,res)=>{
    res.status(200).json({ 
        respuesta:"Success"
    })
  })

  

//Server Up
app.listen(3000, function () {
    console.log("Server listen on port:"+port)
  })
