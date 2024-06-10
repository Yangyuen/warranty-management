import express from 'express';
import multer from 'multer';
import { addWarranty, deleteWarranty, listWarranty, searchWarranty, updateWarranty } from '../controllers/Controller.js';

const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const upload = multer({ storage: storage });

router.post('/add', upload.fields([{ name: 'prFile' }, { name: 'poFile' }]), addWarranty);
router.get('/list', listWarranty)
router.put('/:id', upload.fields([{ name: 'prFile' }, { name: 'poFile' }]), updateWarranty);
router.delete('/:id',deleteWarranty)
router.get('/search',searchWarranty)

export default router;
