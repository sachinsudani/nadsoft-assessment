import { Router } from "express";
import { addStudent } from "../../../services/student/v1/add.student.service";
import { listStudent } from "../../../services/student/v1/list.student.service";

const studentRouter: Router = Router();

studentRouter.route("/").post(addStudent);
studentRouter.route("/").get(listStudent);

export default studentRouter;