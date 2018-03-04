var express = require('express');
var router = express.Router();
var users = require('../model/users.js');

router.get('/',(req,res)=>{
  res.render('users',{title:'Welcome to Holland Personality Test!'});
});


  router.post('/check',(req,res)=>{
    var data = req.body;
    users.getUser(data.email,(err,rows)=>{
      if (err) return console.log('users check' + err);
      if(rows.length>0){
        console.log("ada email");
        res.json({valid:false})
      }else{
        res.json({valid:true})
      }
    });
  })
  // add user
  router.post('/', function(req, res, next) {
    var data = req.body;
        users.insertUser(data.email,data.name,data.school,data.major,data.phone, function(err,result) {
          if (err) return console.log('usesr insert'+err)
          console.log('Data has been inserted...');
          req.session.username = data.email;
          req.session.name = data.name;
          req.session.school = data.school;
        res.redirect('/');
        })
  });

module.exports = router;
