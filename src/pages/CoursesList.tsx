import { Button, TableCell } from "@mui/material";
import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";
import { Course, getUrl } from "../api";
import { Page } from "../components/Page";
import AddIcon from "@mui/icons-material/Add";
import { List, ListItem } from "../components/List";

export const CoursesListPage = () => {
    const [courses, setCourses] = React.useState([]);
    const handleFetchStudents = React.useCallback(() => {
        axios
            .get(getUrl("/course", "/"))
            .then((result) => setCourses(result.data))
            .catch((error) => console.log(error));
    }, []);

    React.useEffect(() => {
        handleFetchStudents();
    }, [handleFetchStudents]);

    return (
        <>
            <Page
                header="Lista de Cursos"
                button=<Button
                    sx={{ flex: "2 2 20%" }}
                    variant="contained"
                    startIcon={<AddIcon />}
                    component={Link}
                    to="/curso/cadastrar"
                >
                    Novo Curso
                </Button>
            >
                <List
                    column_headers={[
                        <TableCell align="left">
                            <strong>Nome do Curso</strong>
                        </TableCell>,
                        <TableCell align="center">
                            <strong>Ação</strong>
                        </TableCell>,
                    ]}
                >
                    {courses.map((course: Course) => (
                        <ListItem
                            object={course}
                            key={course.name}
                            onEdit={() => {}}
                            onDelete={() => {}}
                        >
                            <TableCell align="left">{course.name}</TableCell>
                        </ListItem>
                    ))}
                </List>
            </Page>
        </>
    );
};
