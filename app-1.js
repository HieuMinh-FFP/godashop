const express = require('express');// import modul
require('dotenv').config();
const app = express();
// moi them
const bodyParser = require('body-parser');
const session = require('express-session');
// phan them
const hostname = '127.0.0.1'
const port = 80;
// const ejsLayout = require('express-ejs-layouts');
const ejsLayout= require('express-ejs-layouts');
const path = require('path');
//chi dinh thu vien layout
app.use(ejsLayout);

// improt
const helpers = require('./utils/helpers');
app.locals.helpers = helpers;
// dung engine
app.set('views','./views');
// chi dinh view engine
app.set('view engine','ejs');

// dat truoc use rooter
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(session({
  secret: 'con ga dang an thoc',
  resave: false,
  saveUninitialized: true,
  // cookie: { secure: true }
}))

// require student
const honeRouter = require('./routers/IndexRouter');
//middleware
// tham số của middleware là 1 callback function
// ở dây callback function là 1 arrow function
app.use((req, res, next)=>{
  console.log('convit');
  next();
});
// console.log(path.join(__dirname,'public'));
// de gan css public
// chi dinh thu muc public chua file
// chi dinh thu muc khi sai css, htmk
app.use(express.static(path.join(__dirname,'public')))


app.use('/', honeRouter);
// app.use('/admin', adminRouter);



console.log(process.env.DB_NAME);
app.listen(port, hostname,() => {
  console.log(`Example app listening on port ${port}`)
  // console.log(session)
  console.log('bb');
});
