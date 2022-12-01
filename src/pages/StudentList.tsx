import { Button } from "@mui/material";
import { StudentList, StudentListItem } from "../components/List";
import AddIcon from "@mui/icons-material/Add";
import { Page } from "../components/Page";
import React from "react";

export const StudentListPage = () => {
    return (
        <>
            <Page
                header="Lista de Alunos"
                button=<Button sx={{ flex: "2 2 10%" }} variant="contained" startIcon={<AddIcon />}>
                    Novo Aluno
                </Button>
            >
                <StudentList>
                    <StudentListItem />
                </StudentList>
            </Page>
        </>
    );
};
