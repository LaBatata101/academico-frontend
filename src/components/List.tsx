import {
    IconButton,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Tooltip,
    Typography,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import React from "react";
import { Student } from "../api";

export const StudentList = ({ children }: { children: React.ReactNode }) => {
    return (
        <TableContainer component={Paper} sx={{ mt: 1 }}>
            <Table sx={{ minWidth: 650 }}>
                <TableHead>
                    <TableCell>#</TableCell>
                    <TableCell align="left">Nome do Aluno</TableCell>
                    <TableCell align="center">Ação</TableCell>
                </TableHead>
                <TableBody>{children}</TableBody>
            </Table>
        </TableContainer>
    );
};

export const StudentListItem = ({
    student,
    onEdit,
    onDelete,
}: {
    student: Student;
    onEdit: (student: Student) => void;
    onDelete: (student: Student) => void;
}) => {
    return (
        <TableRow>
            <TableCell>0</TableCell>
            <TableCell align="left">{student.name}</TableCell>
            <TableCell align="center">
                <Tooltip title={<Typography fontSize={14}>Editar</Typography>} arrow>
                    <IconButton color="info" onClick={() => onEdit(student)}>
                        <EditIcon />
                    </IconButton>
                </Tooltip>
                <Tooltip title={<Typography fontSize={14}>Deletar</Typography>} arrow>
                    <IconButton color="error" onClick={() => onDelete(student)}>
                        <DeleteIcon />
                    </IconButton>
                </Tooltip>
            </TableCell>
        </TableRow>
    );
};
