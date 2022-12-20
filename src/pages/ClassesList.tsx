import { Button, TableCell } from "@mui/material";
import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";
import { Class, getUrl } from "../api";
import { Page } from "../components/Page";
import AddIcon from "@mui/icons-material/Add";
import { List, ListItem } from "../components/List";

export const ClassesListPage = () => {
    const [classes, setClasses] = React.useState([]);
    const handleFetchClasses = React.useCallback(() => {
        axios
            .get(getUrl("/class", "/"))
            .then((result) => setClasses(result.data))
            .catch((error) => console.log(error));
    }, []);

    React.useEffect(() => {
        handleFetchClasses();
    }, [handleFetchClasses]);

    return (
        <>
            <Page
                header="Lista de Turmas"
                button=<Button
                    sx={{ flex: "2 2 20%" }}
                    variant="contained"
                    startIcon={<AddIcon />}
                    component={Link}
                    to="/turma/cadastrar"
                >
                    Nova Turma
                </Button>
            >
                <List
                    column_headers={[
                        <TableCell align="left">
                            <strong>Nome da Turma</strong>
                        </TableCell>,
                        <TableCell align="center">
                            <strong>Ação</strong>
                        </TableCell>,
                    ]}
                >
                    {classes.map((clazz: Class) => (
                        <ListItem
                            object={clazz}
                            key={clazz.name}
                            onEdit={() => {}}
                            onDelete={() => {}}
                        >
                            <TableCell align="left">{clazz.name}</TableCell>
                        </ListItem>
                    ))}
                </List>
            </Page>
        </>
    );
};
