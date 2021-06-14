const express = require('express');
const app = express();
app.listen(3000, ()=>console.log('ok'));
app.get('/test',(req,res)=>{
res.send({status : 200 ,
    message: "ok"
})
});
app.get('/time',(req,res)=>{
    var today = new Date();
    res.send({status : 200 ,
        message: today.getHours()+":"+today.getSeconds()
    })
    });