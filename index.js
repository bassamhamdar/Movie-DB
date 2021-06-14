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

// step 4

    app.get('/hello/:id?',(req,res)=>{
        res.send({status : 200 ,
        message: `hello ${req.params.id}`
        })
    });
    app.get('/search?s=:search',(req,res)=>{
        res.send({status : 200 ,
        message : 'ok',
        data: `${req.params.search}`
        })
    });

    app.get('*',(req,res)=>{
            res.send({
                status: 500,
                error: true,
                message: 'you have to provide a search'
            })
        

    });

