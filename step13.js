const express = require('express');
const app = express();
app.listen(8000, ()=>console.log('ok'));


//list of movies
const movies = [
    { title: 'Jaws', year: 1975, rating: 8 },
    { title: 'Avatar', year: 2009, rating: 7.8 },
    { title: 'Brazil', year: 1985, rating: 8 },
    { title: 'الإرهاب والكباب‎', year: 1992, rating: 6.2 }
]
//list of users
const users = [{
    username : 'bassam',
    password : '123'
},{
    username : 'hamdar',
    password : '321'
},{
    username : 'zero',
    password : '0000'
}];

app.get('movies/add/username/:username/ID/:id',(req,res)=>{
    const username = req.params.username;
    const movieId = parseInt(req.params.id);
    //check for user
    const checkUsername = users.find(u=>u.username === username);
});