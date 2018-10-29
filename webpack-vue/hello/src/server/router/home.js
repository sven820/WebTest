
import express from 'express'
const router = express.Router();

import home from '../controller/home/home'

/* GET home page. */
router.get('/', function(req, res, next) {
    // res.render('home');
    res.render('index');
});
router.get('/detail', function(req, res, next) {
    res.render('index');
});

export default router
