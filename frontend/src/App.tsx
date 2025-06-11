import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import StudentCreatePage from "./pages/StudentCreatePage";
import StudentEditPage from "./pages/StudentEditPage";
import StudentDetailPage from "./pages/StudentDetailPage";
import SubjectListPage from "./pages/SubjectListPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/create" element={<StudentCreatePage />} />
      <Route path="/edit/:id" element={<StudentEditPage />} />
      <Route path="/students/:id" element={<StudentDetailPage />} />
      <Route path="/subjects" element={<SubjectListPage />} />
    </Routes>
  );
}
export default App;
