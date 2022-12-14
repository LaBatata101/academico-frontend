import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { StudentListPage } from "./pages/StudentList";
import { RegisterStudentPage } from "./pages/RegisterStudent";
import { PageNotFound } from "./pages/PageNotFound";
import { RegisterProfessorPage } from "./pages/RegisterProfessor";
import { RegisterDisciplinePage } from "./pages/RegisterDisciplinePage";
import { RegisterCoursePage } from "./pages/RegisterCourse";
import { RegisterClassPage } from "./pages/RegisterClass";
import { RegisterCurriculumPage } from "./pages/RegisterCurriculum";
import { ProfessorListPage } from "./pages/ProfessorList";
import { DisciplinesListPage } from "./pages/DisciplinesList";
import { CoursesListPage } from "./pages/CoursesList";
import { ClassesListPage } from "./pages/ClassesList";
import { CurriculumListPage } from "./pages/CurriculumList";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<App />}>
                    <Route path="alunos">
                        <Route path="listar" element={<StudentListPage />} />
                        <Route path="cadastrar" element={<RegisterStudentPage />} />
                    </Route>
                    <Route path="professor">
                        <Route path="listar" element={<ProfessorListPage />} />
                        <Route path="cadastrar" element={<RegisterProfessorPage />} />
                    </Route>
                    <Route path="disciplina">
                        <Route path="listar" element={<DisciplinesListPage />} />
                        <Route path="cadastrar" element={<RegisterDisciplinePage />} />
                    </Route>
                    <Route path="curso">
                        <Route path="listar" element={<CoursesListPage />} />
                        <Route path="cadastrar" element={<RegisterCoursePage />} />
                    </Route>
                    <Route path="turma">
                        <Route path="listar" element={<ClassesListPage />} />
                        <Route path="cadastrar" element={<RegisterClassPage />} />
                    </Route>
                    <Route path="matriz-curricular">
                        <Route path="listar" element={<CurriculumListPage />} />
                        <Route path="cadastrar" element={<RegisterCurriculumPage />} />
                    </Route>
                </Route>
                <Route path="*" element={<PageNotFound />} />
            </Routes>
        </BrowserRouter>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
