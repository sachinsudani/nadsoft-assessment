import { Router } from "express";
import { listSubjects } from "../../../services/subject/v1/list.subject.service";

const subjectRouter: Router = Router();

subjectRouter.route("/").get(listSubjects);

export default subjectRouter;