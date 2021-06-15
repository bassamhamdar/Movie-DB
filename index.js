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
    { title: 'Jaws', year: 1975, rating: 8 },
    { title: 'Avatar', year: 2009, rating: 7.8 },
    { title: 'Brazil', year: 1985, rating: 8 },
    { title: 'الإرهاب والكباب‎', year: 1992, rating: 6.2 }
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
    const id = parseInt(req.params.id);
    const movie = movies[id-1];
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

// step 9

app.get('/movies/delete/:id?',(req,res)=>{
    const id = parseInt(req.params.id);
    if( id > movies.length || id <=0){ res.send({status:404, error:true, message:`the movie ${req.params.id} does not exist`});}
    else{ const deletedMovie = movies.splice(id -1, 1);
    console.log(deletedMovie);
    res.send(movies);
    }
    
});

// step 10

app.get('/movies/update/:id',(req,res)=>{
    const id = parseInt(req.params.id);
    const newTitle = req.query.title;
    const newRating = req.query.rating;
    const newYear = req.query.year;
    const modifiedMovie = movies[id-1];
    if(newTitle) modifiedMovie.title = newTitle;
    if(newRating) modifiedMovie.rating = newRating;
    if(newYear) modifiedMovie.year = newYear;
    res.send(movies);
});
