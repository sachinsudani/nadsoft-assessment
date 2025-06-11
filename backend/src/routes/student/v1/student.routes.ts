import { Router } from "express";
import { addStudent } from "../../../services/student/v1/add.student.service";
import { deleteStudent } from "../../../services/student/v1/delete.student.service";
import { getStudentById } from "../../../services/student/v1/get.student.service";
import { listStudents } from "../../../services/student/v1/list.student.service";
import { updateStudent } from "../../../services/student/v1/update.student.service";

const studentRouter: Router = Router();

studentRouter.route("/").post(addStudent);
studentRouter.route("/").get(listStudents);
studentRouter.route("/:id").get(getStudentById);
studentRouter.route("/:id").put(updateStudent);
studentRouter.route("/:id").delete(deleteStudent);

export default studentRouter;