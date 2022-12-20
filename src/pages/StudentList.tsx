import * as yup from "yup";
import {
    Autocomplete,
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Stack,
    TableCell,
    TextField,
} from "@mui/material";
import { List, ListItem } from "../components/List";
import AddIcon from "@mui/icons-material/Add";
import { Page } from "../components/Page";
import React from "react";
import { getUrl, Student } from "../api";
import axios from "axios";
import { Link } from "react-router-dom";
import InputMask from "react-input-mask";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { formDataReducer } from "../helpers/formdata";
import { useFormik } from "formik";
import { ShowAlert } from "../components/ShowAlert";

export const StudentListPage = () => {
    const [openEditDialog, setOpenEditDialog] = React.useState(false);
    const [openDeleteDialog, setOpenDeleteDialog] = React.useState(false);
    const [student, setStudent] = React.useState<Student>({
        name: "",
        email: "",
        phone: "",
        birthday: new Date(),
        disciplines: [],
    });
    const [students, setStudents] = React.useState([]);
    const handleFetchStudents = React.useCallback(() => {
        axios
            .get(getUrl("/student", "/"))
            .then((result) => setStudents(result.data))
            .catch((error) => console.log(error));
    }, []);

    React.useEffect(() => {
        handleFetchStudents();
    }, [handleFetchStudents]);

    const handleCloseEditDialog = () => setOpenEditDialog(false);
    const handleCloseDeleteDialog = () => setOpenDeleteDialog(false);

    return (
        <>
            <Page
                header="Lista de Alunos"
                button=<Button
                    sx={{ flex: "2 2 10%" }}
                    variant="contained"
                    startIcon={<AddIcon />}
                    component={Link}
                    to="/alunos/cadastrar"
                >
                    Novo Aluno
                </Button>
            >
                <List
                    column_headers={[
                        <TableCell align="left">
                            <strong>Nome do Aluno</strong>
                        </TableCell>,
                        <TableCell align="center">
                            <strong>Ação</strong>
                        </TableCell>,
                    ]}
                >
                    {students.map((student: Student) => (
                        <ListItem
                            object={student}
                            key={student.name}
                            onEdit={() => {
                                setOpenEditDialog(true);
                                setStudent(student);
                            }}
                            onDelete={() => {
                                setOpenDeleteDialog(true);
                                setStudent(student);
                            }}
                        >
                            <TableCell align="left">{student.name}</TableCell>
                        </ListItem>
                    ))}
                </List>
                <EditDialog student={student} open={openEditDialog} close={handleCloseEditDialog} />
            </Page>
            <Dialog open={openDeleteDialog} onClose={handleCloseDeleteDialog}>
                <DialogTitle>Deletar estudante</DialogTitle>
                <DialogContent>Deletando estudante! {student.name}</DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDeleteDialog}>Cancelar</Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

const validationSchema = yup.object().shape({
    name: yup
        .string()
        .required("Nome é obrigatorio")
        .matches(/^([^0-9]*)$/, "Somente caracteres são válidos"),
    email: yup.string().email("Digite um email valido").required("Email é obrigatorio"),
    password: yup
        .string()
        .min(7, "A senha deve ter no mínimo 7 caracteres")
        .required("Senha é obrigatorio"),
    birthday: yup.date().required("Data do nascimento é obrigatorio"),
    phone: yup
        .string()
        .min(9, "O número máximo de caracteres do telefone é 9")
        .test(`test-phone-number`, "Numero de telefone invalído", function (value) {
            return value?.match(/\([0-9]{2}\)[0-9]{9}|[0-9]{9}/) !== null;
        })
        .required("Numero de telefone é obrigatorio"),
});

const EditDialog = ({
    student,
    open,
    close,
}: {
    student: Student;
    open: boolean;
    close: () => void;
}) => {
    const [disciplines, setDisciplines] = React.useState(student.disciplines);
    const [studentEditStatus, dispatchStudent] = React.useReducer(formDataReducer, {
        isSuccess: false,
        isError: false,
    });

    React.useEffect(() => {
        axios
            .get(getUrl("/discipline", "/"))
            .then((result) => setDisciplines(result.data))
            .catch((error) => console.log(error));
    }, []);

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            name: student.name,
            email: student.email,
            birthday: student.birthday,
            password: "",
            phone: student.phone,
            disciplines: student.disciplines,
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            console.log("SENDING");
            dispatchStudent({ type: "FORM_DATA_RESET_STATE" });
            axios
                .patch(getUrl("/student", "/"), {
                    name: values.name,
                    email: values.email,
                    password: values.password,
                    birthday: values.birthday,
                    phone: values.phone,
                    disciplines: values.disciplines,
                })
                .then(() => dispatchStudent({ type: "FORM_DATA_POST_SUCCESS" }))
                .catch(() => dispatchStudent({ type: "FORM_DATA_POST_FAILURE" }));
        },
    });

    return (
        <Dialog open={open} onClose={close}>
            <DialogTitle>Editar estudante</DialogTitle>
            <DialogContent dividers>
                <Box id="edit-form" component="form" onSubmit={formik.handleSubmit}>
                    <Stack spacing={1}>
                        <TextField
                            fullWidth
                            label="Nome do Aluno"
                            value={formik.values.name}
                            onChange={formik.handleChange}
                            error={formik.touched.name && Boolean(formik.errors.name)}
                            helperText={formik.touched.name && formik.errors.name}
                        />
                        <TextField
                            fullWidth
                            label="Email do Aluno"
                            type="email"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            error={formik.touched.email && Boolean(formik.errors.email)}
                            helperText={formik.touched.email && formik.errors.email}
                        />
                        <InputMask
                            mask="(99) 99999-9999"
                            maskPlaceholder={null}
                            value={formik.values.phone}
                            onChange={formik.handleChange}
                        >
                            <TextField
                                label="Numero de Telefone"
                                error={formik.touched.phone && Boolean(formik.errors.phone)}
                                helperText={formik.touched.phone && formik.errors.phone}
                            />
                        </InputMask>
                        <LocalizationProvider dateAdapter={AdapterMoment}>
                            <DesktopDatePicker
                                label="Data do Nascimento"
                                inputFormat="DD/MM/YYYY"
                                value={formik.values.birthday}
                                onChange={(value) => formik.setFieldValue("birthday", value, true)}
                                renderInput={(params) => <TextField {...params} />}
                            />
                        </LocalizationProvider>
                        <TextField fullWidth label="Nova Senha" type="password" />

                        <Autocomplete
                            multiple
                            options={disciplines}
                            defaultValue={student.disciplines}
                            onChange={(_, values) => {
                                formik.setFieldValue("disciplines", values, true);
                            }}
                            getOptionLabel={(option: { name: string }) => option.name}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="Disciplinas"
                                    error={
                                        formik.touched.disciplines &&
                                        Boolean(formik.errors.disciplines)
                                    }
                                />
                            )}
                            isOptionEqualToValue={(option, value) => option.name === value.name}
                            noOptionsText="Sem disciplinas"
                        />
                    </Stack>
                </Box>
            </DialogContent>

            <DialogActions>
                <Button onClick={close}>Cancelar</Button>
                <Button color="success" variant="contained" type="submit" form="edit-form">
                    Salvar
                </Button>
            </DialogActions>

            {studentEditStatus.isSuccess && (
                <ShowAlert
                    severity="success"
                    message={"Alterações salvas com sucesso!"}
                    milliseconds={5000}
                />
            )}

            {studentEditStatus.isError && (
                <ShowAlert
                    severity="error"
                    message={"Houve um erro ao salvar as alterações!"}
                    milliseconds={5000}
                />
            )}
        </Dialog>
    );
};
