const express = require('express');
const router = express.Router();
const fitMovie = require('../public/javascripts/fit');
const alert = require('alert');

// select box에서 get 받아서 value 값을 가져온다.
router.get('/', function(req,res,next){

  // fit.js 파일에 value들을 보내 값을 요청받는다
  fitMovie(req.query.genre, req.query.country,
     req.query.yearto,(error, {fit}={})=>{
    
    // 결과가 조회되지 않을 시 출력
    if( fit['total'] == 0 ){
      alert("결과가 없습니다. 다른 영화를 골라주세요.");
      return res.render('index');
    }

    // String객체 함수를 사용해 <b>를 제거
    for(let i = 0; i < 5; i++){
    fit['items'][0]['title'] = fit['items'][0]['title'].replace(/<b>/,"")
    fit['items'][0]['title'] = fit['items'][0]['title'].replace(/<\/b>/,"")
    fit['items'][0]['subtitle'] = fit['items'][0]['subtitle'].replace(/<b>/,"")
    fit['items'][0]['subtitle'] = fit['items'][0]['subtitle'].replace(/<\/b>/,"")
    }

    // 에러 확인 후 이상 없으면 fitMovie.jade 페이지와 요청받은 값 전달.
    if (error){
      return res.send({error})
    }
      return res.render('fitMovie', {
  
      title: fit['items'][0]['title'],
      Director : fit['items'][0]['director'],
      Actor : fit['items'][0]['actor'],
      userRating : fit['items'][0]['userRating'],
      subtitle: fit['items'][0]['subtitle'],
      pubDate : fit['items'][0]['pubDate'],
      image : fit['items'][0]['image'],
      link : fit['items'][0]['link'],

    })
  
  })

});

module.exports = router;

