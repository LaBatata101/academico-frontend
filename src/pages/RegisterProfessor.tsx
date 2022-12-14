import * as yup from "yup";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import React from "react";
import axios from "axios";
import { Button } from "@mui/material";
import { Form, FormItem } from "../components/Form";
import { Link } from "react-router-dom";
import { Page } from "../components/Page";
import { ShowAlert } from "../components/ShowAlert";
import { formDataReducer } from "../helpers/formdata";
import { getUrl } from "../api";
import { useFormik } from "formik";

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
    phone: yup
        .string()
        .min(9, "O número máximo de caracteres do telefone é 9")
        .test(`test-phone-number`, "Numero de telefone invalído", function (value) {
            return value?.match(/\([0-9]{2}\) [0-9]{5}-[0-9]{4}/) !== null;
        })
        .required("Numero de telefone é obrigatorio"),
});

export const RegisterProfessorPage = () => {
    const [formData, dispatchFormData] = React.useReducer(formDataReducer, {
        isSuccess: false,
        isError: false,
    });

    const formik = useFormik({
        initialValues: {
            name: "",
            email: "",
            password: "",
            phone: "",
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            dispatchFormData({ type: "FORM_DATA_RESET_STATE" });
            axios
                .post(getUrl("/professor", "/new"), {
                    name: values.name,
                    email: values.email,
                    password: values.password,
                    phone: values.phone,
                    disciplines: [],
                })
                .then(() => dispatchFormData({ type: "FORM_DATA_POST_SUCCESS" }))
                .catch((error) => {
                    console.log(error);
                    dispatchFormData({ type: "FORM_DATA_POST_FAILURE" });
                });
        },
    });

    return (
        <Page
            header="Cadastrar Professor"
            button=<Button
                sx={{ flex: "2 2 20%" }}
                variant="contained"
                startIcon={<FormatListBulletedIcon />}
                component={Link}
                to="/professor/listar"
            >
                Listar Professores
            </Button>
        >
            <Form onSubmit={formik.handleSubmit}>
                <FormItem
                    id="name"
                    label="Nome do Professor"
                    value={formik.values.name}
                    onInputChange={formik.handleChange}
                    error={formik.touched.name && Boolean(formik.errors.name)}
                    helperText={formik.touched.name && formik.errors.name}
                />

                <FormItem
                    id="email"
                    label="Email do Professor"
                    type="email"
                    value={formik.values.email}
                    onInputChange={formik.handleChange}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helperText={formik.touched.email && formik.errors.email}
                />

                <FormItem
                    id="phone"
                    label="Numero de telefone"
                    mask="(99) 99999-9999"
                    value={formik.values.phone}
                    onInputChange={formik.handleChange}
                    error={formik.touched.phone && Boolean(formik.errors.phone)}
                    helperText={formik.touched.phone && formik.errors.phone}
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

            {formData.isSuccess && (
                <ShowAlert
                    severity="success"
                    message={"Professor cadastrado com sucesso!"}
                    milliseconds={5000}
                />
            )}

            {formData.isError && (
                <ShowAlert
                    severity="error"
                    message={"Houve um erro ao cadastrar o professor!"}
                    milliseconds={5000}
                />
            )}
        </Page>
    );
};
