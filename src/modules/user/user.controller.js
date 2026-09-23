import { Router } from "express";
import { successResponse } from "../../common/utlis/index.js";
const router = Router()

router.get("/" , (req,res,next)=>{
    return successResponse({res })
})
export default router