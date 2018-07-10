const express = require('express');
const path = require('path');
const exphbs  = require('express-handlebars');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');

const app = express();

//Load routes
const ideas = require('./routes/ideas');
const users = require ('./routes/users');

//Passport config 
require('./config/passport')(passport);

// DB config
const db = require('./config/database');

// Map  Global promise
mongoose.Promise = global.Promise;
//Connect to Mongoose
mongoose.connect(db.mongoURI,{
    //useMongoClient: true
    
})
.then(() => console.log('MongoDB Connected ...'))
.catch(err=> console.log(err));

//how middleware works

/*app.use(function(req,res,next){
   // console.log(Date.now());
     req.name='varsha';
    next();
});
*/
//handlebars middleware
app.engine('handlebars', exphbs({
    defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

//BodyParser middleware
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

//static folder
app.use(express.static(path.join(__dirname,'public')));

//method-override middleware
app.use(methodOverride('_method'));

//express session middleware
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true,
    
}));

//Passport middleware
app.use(passport.initialize());
app.use(passport.session());

app.use(flash());


//Global variables
app.use(function(req,res,next){
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    res.locals.user = req.user || null ;
    next();
});

//Index route

app.get('/',(req,res)=>{
    //console.log(req.name);
    var title= 'Welcome!'
    res.render('index',{
        title:title,
    });
    
});

//About route
app.get('/about',(req,res)=>{
    res.render('about');
});










// Use routes

app.use('/ideas',ideas);
app.use('/users',users);


const port = process .env.PORT || 5000;



app.listen(port,() => {
    console.log(`Server started on port ${port}`);
});

