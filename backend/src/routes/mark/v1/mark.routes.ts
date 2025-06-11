import { Router } from "express";
import { addMark } from "../../../services/mark/v1/add.mark.service";
import { updateMark } from "../../../services/mark/v1/update.mark.service";

const markRouter: Router = Router();

markRouter.route("/").post(addMark);
markRouter.route("/:id").put(updateMark);

export default markRouter;