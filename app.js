const express = require('express');
const app = express();
app.use(express.json());

require('dotenv').config();

const usersRoute = require('./routes/users');
app.use(usersRoute);


app.use((err, req, res, next) => {
    if(err.statusCode) {
        res.status(err.statusCode).send(err.message);
    } else {
        console.log(err);
        res.status(500).send('Something unexpected happened')
    }
})

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server Started`);
});