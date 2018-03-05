var express = require('express');
var router = express.Router();
var url = require('url');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
router.post('/addEntry', function(req,res,next){
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
        var insertSql = "INSERT INTO test SET ?";
        var insertValues = {
        "name": reqObj.name,
        "age": reqObj.age
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
            conn.query('SELECT * from test', function(err, results, fields) {
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
