import { Box, Typography } from "@mui/material";

export const PageNotFound = () => {
    return (
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
            <Typography variant="h4" noWrap component="div">
                404 Page Not Found
            </Typography>
        </Box>
    );
};
