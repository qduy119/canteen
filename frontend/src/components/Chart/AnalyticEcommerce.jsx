import { Stack, Typography } from "@mui/material";
import MainCard from "../Card/MainCard";

const AnalyticEcommerce = ({ title, count }) => (
    <MainCard contentSX={{ p: 2.25 }}>
        <Stack spacing={0.5}>
            <Typography variant="h6" color="textSecondary">
                {title}
            </Typography>
            <Typography variant="h3">
                {count}
            </Typography>
        </Stack>
    </MainCard>
);

export default AnalyticEcommerce;
