const express = require('express');
const router = express.Router();
const movieSearch = require('../public/javascripts/movie');
const alert = require('alert');

router.get('/', function(req,res,next){
  
  movieSearch(req.query.title,(error, {air}={})=>{
    
    if (req.query.title == ""){
      alert("검색할 영화 제목을 입력해주세요.");
      return res.render('index');
    }
    else if( air['total'] == 0 ){
      alert("결과가 없습니다. 다른 제목을 입력해주세요.");
      return res.render('index');
    }

    for(let i = 0; i < 5; i++){
    air['items'][0]['title'] = air['items'][0]['title'].replace(/<b>/,"")
    air['items'][0]['title'] = air['items'][0]['title'].replace(/<\/b>/,"")
    air['items'][0]['subtitle'] = air['items'][0]['subtitle'].replace(/<b>/,"")
    air['items'][0]['subtitle'] = air['items'][0]['subtitle'].replace(/<\/b>/,"")
    }

    if (error){
      return res.send({error})
    }
      return res.render('search', {
  
      title: air['items'][0]['title'],
      Director : air['items'][0]['director'],
      Actor : air['items'][0]['actor'],
      userRating : air['items'][0]['userRating'],
      subtitle: air['items'][0]['subtitle'],
      pubDate : air['items'][0]['pubDate'],
      image : air['items'][0]['image'],
      link : air['items'][0]['link'],


    })
  

  })

});

module.exports = router;

