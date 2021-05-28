const express = require('express');
const router = express.Router();
const movieSearch = require('../public/javascripts/movie');
const alert = require('alert');

// 검색어 값을 받는다.
router.get('/', function(req,res,next){
  
  // movie.js 파일에 value들을 보내 값을 요청받는다
  movieSearch(req.query.title,(error, {movie}={})=>{
    
    // 결과가 조회되지 않거나 검색어를 입력하지 않을 시 출력
    if (req.query.title == ""){
      alert("검색할 영화 제목을 입력해주세요.");
      return res.render('index');
    }
    else if( movie['total'] == 0 ){
      alert("결과가 없습니다. 다른 제목을 입력해주세요.");
      return res.render('index');
    }

    // String객체 함수를 사용해 <b>를 제거
    for(let i = 0; i < 5; i++){
      movie['items'][0]['title'] = movie['items'][0]['title'].replace(/<b>/,"")
      movie['items'][0]['title'] = movie['items'][0]['title'].replace(/<\/b>/,"")
      movie['items'][0]['subtitle'] = movie['items'][0]['subtitle'].replace(/<b>/,"")
      movie['items'][0]['subtitle'] = movie['items'][0]['subtitle'].replace(/<\/b>/,"")
    }

    // 에러 확인 후 이상 없으면 search.jade 페이지와 요청받은 값 전달.
    if (error){
      return res.send({error})
    }
      return res.render('search', {
  
      title: movie['items'][0]['title'],
      Director : movie['items'][0]['director'],
      Actor : movie['items'][0]['actor'],
      userRating : movie['items'][0]['userRating'],
      subtitle: movie['items'][0]['subtitle'],
      pubDate : movie['items'][0]['pubDate'],
      image : movie['items'][0]['image'],
      link : movie['items'][0]['link'],

    })

  })

});

module.exports = router;

