import * as yup from "yup";
import { useFormik } from "formik";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import { Page } from "../components/Page";
import { Button } from "@mui/material";
import { Form, FormItem } from "../components/Form";
import React from "react";
import { getUrl } from "../api";
import axios from "axios";
import moment from "moment";
import { Link } from "react-router-dom";
import { ShowAlert } from "../components/ShowAlert";

type StudentState = {
    // student: Student;
    isSuccess: boolean;
    isError: boolean;
};

interface StudentCreateSuccessAction {
    type: "STUDENT_CREATE_SUCCESS";
}

interface StudentCreateFailureAction {
    type: "STUDENT_CREATE_FAILURE";
}

interface StudentCreateResetStateAction {
    type: "STUDENT_CREATE_RESET_STATE";
}

type StudentAction =
    | StudentCreateSuccessAction
    | StudentCreateFailureAction
    | StudentCreateResetStateAction;

const studentReducer = (state: StudentState, action: StudentAction) => {
    switch (action.type) {
        case "STUDENT_CREATE_SUCCESS":
            return { ...state, isSuccess: true, isError: false };
        case "STUDENT_CREATE_FAILURE":
            return { ...state, isSuccess: false, isError: true };
        case "STUDENT_CREATE_RESET_STATE":
            return { ...state, isSuccess: false, isError: false };
        default:
            throw new Error();
    }
};

const validationSchema = yup.object({
    name: yup.string().required("Nome é obrigatorio"),
    email: yup.string().email("Digite um email valido").required("Email é obrigatorio"),
    password: yup
        .string()
        .min(7, "A senha deve ter no mínimo 7 caracteres")
        .required("Senha é obrigatorio"),
    birthday: yup
        .date()
        .default(() => {
            console.log("DEFAULT DATE");
            moment().locale("pt-br");
            return new Date(moment().format("L"));
        })
        .required("Data do nascimento é obrigatorio"),
    phone: yup
        .string()
        .test(`test-phone-number`, "Numero de telefone invalído", function (value) {
            // TODO: fix max number
            return value?.match(/\([0-9]{2}\)[0-9]{9}|[0-9]{9}/) !== null;
        })
        .required("Numero de telefone é obrigatorio"),
});

export const RegisterStudentPage = () => {
    const [student, dispatchStudent] = React.useReducer(studentReducer, {
        isSuccess: false,
        isError: false,
    });

    const formik = useFormik({
        initialValues: {
            name: "",
            email: "",
            birthday: "",
            password: "",
            phone: "",
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            dispatchStudent({ type: "STUDENT_CREATE_RESET_STATE" });
            axios
                .post(getUrl("/student", "/new"), {
                    name: values.name,
                    email: values.email,
                    password: values.password,
                    birthday: values.birthday,
                    phone: values.phone,
                    disciplines: [],
                })
                .then(() => dispatchStudent({ type: "STUDENT_CREATE_SUCCESS" }))
                .catch(() => dispatchStudent({ type: "STUDENT_CREATE_FAILURE" }));
        },
    });

    return (
        <Page
            header="Cadastrar Aluno"
            button=<Button
                sx={{ flex: "2 2 10%" }}
                variant="contained"
                startIcon={<FormatListBulletedIcon />}
                component={Link}
                to="/alunos/listar"
            >
                Listar Alunos
            </Button>
        >
            <Form onSubmit={formik.handleSubmit}>
                <FormItem
                    id="name"
                    label="Nome do Aluno"
                    value={formik.values.name}
                    onInputChange={formik.handleChange}
                    error={formik.touched.name && Boolean(formik.errors.name)}
                    helperText={formik.touched.name && formik.errors.name}
                />

                <FormItem
                    id="email"
                    label="Email do Aluno"
                    type="email"
                    value={formik.values.email}
                    onInputChange={formik.handleChange}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helperText={formik.touched.email && formik.errors.email}
                />

                <FormItem
                    id="phone"
                    label="Numero de telefone"
                    value={formik.values.phone}
                    onInputChange={formik.handleChange}
                    error={formik.touched.phone && Boolean(formik.errors.phone)}
                    helperText={formik.touched.phone && formik.errors.phone}
                />

                <FormItem
                    id="birthday"
                    label="Data do nascimento"
                    type="date"
                    value={formik.values.birthday}
                    onInputChange={formik.handleChange}
                    error={formik.touched.birthday && Boolean(formik.errors.birthday)}
                    helperText={formik.touched.birthday && formik.errors.birthday}
                    formik={formik}
                />

                <FormItem
                    id="password"
                    label="Senha"
                    type="password"
                    value={formik.values.password}
                    onInputChange={formik.handleChange}
                    error={formik.touched.password && Boolean(formik.errors.password)}
                    helperText={formik.touched.password && formik.errors.password}
                />
            </Form>

            {student.isSuccess && (
                <ShowAlert
                    severity="success"
                    message={"Estudante cadastrado com sucesso!"}
                    milliseconds={5000}
                />
            )}

            {student.isError && (
                <ShowAlert
                    severity="error"
                    message={"Houve um erro ao cadastrar o estudante!"}
                    milliseconds={5000}
                />
            )}
        </Page>
    );
};
