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
    let { city } = req.body

    await helper.fetch(city).then(data => {
        return res.json({ message: data });
    })
}


module.exports = weatherCtrl;