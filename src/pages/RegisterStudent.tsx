import * as yup from "yup";
import { useFormik } from "formik";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import { Page } from "../components/Page";
import { Button } from "@mui/material";
import { Form, FormItem } from "../components/Form";
import React from "react";

export const RegisterStudentPage = () => {
    const validationSchema = yup.object({
        name: yup.string().required("Nome é obrigatorio"),
        email: yup.string().email("Digite um email valido").required("Email é obrigatorio"),
        password: yup
            .string()
            .min(7, "A senha deve ter no mínimo 7 caracteres")
            .required("Senha é obrigatorio"),
    });

    const formik = useFormik({
        initialValues: {
            name: "",
            email: "",
            password: "",
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            alert(JSON.stringify(values, null, 2));
        },
    });

    return (
        <Page
            header="Cadastrar Aluno"
            button=<Button
                sx={{ flex: "2 2 10%" }}
                variant="contained"
                startIcon={<FormatListBulletedIcon />}
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
                    id="password"
                    label="Senha"
                    type="password"
                    value={formik.values.password}
                    onInputChange={formik.handleChange}
                    error={formik.touched.password && Boolean(formik.errors.password)}
                    helperText={formik.touched.password && formik.errors.password}
                />
            </Form>
        </Page>
    );
};
