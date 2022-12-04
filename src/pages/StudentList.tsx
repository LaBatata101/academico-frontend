import { Button } from "@mui/material";
import { StudentList, StudentListItem } from "../components/List";
import AddIcon from "@mui/icons-material/Add";
import { Page } from "../components/Page";
import React from "react";
import { getUrl, Student } from "../api";
import axios from "axios";
import { Link } from "react-router-dom";

export const StudentListPage = () => {
    const [students, setStudents] = React.useState([]);
    const handleFetchStudents = React.useCallback(() => {
        axios
            .get(getUrl("/student", "/"))
            .then((result) => setStudents(result.data))
            .catch((error) => console.log(error));
    }, []);

    React.useEffect(() => {
        handleFetchStudents();
    }, [handleFetchStudents]);

    return (
        <>
            <Page
                header="Lista de Alunos"
                button=<Button
                    sx={{ flex: "2 2 10%" }}
                    variant="contained"
                    startIcon={<AddIcon />}
                    component={Link}
                    to="/alunos/cadastrar"
                >
                    Novo Aluno
                </Button>
            >
                <StudentList>
                    {students.map((student: Student) => (
                        <StudentListItem
                            key={student.name}
                            student={student}
                            onEdit={(student) => {
                                console.log(JSON.stringify(student));
                            }}
                            onDelete={(student) => {
                                console.log(JSON.stringify(student));
                            }}
                        />
                    ))}
                </StudentList>
            </Page>
        </>
    );
};
