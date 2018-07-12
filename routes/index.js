var express = require('express');
var Bamboo = require('../models/bamboo'); //actual model
var Member = require('../models/member');
var router = function(app) {

  app.get('/', function(req, res){
    res.send('Hello World');
  });

  app.get('/memo/get-data', function(req, res) {
    Bamboo.find(function(err, bamboos){
      if(err) return res.status(500).json({error: 'failure!'});
      res.json(bamboos);
    });
  });

  app.post('/memo/insert-data', function(req, res) {
    var item = new Bamboo();
    item.Title = req.body.Title;
    item.Dates = req.body.Dates;
    item.Contents = req.body.Contents;
    item.Password = req.body.Password;
    item.save(function(err) {
      if(err) {
        res.json({"result": 0});
        return;
      }
      else {
        res.json({"result": 1});
      }
    });
  });

  app.delete('/memo/delete-data', function(req, res) {
    var query = {"Title":req.body.Title, "Dates":req.body.Dates, "Contents":req.body.Contents, "Password":req.body.Password};
    Bamboo.remove(query, function(err, output) {
      if(err) return res.status(500).json({error: "failure!"});
      console.log(req.body.Password);
      res.status(204).end();
    });
  });

  app.put('/memo/update-data', function(req, res){
    var query2 = {'Password' : req.body.Password};
    var memos = {'Title' : req.body.Title, 'Dates' : req.body.Dates, 'Contents' : req.body.Contents, 'Password' : req.body.Password};
    Bamboo.findOneAndUpdate(query2, {$set: memos}, function(err, doc){
      if(err) {
        console.log(err);
        res.json({"result":0});
        return;
      }
      else{
        console.log(memos);
        res.json({"result":1});
      }
    })
  });

  app.get('/member/get-data', function(req, res){
    Member.find(function(err, members){
      if(err) return res.status(500).json({error: 'failure!'});
      res.json(members);
    });
  });

  app.put('/member/insert-data', function(req, res){
    var item2 = new Member();
    item2.id = req.body.id;
    item2.name = req.body.name;
    item2.email = req.body.email;

    var query = {'id':req.body.id};
    Member.findOneAndUpdate(query, item2, {upsert: true}, function(err, doc){
      if(err) {
        res.json({"result" :0});
        return;
      }
      else {
        res.json({"result": 1});
      }
    });
  });

}

module.exports = router;
