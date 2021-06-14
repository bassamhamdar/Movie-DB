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

    app.get('/search?s=',(req,res)=>{
        res.send({status : 500 ,
        error : true,
        data: 'you have to provide a search'
        })
    });


    // app.get('*',(req,res)=>{
    //         res.send({
    //             status: 500,
    //             error: true,
    //             message: 'you have to provide a search'
    //         })
        

    // });

// step 5
const movies = [
    { title: 'Jaws', year: 1975, rating: 8 },
    { title: 'Avatar', year: 2009, rating: 7.8 },
    { title: 'Brazil', year: 1985, rating: 8 },
    { title: 'الإرهاب والكباب‎', year: 1992, rating: 6.2 }
]

app.post('/movies/create', (req,res)=>{
    res.send('create');
});
// app.get('/movies/read', (req,res)=>{
//     res.send({
//         status:200,
//         data: movies
//     });
// });
app.put('/movies/update', (req,res)=>{
    res.send('update');
});
app.delete('/movies/delete', (req,res)=>{
    res.send('delete');
});

app.get('/movies/read/by-date',(req,res)=>{
    res.send({
        status:200,
        data: movies.sort(function(a,b){
            var dateA = new Date(a.year),dateB = new Date(b.year);
            return dateA - dateB;
        })
    })
});

app.get('/movies/read/by-rating',(req,res)=>{
    res.send({
        status:200,
        data: movies.sort(function(a,b){
            return b.rating - a.rating;
        })
    })
});

app.get('/movies/read/by-title',(req,res)=>{
    res.send({
        status:200,
        data: movies.sort(function(a,b){
            var titleA = a.title,titleB = b.title;
            if(titleA < titleB) return -1;
            if(titleA > titleB) return 1;
            return 0;
        })
    })
});

