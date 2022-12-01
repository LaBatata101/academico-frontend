import { Paper, Toolbar, Typography } from "@mui/material";
import React from "react";

type PageProps = {
    header: string;
    button?: React.ReactNode;
    children: React.ReactNode;
};

export const Page = ({ header, button, children }: PageProps) => {
    return (
        <>
            <Paper>
                <Toolbar>
                    <Typography sx={{ flex: "1 1 80%" }} variant="h6" noWrap component="div">
                        {header}
                    </Typography>
                    {button !== undefined && <>{button}</>}
                </Toolbar>
            </Paper>
            {children}
        </>
    );
};
