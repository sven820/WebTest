
import express from 'express'
const router = express.Router();

import home from '../controller/home/home'

/* GET home page. */
router.get('/home', function(req, res, next) {
    // res.render('home');
    res.render('home', { title: 'home' });
});

export default router
