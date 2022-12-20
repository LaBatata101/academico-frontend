import { Button, TableCell } from "@mui/material";
import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";
import { Discipline, getUrl } from "../api";
import { Page } from "../components/Page";
import AddIcon from "@mui/icons-material/Add";
import { List, ListItem } from "../components/List";

export const DisciplinesListPage = () => {
    const [disciplines, setDisciplines] = React.useState([]);
    const handleFetchStudents = React.useCallback(() => {
        axios
            .get(getUrl("/discipline", "/"))
            .then((result) => setDisciplines(result.data))
            .catch((error) => console.log(error));
    }, []);

    React.useEffect(() => {
        handleFetchStudents();
    }, [handleFetchStudents]);

    return (
        <>
            <Page
                header="Lista de Disciplinas"
                button=<Button
                    sx={{ flex: "2 2 20%" }}
                    variant="contained"
                    startIcon={<AddIcon />}
                    component={Link}
                    to="/disciplina/cadastrar"
                >
                    Nova Disciplina
                </Button>
            >
                <List
                    column_headers={[
                        <TableCell align="left">
                            <strong>Nome da Disciplina</strong>
                        </TableCell>,
                        <TableCell align="left">
                            <strong>Carga horária</strong>
                        </TableCell>,
                        <TableCell align="center">
                            <strong>Ação</strong>
                        </TableCell>,
                    ]}
                >
                    {disciplines.map((discipline: Discipline) => (
                        <ListItem
                            object={discipline}
                            key={discipline.name}
                            onEdit={() => { }}
                            onDelete={() => { }}
                        >
                            <TableCell align="left">{discipline.name}</TableCell>
                            <TableCell align="left">{discipline.workload}</TableCell>
                        </ListItem>
                    ))}
                </List>
            </Page>
        </>
    );
};
