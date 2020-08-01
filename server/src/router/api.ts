import { Router } from "express";
import * as bodyParser from "body-parser";
import * as busboy from "connect-busboy";
import { apiError } from "../log/error";
// import { backup } from "../api/gitlab";

const router = Router();

router.use(bodyParser.json({ limit: "50mb" }));
router.use(bodyParser.urlencoded({ limit: "50mb" }));
router.use(busboy());

// router.post("/gitlab/backup", backup);

router.use(apiError);

export { router as apiRouter };
