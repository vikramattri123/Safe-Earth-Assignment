var express = require('express');
var student=require('./modules/employee');
const bodyParser=require("body-parser");
var router = express();
router.use('/static',express.static('public'));
router.set('view engine','ejs');
router.set('views','./Public/views');
var urlencodedParser = bodyParser.urlencoded({ extended:false });
const { check, validationResult } = require('express-validator');
var employee=student.find({});
router.get('/home',function(req,res)
  {
    res.render('index_page',{title:"Home Page"});
  })
router.post('/Register',urlencodedParser,function(req,res)
{
var work=new student({
Name:req.body.name,
Username:req.body.uname,
Password:req.body.pass,
Email:req.body.email,
Task_Name:req.body.task,
Project_Name:req.body.Project,
Start_Time:req.body.time1,
End_Time:req.body.time2
});
work.save(function(err,res1){
  if(err) throw err;
  employee.exec(function(err,data)
  {
    if(err)throw err;
    res.render('Login_form',{title:"This is the Record Page"});
  });
  });
// employee.exec(function(err,data)
// {
//   res.render('index');
// })
});
router.post('/Logged_in',urlencodedParser,function(req,res)
{
    var name=req.body.uname;
    var pass=req.body.pass;
    var m=student.find({Username:name,Password:pass});
    m.exec(function(err,data)
{
if(err) throw err;
res.render('Display_data',{title: 'Student Information',records:data});
});
}).listen(9000,console.log("Server is Working on port no 9000"));
module.exports = router;