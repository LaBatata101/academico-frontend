import "./App.css";
import { AppBar, Box, CssBaseline, Toolbar, Typography } from "@mui/material";
import { Outlet } from "react-router-dom";
import { SideMenu } from "./components/SideMenu";
import AddIcon from "@mui/icons-material/Add";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import React from "react";
import { StudentIcon } from "./icons/StudentIcon";
import { TeacherIcon } from "./icons/TeacherIcon";
import { DisciplineIcon } from "./icons/DisciplineIcon";

function App() {
    const menu_items = [
        {
            label: "Listar",
            icon: <FormatListBulletedIcon />,
            submenus: [
                {
                    label: "Aluno",
                    href: "alunos/listar",
                    icon: <StudentIcon />,
                },
                {
                    label: "Professor",
                    href: "professor/listar",
                    icon: <TeacherIcon />,
                },
            ],
        },
        {
            label: "Cadastrar",
            icon: <AddIcon />,
            submenus: [
                {
                    label: "Aluno",
                    href: "alunos/cadastrar",
                    icon: <StudentIcon />,
                },
                {
                    label: "Professor",
                    href: "professor/cadastrar",
                    icon: <TeacherIcon />,
                },
                {
                    label: "Disciplina",
                    href: "disciplina/cadastrar",
                    icon: <DisciplineIcon />,
                },
            ],
        },
    ];

    return (
        <Box sx={{ display: "flex" }}>
            <CssBaseline />
            <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
                <Toolbar>
                    <Typography variant="h5" noWrap component="div">
                        Academico
                    </Typography>
                </Toolbar>
            </AppBar>
            <SideMenu menu_items={menu_items} />
            <Box component="main" sx={{ flex: 1 }}>
                <Toolbar />
                <Outlet />
            </Box>
        </Box>
    );
}

export default App;
