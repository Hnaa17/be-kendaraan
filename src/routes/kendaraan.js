const express = require('express');
const router = express.Router();
const {insertVehicle, getSearch, getAll, getDetail, updateData, deleteData} = require('../controller/kendaraan');

router
    .get('/', getAll)
    .get('/detail/:no_reg', getDetail)
    .post('/search', getSearch)
    .post('/create', insertVehicle)
    .put('/update/:no_reg', updateData)
    .delete('/:no_reg', deleteData);

module.exports = router