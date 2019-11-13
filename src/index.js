const express = require('express');
const morgan = require('morgan');
const path = require('path');
const exphbs = require('express-handlebars');


//INIT
const app = express();

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
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.json())

//VARS GLOBAL
app.use((req, res, next) => {

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