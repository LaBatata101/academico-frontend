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

export const List = ({
    column_headers,
    children,
}: {
    column_headers: React.ReactNode[];
    children: React.ReactNode;
}) => {
    return (
        <TableContainer component={Paper} sx={{ mt: 1 }}>
            <Table sx={{ minWidth: 650 }}>
                <TableHead>{column_headers}</TableHead>
                <TableBody>{children}</TableBody>
            </Table>
        </TableContainer>
    );
};

export const ListItem = ({
    onEdit,
    onDelete,
    children,
    object,
}: {
    children: React.ReactNode;
    object: any;
    onEdit: () => void;
    onDelete: () => void;
}) => {
    return (
        <TableRow>
            {children}
            <TableCell align="center">
                <Tooltip title={<Typography fontSize={14}>Editar</Typography>} arrow>
                    <IconButton color="info" onClick={onEdit}>
                        <EditIcon />
                    </IconButton>
                </Tooltip>
                <Tooltip title={<Typography fontSize={14}>Deletar</Typography>} arrow>
                    <IconButton color="error" onClick={onDelete}>
                        <DeleteIcon />
                    </IconButton>
                </Tooltip>
            </TableCell>
        </TableRow>
    );
};
