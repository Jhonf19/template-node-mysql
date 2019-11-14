const express = require('express');
const morgan = require('morgan');
const path = require('path');
const flash = require('connect-flash');
const exphbs = require('express-handlebars');
const session = require('express-session');
const MySQLStore = require('express-mysql-session');
const passport = require('passport');

const { database } = require('./keys')

//INIT
const app = express();
require('./lib/passport');

//SET
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'))
app.engine('hbs', exphbs({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: 'hbs',
    helpers: require('./lib/hbs')
}));
app.set('view engine', 'hbs');

//MIDDLE
app.use(session({
    secret: 'liyostore',
    resave: false,
    saveUninitialized: false,
    store: new MySQLStore(database)
}))
app.use(flash());
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());

//VARS GLOBAL
app.use((req, res, next) => {
    app.locals.success = req.flash('success');
    app.locals.danger = req.flash('danger');
    app.locals.warning = req.flash('warning');
    app.locals.user = req.user;
    next();
});

//ROUTES
app.use(require('./routes/index'));
app.use('/customers', require('./routes/customers'));
app.use(require('./routes/auth'));


//PUBLICS
app.use(express.static(path.join(__dirname, 'public')))

//SERVER
app.listen(app.get('port'), () => {
    console.log('SERVER on ', app.get('port'));
});