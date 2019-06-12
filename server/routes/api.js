const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}) );
var mongoose = require('mongoose');
app.all("/*", function(req, res, next){
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
  next();
});

// declare axios for making http requests
const axios =  require('axios');
const rusers="https://randomapi.com/api/6de6abfedb24f889e0b5f675edc50deb?fmt=raw&sole";
 mongoose.connect('mongodb://localhost:27017/users', {useNewUrlParser: true});
 var db = mongoose.connection;
 db.on('error', function(error){console.log("error");});
 db.once('open', function() {
 console.log("Connection Successful!");
});
   var Schema = mongoose.Schema;
   var schema = new Schema ({
   	name:String,
    pn:Number,
    email:String,
    password:String,
    eid:String
   },{collection:'userinfo'});

   var userinsert = mongoose.model('userinsert',schema);
  
/* GET api listing. */
router.get('/', (req, res) => {
  res.send('api works');
});

router.post('/pushusers', (req, res) => {
  var searchuser = req.body;
  userinsert.find({ 'name': searchuser.name }, 'name', function (err, existinguser) {
  if (err)
  {
    throw err;
  }


   else if (!existinguser.length) {

  var userinfo = req.body;
  var newuser = new userinsert;
  newuser.name = userinfo.name;
  newuser.email = userinfo.email;
  newuser.password = userinfo.password;
  newuser.eid = userinfo.eid;
  newuser.pn = userinfo.phone;
  newuser.save();
  res.send(JSON.parse('{"message":"yay"}'));

  }
  
  else
  {
    res.send(JSON.parse('{"message":"m"}'));
  }
});

 });
  


   router.post('/getuser', (req,res)=>{
    var trysignin = req.body;
    

    userinsert.findOne({'name' :trysignin.name} , 'name password email eid pn' , function(err, userinsert){
      if((userinsert.name==trysignin.name)&&(userinsert.password==trysignin.password))
      {
       
        res.send(userinsert);
      }
      else
      {
        res.send(JSON.parse('{"message":"wrong"}'));
      }

    } );

  
   });


  



module.exports = router;