var express = require('express');
var router = express.Router();
var url = require('url');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
router.post('/addTrangBang', function(req,res,next){
  try{
    var reqObj = req.body;	
    console.log(reqObj);
    req.getConnection(function(err, conn){
      if(err)
      {
        console.error('SQL Connection error: ', err);
        return next(err);
      }
      else
      {
        var insertSql = "INSERT INTO trangbang_tn SET ?";
        var insertValues = {
        "sequence": reqObj.sequence,
        "stt": reqObj.stt,
        "ph": reqObj.ph,
        "cod": reqObj.cod,
        "ss": reqObj.ss,
        "color": reqObj.color,
        "temp": reqObj.temp,
        "flow": reqObj.flow,
        "money": reqObj.money,
        "date": reqObj.date
        };
        var query = conn.query(insertSql, insertValues, function (err, result){
          if(err){
          console.error('SQL error: ', err);
          return next(err);
          }
          console.log(result);
          var entry_id = result.insertId;
          res.json({"id":entry_id});
        });
      }
      });
    }
    catch(ex){
    console.error("Internal error:"+ex);
    return next(ex);
    }
  });
  router.post('/addLinhTrung', function(req,res,next){
    try{
      var reqObj = req.body;	
      console.log(reqObj);
      req.getConnection(function(err, conn){
        if(err)
        {
          console.error('SQL Connection error: ', err);
          return next(err);
        }
        else
        {
          var insertSql = "INSERT INTO linhtrung_tn SET ?";
          var insertValues = {
          "sequence": reqObj.sequence,
          "stt": reqObj.stt,
          "ph": reqObj.ph,
          "cod": reqObj.cod,
          "ss": reqObj.ss,
          "color": reqObj.color,
          "temp": reqObj.temp,
          "flow": reqObj.flow,
          "money": reqObj.money,
          "date": reqObj.date
          };
          var query = conn.query(insertSql, insertValues, function (err, result){
            if(err){
            console.error('SQL error: ', err);
            return next(err);
            }
            console.log(result);
            var entry_id = result.insertId;
            res.json({"id":entry_id});
          });
        }
        });
      }
      catch(ex){
      console.error("Internal error:"+ex);
      return next(ex);
      }
    });
    
/* Get Employee Service. */
router.get('/getEntry', function(req, res, next) {
  try {
    /*var roleId = req.param('roleId');
    var deptId = req.param('deptId');*/
    var query = url.parse(req.url,true).query;
    console.log(query);
    req.getConnection(function(err, conn) {
        if (err) {
            console.error('SQL Connection error: ', err);
            return next(err);
        } else {
            conn.query('SELECT * from trangbang_tn', function(err, results, fields) {
                if (err) {
                    console.error('SQL error: ', err);
                    return next(err);
                }
                res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
            });
        }
    });
  } catch (ex) {
      console.error("Internal error:" + ex);
      return next(ex);
  }
});
