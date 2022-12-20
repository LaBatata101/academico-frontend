import { Autocomplete, Button, Grid, TextField } from "@mui/material";
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
    name: yup.string().required("Nome da turma é obrigatorio"),
    course: yup.object().required("É preciso selecionar um curso").nullable(),
});

export const RegisterClassPage = () => {
    const [courses, setCourses] = React.useState([]);
    const [formData, dispatchFormData] = React.useReducer(formDataReducer, {
        isSuccess: false,
        isError: false,
    });

    const formik = useFormik({
        initialValues: {
            name: "",
            course: null,
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            dispatchFormData({ type: "FORM_DATA_RESET_STATE" });
            axios
                .post(getUrl("/class", "/new"), {
                    name: values.name,
                    course: values.course,
                })
                .then(() => dispatchFormData({ type: "FORM_DATA_POST_SUCCESS" }))
                .catch(() => dispatchFormData({ type: "FORM_DATA_POST_FAILURE" }));
        },
    });

    React.useEffect(() => {
        axios
            .get(getUrl("/course", "/"))
            .then((result) => setCourses(result.data))
            .catch((error) => console.log(error));
    }, []);

    return (
        <Page
            header="Cadastrar Turma"
            button=<Button
                sx={{ flex: "2 2 20%" }}
                variant="contained"
                startIcon={<FormatListBulletedIcon />}
                component={Link}
                to="/turma/listar"
            >
                Listar Turmas
            </Button>
        >
            <Form onSubmit={formik.handleSubmit}>
                <FormItem
                    id="name"
                    label="Nome da Turma"
                    value={formik.values.name}
                    onInputChange={formik.handleChange}
                    error={formik.touched.name && Boolean(formik.errors.name)}
                    helperText={formik.touched.name && formik.errors.name}
                />

                <Grid item xs={6} id="select-course">
                    <Autocomplete
                        options={courses}
                        onChange={(_, value) => {
                            formik.setFieldValue("course", value, true);
                        }}
                        getOptionLabel={(option: { name: string }) => option.name}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Cursos"
                                error={formik.touched.course && Boolean(formik.errors.course)}
                                helperText={formik.touched.course && formik.errors.course}
                            />
                        )}
                        isOptionEqualToValue={(option, value) => option.name === value.name}
                        noOptionsText="Sem cursos"
                    />
                </Grid>
            </Form>

            {formData.isSuccess && (
                <ShowAlert
                    severity="success"
                    message={"Turma cadastrada com sucesso!"}
                    milliseconds={5000}
                />
            )}

            {formData.isError && (
                <ShowAlert
                    severity="error"
                    message={"Houve um erro ao cadastrar a turma!"}
                    milliseconds={5000}
                />
            )}
        </Page>
    );
};
