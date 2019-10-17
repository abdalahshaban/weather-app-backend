const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const dbConfig = require('./src/config/DB');
const fetch = require('./src/helpers/fetchData')
const path = require('path')
const app = express();

const PORT = process.env.PORT || 5000
//Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'src', 'public')))

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, 'src', 'public/index.html'))
});

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
const city = require('./src/helpers/cities')

setInterval(() => {
    city.city.forEach(element => {
        fetch.fetch(element.name)
    });
}, 3000 * 60 * 60);



const getWeatherRouter = require('./src/routes/getWeather');

app.use('/api', getWeatherRouter)


app.listen(PORT, () => {
    console.log(`Server has start on port ${PORT}`);
})