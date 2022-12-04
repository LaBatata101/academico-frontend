import { Box, Button, Grid, TextField } from "@mui/material";
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import moment from "moment";

type FormProps = {
    onSubmit: (e?: React.FormEvent<HTMLFormElement>) => void;
    children: React.ReactNode;
};

type FormItemProps = {
    id: string;
    label: string;
    type?: string;
    value: any;
    error?: boolean;
    helperText?: string | boolean;
    onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | null) => void;
    formik?: any
};

export const Form = ({ onSubmit, children }: FormProps) => {
    return (
        <Box component="form" onSubmit={onSubmit} noValidate autoComplete="off" m={2}>
            <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                {children}
            </Grid>
            <Button variant="contained" sx={{ mt: 2 }} type="submit">
                Salvar
            </Button>
        </Box>
    );
};

export const FormItem = ({
    id,
    label,
    type = "text",
    value,
    onInputChange,
    error,
    helperText,
    formik
}: FormItemProps) => {
    return (
        <Grid item xs={6}>
            {type === "date" ? (
                <LocalizationProvider dateAdapter={AdapterMoment}>
                    <DesktopDatePicker
                        label={label}
                        inputFormat="DD/MM/YYYY"
                        onChange={(value) => formik.setFieldValue("birthday", value, true)}
                        value={value}
                        renderInput={(params) => <TextField {...params} />}
                    />
                </LocalizationProvider>
            ) : (
                <TextField
                    id={id}
                    label={label}
                    variant="outlined"
                    type={type}
                    value={value}
                    onChange={onInputChange}
                    error={error}
                    helperText={helperText}
                />
            )}
        </Grid>
    );
};
