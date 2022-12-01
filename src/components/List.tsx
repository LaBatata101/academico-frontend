import {
    IconButton,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    Tooltip,
    Typography,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

export const StudentList = ({ children }: { children: React.ReactNode }) => {
    return (
        <TableContainer component={Paper} sx={{ mt: 1 }}>
            <Table sx={{ minWidth: 650 }}>
                <TableHead>
                    <TableCell>#</TableCell>
                    <TableCell align="right">Nome do Aluno</TableCell>
                    <TableCell align="center">Ação</TableCell>
                </TableHead>
                <TableBody>{children}</TableBody>
            </Table>
        </TableContainer>
    );
};

export const StudentListItem = () => {
    return (
        <>
            <TableCell>0</TableCell>
            <TableCell align="right">RENAN</TableCell>
            <TableCell align="center">
                <Tooltip title={<Typography fontSize={14}>Editar</Typography>} arrow>
                    <IconButton color="info">
                        <EditIcon />
                    </IconButton>
                </Tooltip>
                <Tooltip title={<Typography fontSize={14}>Deletar</Typography>} arrow>
                    <IconButton color="error">
                        <DeleteIcon />
                    </IconButton>
                </Tooltip>
            </TableCell>
        </>
    );
};
