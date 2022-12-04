import { Alert, Collapse } from "@mui/material";
import React from "react";

export const ShowAlert = ({
    message,
    severity,
    milliseconds,
}: {
    message: string;
    severity: "warning" | "info" | "error" | "success";
    milliseconds: number;
}) => {
    const [show, setShow] = React.useState(true);

    React.useEffect(() => {
        const timeId = setTimeout(() => {
            setShow(false);
        }, milliseconds);

        return () => {
            clearTimeout(timeId);
        };
    }, []);

    return (
        <>
            {show && (
                <Collapse in={show}>
                    <Alert severity={severity} onClose={() => setShow(false)}>
                        {message}
                    </Alert>
                </Collapse>
            )}
        </>
    );
};
