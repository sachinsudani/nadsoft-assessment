import { Router } from "express";
import { addMark } from "../../../services/mark/v1/add.mark.service";
import { deleteMark } from "../../../services/mark/v1/delete.mark.service";
import { updateMark } from "../../../services/mark/v1/update.mark.service";

const markRouter: Router = Router();

markRouter.route("/").post(addMark);
markRouter.route("/:id").put(updateMark);
markRouter.route("/:id").delete(deleteMark);

export default markRouter;