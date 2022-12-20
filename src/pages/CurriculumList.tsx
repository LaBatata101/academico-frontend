import { Button, TableCell } from "@mui/material";
import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";
import { Curriculum, getUrl } from "../api";
import { Page } from "../components/Page";
import AddIcon from "@mui/icons-material/Add";
import { List, ListItem } from "../components/List";

export const CurriculumListPage = () => {
    const [curriculums, setCurriculums] = React.useState([]);
    const handleFetchCurriculums = React.useCallback(() => {
        axios
            .get(getUrl("/curriculum", "/"))
            .then((result) => setCurriculums(result.data))
            .catch((error) => console.log(error));
    }, []);

    React.useEffect(() => {
        handleFetchCurriculums();
    }, [handleFetchCurriculums]);

    return (
        <>
            <Page
                header="Lista de Matrizes Curriculares"
                button=<Button
                    sx={{ flex: "2 2 30%" }}
                    variant="contained"
                    startIcon={<AddIcon />}
                    component={Link}
                    to="/matriz-curricular/cadastrar"
                >
                    Nova Matriz Curricular
                </Button>
            >
                <List
                    column_headers={[
                        <TableCell align="left">
                            <strong>Nome da Matriz Curricular</strong>
                        </TableCell>,
                        <TableCell align="left">
                            <strong>Data</strong>
                        </TableCell>,
                        <TableCell align="center">
                            <strong>Ação</strong>
                        </TableCell>,
                    ]}
                >
                    {curriculums.map((curriculum: Curriculum) => (
                        <ListItem
                            object={curriculum}
                            key={curriculum.name}
                            onEdit={() => {}}
                            onDelete={() => {}}
                        >
                            <TableCell align="left">{curriculum.name}</TableCell>
                            <TableCell align="left">{curriculum.date.toString()}</TableCell>
                        </ListItem>
                    ))}
                </List>
            </Page>
        </>
    );
};
