import { Router } from "express";
import { addStudent } from "../../../services/student/v1/add.student.service";

const studentRouter: Router = Router();

studentRouter.route("/").post(addStudent);

export default studentRouter;