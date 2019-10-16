const weatherCtrl = {};
const axios = require('axios')
const cityModel = require('../models/cityModel')
const dbConfig = require('../config/DB');
const helper = require('../helpers/fetchData')

// fetch(name)
// befor insert 
// check if found 
// is not found insert
// is found update



weatherCtrl.getData = async (req, res) => {
    // console.log(req.body)
    let { city } = req.body
    city = city.charAt(0).toLowerCase() + city.slice(1)

    await helper.fetch(city).then(data => {
        // console.log(data, 'in ctrl');
        return res.json({ message: data });
    })
}


module.exports = weatherCtrl;