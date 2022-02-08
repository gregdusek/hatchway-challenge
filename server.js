//DEPENDENCIES
const express = require('express');
const app = express();
//PORT
const PORT = 3000;

//ROUTES
app.get('/greeting', (req, res) => {
    res.send('Hello World');
});

//LISTENING
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
