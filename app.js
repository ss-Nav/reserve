const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const redis = require('redis');

process.env['REDISCACHEHOSTNAME']='Reserve.redis.cache.windows.net';
process.env['REDISCACHEKEY']='CuXrxyeDtPr80qkwgCUFhOvHWBbyyb+IVcSrrTKlbBs=';
// set REDISCACHEKEY=CuXrxyeDtPr80qkwgCUFhOvHWBbyyb+IVcSrrTKlbBs=;

// Create Redis Client
// let client = redis.createClient();
let client = redis.createClient(6380, process.env.REDISCACHEHOSTNAME,
    {auth_pass: process.env.REDISCACHEKEY, tls: {servername: process.env.REDISCACHEHOSTNAME}});

client.on('connect', function(){
  console.log('Connected to Redis');
});

// Set Port
const port = 5000;

// Init app
const app = express();

// View Engine
app.engine('handlebars', exphbs({defaultLayout:'main'}));
app.set('view engine', 'handlebars');

// body-Parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

// methodOverride
app.use(methodOverride('_method'));

// Home Page
app.get('/', function(req, res, next){
  client.set("51", "koichi" );
  res.render('searchreserve');
});

// Check processing
app.post('/reserve/check', function(req, res, next){
  let id = req.body.id;
  client.get(id, function(err, obj){
    if(!obj){
      res.render('searchreserve',{
        error: 'Staff not exist'
      });
    }
    else{
      obj.id = id;
      res.render('reservedetails',{
        user: obj
      });
    }
  });

});

app.listen(port, function(){
  console.log('Server started on port '+port);
});
