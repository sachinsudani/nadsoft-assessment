import { Router } from "express";
import { addStudent } from "../../../services/student/v1/add.student.service";
import { getStudent } from "../../../services/student/v1/get.student.service";
import { listStudent } from "../../../services/student/v1/list.student.service";

const studentRouter: Router = Router();

studentRouter.route("/").post(addStudent);
studentRouter.route("/").get(listStudent);
studentRouter.route("/:id").get(getStudent);

export default studentRouter;