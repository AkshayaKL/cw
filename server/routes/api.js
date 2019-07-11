const express = require('express');
const router = express.Router();
const multer = require('multer');
var fileUpload = require("express-fileupload");
const bodyParser = require('body-parser');
const path = require('path');
var storage = multer.diskStorage
              ({ destination: function(req, file, cb){cb(null,path.join(__dirname,'..','images') )},
                 filename: function (req, file, cb) {
                                                        cb(null, file.fieldname+ '-' + Date.now())
  }
               } );
var upload = multer({ storage: storage })
const app = express();
app.use(fileUpload());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}) );
var fs = require('fs');
var mongoose = require('mongoose');

var streamifier = require("streamifier");
router.all("/*", function(req, res, next){
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
  next();
});



// declare axios for making http requests
const assert =  require('assert');
 mongoose.connect("mongodb://localhost:27017/users", { useNewUrlParser: true },function(err){

  if(err)
  {
    throw err;
  }
 });
 const conn = mongoose.connection;
 conn.on('error', function(error){console.log("error");});
 conn.once('open', function() {
 console.log("Connection Successful!");

  /*fs.createReadStream(local_file).
      pipe(gridFSBucket.openUploadStream(local_file)).
      on('error',function(error){
        assert.ifError(error);
      }).
      on('finish', function(){
        console.log("done!");
        
      })*/
 });
 
  var local_file = path.join(__dirname,'..','images','logo.jpg');
 

  
   var Schema = mongoose.Schema;
   var schema = new Schema ({
    name:String,
    pn:Number,
    email:String,
    password:String,
    eid:String
   },{collection:'userinfo'});

   var userinsert = conn.model('userinfo',schema);
   var EventSchema = new mongoose.Schema({
    
    start: Date,
    end: Date,
    title: String,
    color: {
      primary:String,
      secondary:String
    },
    allDay: Boolean,
    resizable:{
      beforeStart:Boolean,
      afterEnd:Boolean
    },
   draggable:Boolean},{collection:'events'} 
   );

   var UserDetailSchema = new mongoose.Schema({
    EmpNo:Number,
    Name:String,
    Joining_Date:Date,
    Ageing: Number,
    Head: String,
    Supervisor_Name: String,
    Location : String,
    Data_Eng : Boolean,
    Valuation: Boolean,
    Model_Building : Boolean,
    Financial_Planning: Boolean,
    Financial_Crime_Analysis: Boolean,
    Python: Boolean,
    ML: Boolean,
    Risk_Diagnostics: Boolean,
    Text_Analytics: Boolean,
    Business_Diagnostics: Boolean,
    Price_Optimisation: Boolean,
    R: Boolean,
    SAS: Boolean
   },{collection:"userdetails"});

   var EnrollmentDetailSchema = new mongoose.Schema({
    Name:String,
    EmpNo:Number,
    Course:String,
    Feedback:String
   },{collection:'enrollment'});


 var enrollmentdetail = conn.model('enrollmentdetail', EnrollmentDetailSchema);
 var calendarevents = conn.model('events', EventSchema);
 var userdetails =  conn.model('userdetails',UserDetailSchema);



          
            var adminSchema = mongoose.Schema ({
                                       adminid:String,
                                        password:String,
   
                                  },{collection:'admindata'});
//admin


            var admininsert = mongoose.model('admininsert',adminSchema);


            router.post('/markpresence',function(req,res){
                                     var userat = req.body
                                     userdetails.findById(userat._id, function(err,userattendanceindb)
                                     {
                                             userattendanceindb = userat;
                                             userdetail.save(function(err)
                                             {
                                                      if(err)
                                                      {

                                                        res.send({"message":"no"});
                                                        throw err;

                                                      }
                                                      else
                                                      {
                                                        res.send({"message":"yes"});
                                                      }
                                             })
                                     })


                                      console.log(req.body);
                                      
                                                            });

            router.post('/getadmin', (req,res)=>{
             
          var trysigninadmin = req.body;
          console.log(trysigninadmin); 

          admininsert.findOne({'adminid' :trysigninadmin.adminid} , 'adminid password' , function(err, admin){
                if(err)
                {
                  console.log(err);
                }
              
               if(admin)
               {if((admin.adminid==trysigninadmin.adminid)&&(admin.password==trysigninadmin.password))
                   {
       
                      res.send(admin);
                   }
                }   
              else
                  {
                    
                    res.send(JSON.parse('{"message":"wrong"}'));
                  }
                }

                                                                                              );

  
                                                   });



  
router.post('/putenrollmentdetails',function(req,res){

  edetails = req.body;
  console.log(edetails);
  var newdetail = new enrollmentdetail;
  newdetail.EmpNo = edetails.eid;
  newdetail.Name = edetails.name;
  newdetail.Course = edetails.CourseName;
  newdetail.Feedback = "";
  newdetail.save();
  res.send({"message":"Enrolled"});
});  
  




router.post('/postposters', upload.single('file'), function(req,res){
  console.log(JSON.stringify(req.file));
   /*const eventpostersbucket = new mongoose.mongo.GridFSBucket(conn.db,{bucketName:'EventPosters'});
    if (!req.file) {
        console.log("No file received");
        return res.send({
          message:"wrong"
        });
    
      } else {
        console.log('file received');
        return res.send({
          message:"yes"
        })
      }
let filename = req.file.name;
streamifier.createReadStream(req.file.data).
        pipe(eventpostersbucket.openUploadStream(filename)).
        on('error', function (error) {
            assert.ifError(error);
        }).
        on('finish', function () {
            console.log('done!');
            res.status(200).json({
                success: true,
                msg: 'File Uploaded successfully..'
            });
        });*/


        conn.collection("Posters").insertOne(req.file), function(err)
        {
          if(err)
          {
            console.log(err);
          }
        }
    })

router.post('/submitfeedback',function(req,res){



 })





router.post('/getposters',function(req,res)
{ 
  conn.collection("Posters").find(function(err,posters){
    console.log(posters);
  })
});



router.post('/checkenrollment',function(req,res)
{
  conn.collection("enrollment").find({}).toArray(function(error, documents) {
    if (error) throw error;

    res.send(documents);
});
})





   router.post('/getusers', (req,res)=>{
           
   userdetails.find(function(err,docs){
    if(err)
    {
      console.log(err);
      res.send({"message":"wrong"});
    }
    else if(docs.length)
      {
         console.log("These are the docs");
         console.log(docs);
         res.json(docs);
      }

      else
      {
        console.log({"message":"wrong-not found"});
      }
   });


   });














  
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
  newuser.close();

  }
  
  else
  {
    res.send(JSON.parse('{"message":"m"}'));
  }
});

 });










  


   router.post('/getuser', (req,res)=>{
    var trysignin = req.body;
    

    userinsert.findOne({'name' :trysignin.name} , 'name password email eid pn' , function(err, user1){
      if(user1){
        if((user1.name==trysignin.name)&&(user1.password==trysignin.password))
      {
       
        res.send(user1);
      }
    }
      else
      {
        res.send(JSON.parse('{"message":"wrong"}'));
      }

    } );

  
   });

router.post('/putevents',(req,res)=>{
  var events = req.body;
  console.log("events are geting posted");
  console.log(req.body);
  conn.collection("events").deleteMany({}).then
  (conn.collection("events").insertMany(req.body));

  res.send({"message":"yes"});



});

router.post('/getevents',(req, res)=>{
      console.log("Post request received");
      
      calendarevents.find({},function(err,doc){
        if(err){
             console.log(err);
                }
          else if(!(doc.length))
          {
                console.log("No docs found");
          }
          else
          {
            console.log("These are the docs for events");
            console.log(doc);
            res.send(doc);
          }
      })




});



  


module.exports = mongoose.model('events', EventSchema);

module.exports = router;
