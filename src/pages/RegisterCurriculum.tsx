import * as yup from "yup";
import { useFormik } from "formik";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import { Page } from "../components/Page";
import { Autocomplete, Button, Grid, TextField } from "@mui/material";
import { Form, FormItem } from "../components/Form";
import React from "react";
import { getUrl } from "../api";
import axios from "axios";
import { Link } from "react-router-dom";
import { ShowAlert } from "../components/ShowAlert";
import { formDataReducer } from "../helpers/formdata";
import moment from "moment";

const validationSchema = yup.object().shape({
    name: yup.string().required("Nome é obrigatorio"),
    disciplines: yup.array().min(1, "É preciso selecionar ao menos uma disciplina"),
    course: yup.object().required("É preciso selecionar um curso").nullable(),
    currentDate: yup.date().required("Data da matriz curricular é obrigatoria"),
});

export const RegisterCurriculumPage = () => {
    const [disciplines, setDisciplines] = React.useState([]);
    const [courses, setCourses] = React.useState([]);

    React.useEffect(() => {
        axios
            .get(getUrl("/discipline", "/"))
            .then((result) => setDisciplines(result.data))
            .catch((error) => console.log(error));

        axios
            .get(getUrl("/course", "/"))
            .then((result) => setCourses(result.data))
            .catch((error) => console.log(error));
    }, []);

    const [formData, dispatchFormData] = React.useReducer(formDataReducer, {
        isSuccess: false,
        isError: false,
    });

    const formik = useFormik({
        initialValues: {
            name: "",
            disciplines: [],
            course: null,
            currentDate: moment().locale("pt-BR").format("L"),
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            dispatchFormData({ type: "FORM_DATA_RESET_STATE" });
            console.log(values.course);
            axios
                .post(getUrl("/curriculum", "/new"), {
                    name: values.name,
                    disciplines: values.disciplines,
                    course: values.course,
                    currentDate: values.currentDate,
                })
                .then(() => dispatchFormData({ type: "FORM_DATA_POST_SUCCESS" }))
                .catch(() => dispatchFormData({ type: "FORM_DATA_POST_FAILURE" }));
        },
    });

    return (
        <Page
            header="Cadastrar Matriz Curricular"
            button=<Button
                sx={{ flex: "2 2 40%" }}
                variant="contained"
                startIcon={<FormatListBulletedIcon />}
                component={Link}
                to="/matriz-curricular/listar"
            >
                Listar Matrizes Curriculares
            </Button>
        >
            <Form onSubmit={formik.handleSubmit}>
                <FormItem
                    id="name"
                    label="Nome da Matriz Curricular"
                    value={formik.values.name}
                    onInputChange={formik.handleChange}
                    error={formik.touched.name && Boolean(formik.errors.name)}
                    helperText={formik.touched.name && formik.errors.name}
                />

                <FormItem
                    id="currentDate"
                    label="Data da Matriz Curricular"
                    type="date"
                    value={formik.values.currentDate}
                    onInputChange={formik.handleChange}
                    error={formik.touched.currentDate && Boolean(formik.errors.currentDate)}
                    helperText={formik.touched.currentDate && formik.errors.currentDate}
                    formik={formik}
                />

                <Grid item xs={6} id="select-discipline">
                    <Autocomplete
                        multiple
                        options={disciplines}
                        onChange={(_, values) => {
                            formik.setFieldValue("disciplines", values, true);
                        }}
                        getOptionLabel={(option: { name: string }) => option.name}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Disciplinas"
                                error={
                                    formik.touched.disciplines && Boolean(formik.errors.disciplines)
                                }
                                helperText={formik.touched.disciplines && formik.errors.disciplines}
                            />
                        )}
                        isOptionEqualToValue={(option, value) => option.name === value.name}
                        noOptionsText="Sem disciplinas"
                    />
                </Grid>

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
                    message={"Matriz curricular cadastrada com sucesso!"}
                    milliseconds={5000}
                />
            )}

            {formData.isError && (
                <ShowAlert
                    severity="error"
                    message={"Houve um erro ao cadastrar a matriz curricular!"}
                    milliseconds={5000}
                />
            )}
        </Page>
    );
};
