const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const dbConfig = require('./src/config/DB');
const app = express();

const PORT = process.env.PORT || 5000
//Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//connection DB

mongoose.Promise = global.Promise;

mongoose.connect(dbConfig.URL, { useUnifiedTopology: true, useNewUrlParser: true }, err => {
    if (!err) {
        console.log('connected to DB IS Ok');
    } else {
        console.log('Error ', JSON.stringify(err));
    }
}
);


app.listen(PORT, () => {
    console.log(`Server has start on port ${PORT}`);
})