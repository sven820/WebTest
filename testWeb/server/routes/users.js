import express from 'express'
var router = express.Router();

import user from '../controller/user/user'

/* GET users listing. */
router.get('/user', function(req, res, next) {
    res.render('user', { title: 'jxf' });
});

export default router
