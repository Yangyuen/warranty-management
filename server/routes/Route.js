import express from 'express';
import multer from 'multer';
import { addWarranty, deleteWarranty, listWarranty, searchWarranty, updateWarranty } from '../controllers/Controller.js';

const router = express.Router();

// Unified storage configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        if (file.fieldname === 'prFile') {
            cb(null, 'pr-files/');
        } else if (file.fieldname === 'poFile') {
            cb(null, 'po-files/');
        } else {
            cb(new Error('Invalid field name'), null);
        }
    },
    filename: (req, file, cb) => {
        const originalname = file.originalname;
        const filename = Buffer.from(originalname, 'latin1').toString('utf8').split('.')[0]; // Get the first 10 characters of the file name
        const extension = originalname.split('.').pop();
        cb(null, `${filename.substring(0, 10)}.${extension}`);
    }
});

const upload = multer({ storage: storage });

// Routes
router.post('/add', upload.fields([
    { name: 'prFile'},
    { name: 'poFile'}
]), addWarranty);

router.get('/list', listWarranty);

router.put('/:id', upload.fields([
    { name: 'prFile'},
    { name: 'poFile'}
]), updateWarranty);

router.delete('/:id', deleteWarranty);

router.get('/search', searchWarranty);

export default router;
