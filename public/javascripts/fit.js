const request = require('request');

// API 제공하는 사이트의 키
const NAVER_CLIENT_ID     = '6Ynx8MeApDkQflsjxRQs';
const NAVER_CLIENT_SECRET = '';
// 위 NAVER_CLIENT_SECRET는 유출되지 않게 부탁드립니다.

const fitMovie = (Genre,Country,Yearto, callback) => {

    const option = {
        query  : "a" , //이미지 검색 텍스트 -> "Default"
        start  :1, //검색 시작 위치
        display:1, //가져올 이미지 갯수
        genre: Genre, // 장르
        country : Country, //국가
        yearfrom : Yearto-1,  
        yearto : Yearto  // 최대년도      
      }
      //REST API 활용
      request({
        uri:'https://openapi.naver.com/v1/search/movie.json', //xml 요청 주소는 https://openapi.naver.com/v1/search/image.xml
        qs :option,
        headers:{
          'X-Naver-Client-Id':NAVER_CLIENT_ID,
          'X-Naver-Client-Secret':NAVER_CLIENT_SECRET
        } // get을 통해 받은 파라미터 값들을 uri에 붙여주며 요청
        }, (error, {body}) => {
        const fit = JSON.parse(body) // String 형식을 JSON형식으로 파싱
        callback(undefined, { // Callback Function 사용해 fitMovie.js로 값 보냄
            fit:fit
            
        })
      })  
     
}

module.exports = fitMovie;