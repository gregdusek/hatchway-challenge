//DEPENDENCIES

const express = require('express');
const app = express();

//PORT
const PORT = 3000;

//ROUTES
app.get('/ping', (req, res) => {
    return res.send({success: true});
});

//LISTENING
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
