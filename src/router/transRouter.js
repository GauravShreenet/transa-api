import express from 'express';

import { deleteTrans, getUserTrans, insertTrans } from './models/TransModule.js';
import { userAuth } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get("/", userAuth, async (req, res, next)=>{
    try {
        const transList = await getUserTrans(req.userId);
        res.json({
            status: "success",
            message: "Here are the list",
            transList,
        })
    } catch (error) {
        next(error)
    }
});

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

router.delete("/", async (req, res)=> {
    const data = req.body;
    
    const result = await deleteTrans(data);

    result?.deletedCount
    ? res.json({
        status: "success",
        message: "The Transaction has been deleted",
    })
    : res.json({
        status: "error",
        message: "Error try again",
    })
})

export default router;