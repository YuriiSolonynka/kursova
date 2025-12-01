import express from 'express';
import protect from '../middleware/auth.js';
import { updateProfile, getProfile } from '../controllers/userController.js';
import multer from 'multer';
import path from 'path';

const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'uploads'),
    filename: (req, file, cb) => cb(null, req.user.id + '-' + Date.now() + path.extname(file.originalname))
});
const upload = multer({ storage });

router.get('/me', protect, getProfile);
router.put('/me', protect, upload.single('avatar'), updateProfile);

export default router;
