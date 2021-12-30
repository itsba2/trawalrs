import { Router } from 'express';

import { addNewWalr, getWalrs, deleteWalr } from '../controllers/walrs.js';

const router = Router();

router.post('/', addNewWalr);
router.get('/', getWalrs);
router.delete('/:id', deleteWalr);

export default router;
