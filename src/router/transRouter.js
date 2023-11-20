import express from 'express';

import { insertTrans } from './modules/TransModule.js';
import { userAuth } from '../middleware/authMiddleware.js';

const router = express.Router();

// router.get("/", async (req, res)=>{
//     const budgetList = await getBudget();
//     res.json({
//         status: "success",
//         message: "Your Transactions",
//         budgetList,
//     });
// });

router.post("/", userAuth, async (req, res)=>{
    console.log(req.body)

    const result = await insertTrans({...req.body, userId: req.userId });

    result?._id
    ? res.json({
        status: "success",
        message: "The transaction has been added",
    })
    : res.json({
        status: "Error",
        message: "Error can't add the transaction",
    })
});

export default router;