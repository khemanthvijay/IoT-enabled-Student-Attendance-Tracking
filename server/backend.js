const mysql = require ("mysql2")
const express = require('express')
const cors = require('cors')
const nodeCron = require("node-cron");
const mqtt = require('mqtt');
const app = express()

const sid = 'ACe21cdc97f7522b24eb0abb8b45ea25d0'
const auth_token = 'bee5b4138217983ed00ed9017d22f153'

const twilio = require('twilio')(sid,auth_token)

app.use(cors());
app.use(express.json());

var manual=false;
var t=0;
var st=0;
var sam;
var hour=["07:20","08:10","09:00","09:50","11:00","11:50","13:30","14:20","15:20","16:10"];
var rfidn=0;
var w=20;//20min
var sts;


const con = mysql.createConnection({
    // host : "localhost",
    // user : "root",
    // password : "password",
    // database: "iot"
    connectionLimit: 10,
    host: process.env.MYSQL_HOST || "localhost",
    user: process.env.MYSQL_USER || "root",
    password: process.env.MYSQL_PASSWORD || "password",
    database: process.env.MYSQL_DATABASE || "iot",
});

con.connect((err)=>{
    if(err) {
        console.log(err);
    } else {
        console.log("connected to database");
       
    }
});

function sch(){
    if(t>10){
        t=st;
        sch();
    }
    var h,m;
    t+=1;
    if(manual!=true){
        h=hour[t-1].slice(0,2);
        m=hour[t-1].slice(3,5);
        console.log(h);
        console.log(m);
    var s = "00"+" "+ m+" "+ h+" "+"* * *";
    console.log(s);
    nodeCron.schedule(s, () => {//sec min hour 9:20
                timeTab();
    });
   }
}

sch();
function timeTab(){
    let date_ob = new Date();
    const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    let day = weekday[date_ob.getDay()];
    if(day=='Sunday'){
        setTimeout(() => {
            sch();
        t=st;
        }, 120*1000);
        
    }
    var time_tab="select ?? as result from time_table where time_table.Day = ?";
    con.query(time_tab,["hour"+t,day],(err,res)=>{
        if(err)throw err;
         hum = res[0].result;
      // console.log(hum); 
      if(hum==""||hum==null)
      {
        sch();
      }
      else{
        if(sam==hum){
            setTimeout(() => {
                tabin(sts,hum);
            }, 60000*w);
        }
        else{
            upd_tab(hum);
        }
        sam=hum;
      }
     })
}

function updAtt(val){
    let date_ob = new Date();
    let a = date_ob.getHours()+":"+date_ob.getMinutes();
    let q="SELECT CASE WHEN input.ID = att.ID THEN 'P'  ELSE 'A'  END AS Dr FROM att left JOIN input ON input.ID =att.ID and intime between ? and ?;"
con.query(q,[hour[t-1],a],(err,result)=>{
    if (err)throw err;
    sts=result;
    //console.log(hour[t-1]);
    //console.log(a);
    tabin(sts,val);
})
}

function tabin(sts,val){
    var r="insert into ?? values(?,?,now())";
    var g=[];
    for(let i=0;i<sts.length;i++)
    {
         g[i]=sts[i].Dr;
   // console.log(sts.length);
    }
    con.query(r,[val,t,g],(err,res)=>{
        if(err)throw err;
        console.log("inserted");
    })
    sch();
    }
function upd_tab(val)
{
    var subj;
    if(val=="oe1"||val=="OE1"||val=="oe-1"||val=="OE-1"){
        subj="oe"
    }
    else if(val=="crs"||val=="CRS")
    {
        subj="crs"
    }
    else if(val=="esd"||val=="ESD")
    {
        subj="esd"
    }
    else if(val=="iotpa"||val=="IOTPA")
    {
        subj="iotpa"
    }
    else if(val=="uhv"||val=="UHV")
    {
        subj="crs"
    }
    else if(val=="adc"||val=="ADC")
    {
        subj="adc"
    }
    else if(val=="pbl2"||val=="PBL2"||val=="pbl-2"||val=="PBL-2")
    {
        subj="pbl"
    }
    else if(val=="dnp"||val=="DNP")
    {
        subj="dnp"
    }
    else if(val=="fc"||val=="FC"||val=="fc1"||val=="FC-1")
    {
        subj="fc"
    }
    else if(val=="fl"||val=="FL")
    {
        subj="fl"
    }
    else if(val=="sac"||val=="SAC")
    {
        subj="sac"
    }
    else if(val=="crs"||val=="CRS")
    {
        subj="crs"
    }
var check = "SELECT count(*) as count FROM information_schema.TABLES WHERE (TABLE_SCHEMA = 'iot') AND (TABLE_NAME = ?)"
con.query(check,[subj],(err,res)=>{
    if(err)throw err;
    //console.log(res)
    var coun=res[0].count;
    if(coun=="1")
    {
        con.query("truncate table input;",(err,res)=>{
            if(err) throw err;
            // console.log(res);
        })
        console.log(coun);
        //rfid_tab();
       // showTab(val);
       setTimeout(upd,60000*w);//20min
        console.log('waiting time is '+(60000*w));
     }
      else if(coun=="0")
     {
     console.log("no table");
     }
    });
    function upd(){
        updAtt(subj);
       }
}


app.post('/enter/attendance', (req, res) => {
    console.log(req.body);
    const id = req.body.id;
    let date_ob = new Date();
    let hours = date_ob.getHours();
    let minutes = date_ob.getMinutes();
    con.query('insert ignore into input (id, rfid,intime)values(?,(select student_details.rfid from student_details where student_details.id =? ),?)', 
    [id,id,hours+":"+minutes], 
    (err, result) => {
        if(err) {
            console.log(err)
        } else {
            res.send("updated");
        }
    });
});

//var rfid = mqtt.connect('mqtt://192.168.239.49:1883');
var rfid = mqtt.connect('mqtt://35.234.254.79:1883')

rfid.on('connect', function() {
    rfid.subscribe('rfid/enter');
    console.log('rfid/enter is subscribed successfully');
});
rfid.on('message', function(topic, message) {
    var rfid = message.toString();
    console.log('data received : '+rfid);
    rfidn=rfid;
    let date_ob = new Date();
    let hours = date_ob.getHours();
    let minutes = date_ob.getMinutes();
    con.query('insert ignore into input (id, rfid,intime)values((select student_details.id from student_details where student_details.rfid =? ),?,?)', 
    [rfid,rfid,hours+":"+minutes], 
    (err, result) => {
        if(err) {
            console.log(err)
        } else {
            console.log('done inserted');
        }
    });
});

app.get('/getattendance/:id/:subject', (req, res) => {
    const id = req.params.id;
    const subject = req.params.subject;
    console.log(subject+' '+id);
    var att = "select * from  (select count(*) as Total from ??) as present ,  (select count(*) as Present from ??    where ??.??='P')as Total;"
    con.query(att,[subject,subject,subject,("I"+id)], (err, result) => {
        if(err) throw err;
        else {
            console.log(result);
            res.send(result);
        }
    })
});

app.get('/settime/:hour/:time',(req,res)=>{
   const h=req.params.hour;
   hour[h]=req.params.time;
    res.send("ok");
})
app.post('/registration/details',(req,res)=>{
    console.log(req.body);
    rfid = req.body.rfid;
    id = req.body.id;
    fName = req.body.fName;
    lName = req.body.lName;
    mobile =req.body.mobile;
    age = req.body.age;
    gender = req.body.gender;
    dept = req.body.dept;
    year = req.body.year;
    var st = " INSERT ignore INTO student_details (id,rfid,fName,lName,mobile,age,gender,department,year) VALUES (?,?,?,?,?,?,?,?,?);"
    con.query(st,[id,rfid,fName,lName,mobile,age,gender,dept,year],(err,res)=>{
        if(err) throw err;
        console.log(res);
    })
});

app.get('/update/timetable/:hour/:day/:subject',(req,res)=>{
    var ut="update time_table set ??= ? where time_table.Day=?"
    const hour = "hour"+req.params.hour;
    const Day = req.params.day;
    const name = req.params.subject;
    con.query(ut,[hour,name,Day],(err,res)=>{
        if(err) throw err;
        console.log(res);
    })
    res.send("ok");
});

app.get('/showtimetable',(req,response)=>{
    con.query('select * from time_table',(err,res)=>{
        if(err) throw err;
        //console.log(res);
        response.send(res);
    })
})
app.get('/get/details/all',(req,response)=>{
    const id =req.params.id;
    con.query('select id,rfid,fName,lName,age,gender,department,year from iot.student_details',(err,res)=>{
        if(err) throw err;
        //console.log(res);
        response.send(res);
    })
})

app.get('/changedelay/:tim',(req,res)=>{
    w=req.params.tim;
    res.send('ok')
})


app.get('/changetim/:id',(req,res)=>{
    const id=req.params.tim;
    if(id==1){
        st=0;
    }
    else if(id==2){
        st=2;
    }
    res.send('ok')
})

app.get('/onoff/:id',(req,res)=>{
    const id=req.params.tim;
    if(id==1){
        manual=false;
    }
    else if(id==2){
        manual=true;
    }
    res.send('ok')
})


app.get('/get/details/:id',(req,response)=>{
    const id =req.params.id;
    con.query('select id,rfid,fName,lName,mobile,age,gender,department,year from iot.student_details where id=?',[id],(err,res)=>{
        if(err) throw err;
        console.log(res);
        response.send(res);
    })
})
app.get('/check/timetable/:hour/:day',(req,response)=>{
    const ch=req.params.hour;
    const day=req.params.day;
    con.query('select ?? as subject from time_table where day=?',["hour"+ch,day],(err,res)=>{
        if(err) throw err;
        //console.log(res);
        response.send(res[0].subject);
    })

})
app.get('/send/rfid',(req,res)=>{
    var data={
        "data":rfidn
    }
    res.send(data);
});

app.listen(5004, () => {
    console.log("Running on port 5004");
});
