import express from 'express';
import { getUserByEmail, insertUser } from './modules/UserModule.js';
import { comparePass, hashPassword } from '../utils/bcryptHelper.js';
const router = express.Router();

router.get("/", (req, res, next) => {
    try {
        res.json({
            status: "success",
            message: "to completed get",
        });
    } catch (error) {

        error.errorCode = 401;
        next(error);
    }
});

router.post("/", async (req, res, next) => {
    try {
        const { password } = req.body

        //hash pass
        req.body.password = hashPassword(password);


        // insert user
        const result = await insertUser(req.body);

        result?._id
            ? res.json({
                status: "success",
                message: "Your account has been created, you may login"
            })
            : res.json({
                status: "error",
                message: "Unable to create an account now, Please contact admin for support",
            });
    } catch (error) {

        if (error.message.includes("E11000 duplicate key error collection")) {
            error.message = "There is another user have this email already exist";
            error.errorCode = 200;
        }
        next(error);
    }
});

router.post("/login", async (req, res, next) => {
    try {
        const { password, email } = req.body

        // check if user exist for the given email
        const result = await getUserByEmail(email)
        // console.log(result)

        if (result?.password) {
            // check if the plain pass and the pass from db, the hashed one, is the same
            const isMatched = comparePass(password, result.password);

            if (isMatched) {
                result.password = undefined;
                return res.json({
                    status: "success",
                    message: "You have successfully logged in",
                    user: result
                })
            }
        }

        res.json({
                status: "error",
                message: "Invalid Login detail",
            });

    } catch (error) {

        if (error.message.includes("E11000 duplicate key error collection")) {
            error.message = "There is another user have this email already exist";
            error.errorCode = 200;
        }
        next(error);
    }
});

router.put("/", (req, res, next) => {
    try {
        res.json({
            status: "success",
            message: "to completed put",
        });
    } catch (error) {

        error.errorCode = 401;
        next(error);
    }
});

router.patch("/", (req, res, next) => {
    try {
        res.json({
            status: "success",
            message: "to completed patch",
        });
    } catch (error) {

        error.errorCode = 401;
        next(error);
    }
});

router.delete("/", (req, res, next) => {
    try {
        res.json({
            status: "success",
            message: "to completed delete",
        });
    } catch (error) {

        error.errorCode = 401;
        next(error);
    }
});

export default router;