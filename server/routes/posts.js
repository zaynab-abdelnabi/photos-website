const express = require('express');
const router = express.Router();
const controller = require('../controllers/postController');
const middlewares = require('../middlewares/authMiddleware');
const path = require('path');

const multer = require('multer');

const storage = multer.diskStorage({
    destination: 'public/uploads/',
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
})

const upload = multer({
    limits: {fieldSize: 1024 * 1024},
    storage: storage,
    fileFilter: (req, file, cb) => {
        let fileTypes = /jpeg|jpg|png/;
        let mimeType = fileTypes.test(file.mimetype);
        let extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
        if(mimeType && extname) return cb(null, true);
        cb(new Error('قم بتحميل صورة أخرى'))
    }
});

router.post('/',[ middlewares.authenticated, upload.single('photo')], controller.createPost);
router.get('/', controller.list);
router.get('/:id', controller.details);
router.put('/:id', [ middlewares.authenticated, upload.single('photo')], controller.update );
router.delete('/:id', middlewares.authenticated, controller.delete);

module.exports = router;