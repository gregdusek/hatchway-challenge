//===============================
//          DEPENDENCIES
//===============================
require('dotenv').config();
const express = require('express');
const methodOverride = require('method-override');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const axios = require('axios');
const apicache = require('apicache');
const cache = apicache.middleware; //allows requests to be cached
const {getApi, getTags} = require('./controller/controller.js');

//===============================
//             PORT
//===============================
//Allows use of Heroku's port or localhost's port
const PORT = process.env.PORT || 3001;

//===============================
//           MIDDLEWARE
//===============================

//use public folder for static assests
app.use(express.static(path.join(__dirname, 'public')));
//populates req.body with parsed info from forms - if no data from forms will return an empty object {}

app.use(express.urlencoded({ extended: false })); //extended false - does not allow nested objects in query strings
app.use(express.json()); // returns middleware that only parses JSON - may or may not need it depending on your project
app.use(methodOverride('_method')); //allow POST, PUT and DELETE from a form
app.use(bodyParser.json()); // tells the system we want to use JSON
app.use(morgan('dev')); //logs every request to the console

//===============================
//            ROUTES
//===============================
app.get('/api/ping', cache('60 minutes'), getApi);
app.get('/api/posts/:tags/:sortBy?/:direction?', cache('60 minutes'), getTags);



//LISTENING
app.listen(PORT, () => {
    console.log(`I'm listening on port ${PORT}`);
});
