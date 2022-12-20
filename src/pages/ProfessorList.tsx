import { Button, TableCell } from "@mui/material";
import { Link } from "react-router-dom";
import { Page } from "../components/Page";
import AddIcon from "@mui/icons-material/Add";
import { List, ListItem } from "../components/List";
import axios from "axios";
import { getUrl, Professor } from "../api";
import React from "react";

export const ProfessorListPage = () => {
    const [professors, setProfessors] = React.useState([]);
    const handleFetchProfessors = React.useCallback(() => {
        axios
            .get(getUrl("/professor", "/"))
            .then((result) => setProfessors(result.data))
            .catch((error) => console.log(error));
    }, []);

    React.useEffect(() => {
        handleFetchProfessors();
    }, [handleFetchProfessors]);

    return (
        <>
            <Page
                header="Lista de Professores"
                button=<Button
                    sx={{ flex: "2 2 20%" }}
                    variant="contained"
                    startIcon={<AddIcon />}
                    component={Link}
                    to="/professor/cadastrar"
                >
                    Novo Professor
                </Button>
            >
                <List
                    column_headers={[
                        <TableCell align="left">
                            <strong>Nome do Professor</strong>
                        </TableCell>,
                        <TableCell align="center">
                            <strong>Ação</strong>
                        </TableCell>,
                    ]}
                >
                    {professors.map((professor: Professor) => (
                        <ListItem
                            object={professor}
                            key={professor.name}
                            onEdit={() => {}}
                            onDelete={() => {}}
                        >
                            <TableCell align="left">{professor.name}</TableCell>
                        </ListItem>
                    ))}
                </List>
            </Page>
        </>
    );
};
