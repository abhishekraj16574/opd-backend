import express from "express";
import {bookToken, cancelToken} from "../controllers/tokenController.js";

const router = express.Router();

router.post("/", bookToken);
router.put("/:id/cancel",cancelToken);

export default router;