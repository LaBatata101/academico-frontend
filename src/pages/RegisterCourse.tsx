import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import { Form, FormItem } from "../components/Form";
import { Page } from "../components/Page";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import { ShowAlert } from "../components/ShowAlert";
import React from "react";
import { formDataReducer } from "../helpers/formdata";
import * as yup from "yup";
import { useFormik } from "formik";
import axios from "axios";
import { getUrl } from "../api";

const validationSchema = yup.object().shape({
    name: yup.string().required("Nome do curso é obrigatorio"),
});

export const RegisterCoursePage = () => {
    const [formData, dispatchFormData] = React.useReducer(formDataReducer, {
        isSuccess: false,
        isError: false,
    });

    const formik = useFormik({
        initialValues: {
            name: "",
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            dispatchFormData({ type: "FORM_DATA_RESET_STATE" });
            axios
                .post(getUrl("/course", "/new"), {
                    name: values.name,
                })
                .then(() => dispatchFormData({ type: "FORM_DATA_POST_SUCCESS" }))
                .catch(() => dispatchFormData({ type: "FORM_DATA_POST_FAILURE" }));
        },
    });

    return (
        <Page
            header="Cadastrar Curso"
            button=<Button
                sx={{ flex: "2 2 20%" }}
                variant="contained"
                startIcon={<FormatListBulletedIcon />}
                component={Link}
                to="/curso/listar"
            >
                Listar Cursos
            </Button>
        >
            <Form onSubmit={formik.handleSubmit}>
                <FormItem
                    id="name"
                    label="Nome do Curso"
                    value={formik.values.name}
                    onInputChange={formik.handleChange}
                    error={formik.touched.name && Boolean(formik.errors.name)}
                    helperText={formik.touched.name && formik.errors.name}
                />
            </Form>

            {formData.isSuccess && (
                <ShowAlert
                    severity="success"
                    message={"Curso cadastrado com sucesso!"}
                    milliseconds={5000}
                />
            )}

            {formData.isError && (
                <ShowAlert
                    severity="error"
                    message={"Houve um erro ao cadastrar o curso!"}
                    milliseconds={5000}
                />
            )}
        </Page>
    );
};
