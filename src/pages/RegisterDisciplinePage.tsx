import { Autocomplete, Button, Grid, TextField } from "@mui/material";
import axios from "axios";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import { useFormik } from "formik";
import React from "react";
import { Link } from "react-router-dom";
import * as yup from "yup";
import { getUrl } from "../api";
import { Page } from "../components/Page";
import { formDataReducer } from "../helpers/formdata";
import { Form, FormItem } from "../components/Form";
import { ShowAlert } from "../components/ShowAlert";

const validationSchema = yup.object().shape({
    name: yup.string().required("Nome da disciplina é obrigatorio"),
    professors: yup.array().min(1, "É preciso selecionar ao menos um professor"),
    workload: yup
        .number()
        .required("Carga horária é obrigatorio")
        .positive("A carga horária precisa ser um número positivo")
        .integer("A carga horária precisa ser um inteiro")
        .typeError("Não é um número válido"),
});

export const RegisterDisciplinePage = () => {
    const [professors, setProfessors] = React.useState([]);
    const [formData, dispatchFormData] = React.useReducer(formDataReducer, {
        isSuccess: false,
        isError: false,
    });

    React.useEffect(() => {
        axios
            .get(getUrl("/professor", "/"))
            .then((result) => setProfessors(result.data))
            .catch((error) => console.log(error));
    }, []);

    const formik = useFormik({
        initialValues: {
            name: "",
            workload: "",
            professors: [],
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            dispatchFormData({ type: "FORM_DATA_RESET_STATE" });
            axios
                .post(getUrl("/discipline", "/new"), {
                    name: values.name,
                    workload: values.workload,
                })
                .then(() => dispatchFormData({ type: "FORM_DATA_POST_SUCCESS" }))
                .catch(() => dispatchFormData({ type: "FORM_DATA_POST_FAILURE" }));
        },
    });

    return (
        <Page
            header="Cadastrar Disciplina"
            button=<Button
                sx={{ flex: "2 2 20%" }}
                variant="contained"
                startIcon={<FormatListBulletedIcon />}
                component={Link}
                to="/disciplina/listar"
            >
                Listar Disciplinas
            </Button>
        >
            <Form onSubmit={formik.handleSubmit}>
                <FormItem
                    id="name"
                    label="Nome da Disciplina"
                    value={formik.values.name}
                    onInputChange={formik.handleChange}
                    error={formik.touched.name && Boolean(formik.errors.name)}
                    helperText={formik.touched.name && formik.errors.name}
                />

                <FormItem
                    id="workload"
                    label="Carga horária"
                    value={formik.values.workload}
                    onInputChange={formik.handleChange}
                    error={formik.touched.workload && Boolean(formik.errors.workload)}
                    helperText={formik.touched.workload && formik.errors.workload}
                />

                <Grid item xs={6} id="select-professors">
                    <Autocomplete
                        multiple
                        options={professors}
                        onChange={(_, values) => {
                            formik.setFieldValue("professors", values, true);
                        }}
                        getOptionLabel={(option: { name: string }) => option.name}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Professores"
                                error={
                                    formik.touched.professors && Boolean(formik.errors.professors)
                                }
                                helperText={formik.touched.professors && formik.errors.professors}
                            />
                        )}
                        isOptionEqualToValue={(option, value) => option.name === value.name}
                        noOptionsText="Sem Professores"
                    />
                </Grid>
            </Form>

            {formData.isSuccess && (
                <ShowAlert
                    severity="success"
                    message={"Disciplina cadastrada com sucesso!"}
                    milliseconds={5000}
                />
            )}

            {formData.isError && (
                <ShowAlert
                    severity="error"
                    message={"Houve um erro ao cadastrar a disciplina!"}
                    milliseconds={5000}
                />
            )}
        </Page>
    );
};
