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
    app.get('/search',(req,res)=>{
        const search = req.query.s
        if(!search) res.send({status:500, error:true, message:"you have to provide a search"})
        res.send({status : 200 ,
        message : 'ok',
        data: search
        })
    });


// step 5
const movies = [
    { id: 1, title: 'Jaws', year: 1975, rating: 8 },
    { id: 2, title: 'Avatar', year: 2009, rating: 7.8 },
    { id: 3, title: 'Brazil', year: 1985, rating: 8 },
    { id: 4, title: 'الإرهاب والكباب‎', year: 1992, rating: 6.2 }
]

app.post('/movies/create', (req,res)=>{
    res.send('create');
});
app.get('/movies/read', (req,res)=>{
    res.send({
        status:200,
        data: movies
    });
});
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

// step 7

app.get('/movies/read/id/:id?', (req,res)=>{
    
    const movie = movies.find(c => c.id === parseInt(req.params.id));
    if(!movie) res.send({
        status:404,
        error: true,
        message: `the movie ${req.params.id} does not exist`})
    res.send({status:200, data: movie})
});

// step 8

app.get('/movies/add',(req,res)=>{
    const title = req.query.title;
    const year = parseInt(req.query.year);
    const rating = req.query.rating;
    const isYearNumber = (/^\d{4}$/).test(year);
    if(title==='' || year==='' || isYearNumber == false ) res.send({status:403, error:true, message:'you cannot create a movie without providing a title and a year'});
    else if(rating == ''){
        movies.push({
            title: title,
            year: year,
            rating: 4
        })
        res.send({
            status:200,
            data: movies
        });
    
    }else{
        movies.push({
            title: title,
            year: year,
            rating: rating
        })
        res.send({
            status:200,
            data: movies
        });

    }
})