import "./App.css";
import { AppBar, Box, CssBaseline, Toolbar, Typography } from "@mui/material";
import { Outlet } from "react-router-dom";
import { SideMenu } from "./components/SideMenu";
import AddIcon from "@mui/icons-material/Add";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";

function App() {
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
            <SideMenu
                menu_items={[
                    { label: "Listar", href: "alunos/listar", icon: <FormatListBulletedIcon /> },
                    { label: "Cadastrar", href: "alunos/cadastrar", icon: <AddIcon /> },
                ]}
            />
            <Box component="main" sx={{ flex: 1 }}>
                <Toolbar />
                <Outlet />
            </Box>
        </Box>
    );
}

export default App;
