const express = require('express');
const router = express.Router();


router.post('/', function(req,res){

  movieSearch(req.body.title, {air}={})=>{
    if (error){
      return res.send({error})
    }
    return res.render('search', {
      이름 : '이한주',
      title: air['parm'['title']]

    })
  }
});





module.exports = router;

