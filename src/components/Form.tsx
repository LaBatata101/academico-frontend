import { Box, Button, Grid, TextField } from "@mui/material";
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import InputMask from "react-input-mask";

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
    formik?: any;
    mask?: string;
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
    formik,
    mask,
}: FormItemProps) => {
    if (mask) {
        return (
            <Grid item xs={6}>
                <InputMask
                    mask={mask}
                    value={value}
                    onChange={onInputChange}
                    maskPlaceholder={null}
                >
                    <TextField
                        id={id}
                        label={label}
                        variant="outlined"
                        type={type}
                        error={error}
                        helperText={helperText}
                    />
                </InputMask>
            </Grid>
        );
    }

    let input_component;
    switch (type) {
        case "date":
            input_component = (
                <LocalizationProvider dateAdapter={AdapterMoment}>
                    <DesktopDatePicker
                        label={label}
                        inputFormat="DD/MM/YYYY"
                        onChange={(value) => formik.setFieldValue("birthday", value, true)}
                        value={value}
                        renderInput={(params) => <TextField {...params} />}
                    />
                </LocalizationProvider>
            );
            break;
        default:
            input_component = (
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
            );
    }

    return (
        <Grid item xs={6}>
            {input_component}
        </Grid>
    );
};
