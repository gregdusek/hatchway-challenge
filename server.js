//===============================
//          DEPENDENCIES
//===============================
require('dotenv').config();
const express = require('express');
const methodOverride = require('method-override');
const app = express();

//===============================
//             PORT
//===============================
//Allows use of Heroku's port or localhost's port
const PORT = process.env.PORT || 3001;

//===============================
//           MIDDLEWARE
//===============================

//use public folder for static assests
app.use(express.static('public'));

//populates req.body with parsed info from forms - if no data from forms will return an empty object {}
app.use(express.urlencoded({ extended: false })); //extended false - does not allow nested objects in query strings
app.use(express.json()); // returns middleware that only parses JSON - may or may not need it depending on your project
app.use(methodOverride('_method')); //allow POST, PUT and DELETE from a form

//===============================
//            ROUTES
//===============================
app.get('/', (req, res) => {
    res.send({success: true});
});



//LISTENING
app.listen(PORT, () => {
    console.log(`I'm listening on port ${PORT}`);
});
