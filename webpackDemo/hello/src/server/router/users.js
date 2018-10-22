import express from 'express'
var router = express.Router();

import user from '../controller/user/user'

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.render('index');
});
router.get('/detail', function(req, res, next) {
    res.render('index');
});

export default router
